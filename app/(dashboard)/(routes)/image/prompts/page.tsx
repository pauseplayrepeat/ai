"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Heading } from "@/components/heading";
import { ImageIcon } from "lucide-react";
import { Loader } from "@/components/loader";
import Empty from "@/components/empty";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Prompt {
  prompt: string;
  // include other properties of prompt if there are any
}

export default function PromptPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [error, setError] = useState("");

  const { toast } = useToast();

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Prompt copied to clipboard.",
      duration: 3000,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/sdprompts");
        if (response.status !== 200) {
          throw new Error("An error occurred while fetching the data.");
        }
        setPrompts(response.data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Heading
        title="Album Artwork Prompts"
        description="List of Album Artwork prompts."
        Icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
      />
      <div className="px-4 lg:px-8">
        <div className="space-y-4 mt-4">
          {prompts.length === 0 && <Empty label="No prompts available." />}
          <div className="grid auto-rows-min grid-cols-1 mid:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {prompts.map((prompt, index) => (
              <Card key={index} className="rounded-lg p-4">
                {/* <div className="relative aspect-square">
                  <Image alt="Prompt" fill src={prompt.imageSrc} />
                </div> */}
                <CardFooter className="flex flex-col justify-between items-center space-y-4"> 
                  <div className="px-2 py-1">{prompt.prompt}</div> 
                  <Button
                    onClick={() => onCopy(prompt.prompt)}
                    className="w-full"
                    size="icon"
                    variant="default"
                  >
                    Copy Prompt   
                    <Copy className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}