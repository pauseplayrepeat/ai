"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Heading } from "@/components/heading";
import { ImageIcon } from "lucide-react";
import { Loader } from "@/components/loader";
import Empty from "@/components/empty";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export default function PromptPage() {
  const [prompts, setPrompts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/sdprompts");
        if (response.status !== 200) {
          throw new Error("An error occurred while fetching the data.");
        }
        setPrompts(response.data);
      } catch (error) {
        setError(error.message);
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
        title="Prompts"
        description="List of prompts."
        Icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
      />
      <div className="px-4 lg:px-8">
        <div className="space-y-4 mt-4">
          {prompts.length === 0 && <Empty label="No prompts available." />}
          <div className="grid grid-cols-1 mid:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {prompts.map((prompt, index) => (
              <Card key={index} className="rounded-lg overflow-hidden">
                {/* <div className="relative aspect-square">
                  <Image alt="Prompt" fill src={prompt.imageSrc} />
                </div> */}
                <CardFooter className="p-2">
                  <div>{prompt.prompt}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
