import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const prompts = await prismadb.prompt.findMany(); 
  
      return NextResponse.json(prompts);
    } catch (error) {
      console.log('[PROMPT_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };