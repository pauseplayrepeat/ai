import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
        "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",
      input: { prompt: req.body.prompt },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return res.status(500).json({ detail: error.detail });
  }

  const prediction = await response.json();
  return res.status(201).json(prediction);
}
