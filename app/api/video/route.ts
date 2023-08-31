import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export const runtime = 'edge'; 

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if (!freeTrial && !isPro) {
    //   return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    // }

    const response = await replicate.run(
      "pollinations/stable-diffusion-dance:dfb636aa9c04fe5b7d9897e6159ef88e3ecb3e1eb274c3f072dca7b495823280",
      {
        input: {
          prompts: prompt
        }
      }
    );

    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    return NextResponse.json(response);
  } catch (error) {
    console.log('[VIDEO_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};