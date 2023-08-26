import express from 'express';
import bodyParser from 'body-parser';
import { sessions, clients } from '@clerk/clerk-sdk-node';
import Cookies from 'cookies';
import Replicate from 'replicate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const replicateAuthToken = process.env.REPLICATE_API_TOKEN;
if (!replicateAuthToken) {
  throw new Error("REPLICATE_API_TOKEN is missing from environment variables.");
}

const replicate = new Replicate({
  auth: replicateAuthToken,
});

app.post('/api/handler', async (req, res) => {
  try {
    const cookies = new Cookies(req, res);
    const clientToken = cookies.get('__session');  // Retrieve the clientToken from the cookies

    if (!clientToken) {
      res.status(401).end('Client token missing');
      return;
    }

    // Assuming you're using the last active session
    const client = await clients.verifyClient(clientToken);
    const sessionId = client?.lastActiveSessionId;

    if (!sessionId) {
      res.status(401).end('Session ID missing');
      return;
    }

    const session = await sessions.verifySession(sessionId, clientToken);

    if (!session) {
      res.status(401).end('Unauthorized');
      return;
    }

    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).end('Prompt is required');
      return;
    }

    const response = await replicate.run(
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt,
        },
      },
    );

    res.json(response);
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    res.status(500).end('Internal Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
