import { Configuration, OpenAIApi } from "openai"
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"

// export const runtime = 'edge'; 

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }

        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }

        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        try {
            const createdPrompt = await prismadb.prompt.create({
                data: {
                    userId: userId,
                    prompt: prompt,
                    result: JSON.stringify(response.data.data), // assuming the result is an object
                },
            });
        
            console.log(createdPrompt);
        } catch (error) {
            console.error("Error creating prompt:", error);
        }

        return NextResponse.json(response.data.data);

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}