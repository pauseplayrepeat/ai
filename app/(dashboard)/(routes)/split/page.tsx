"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useCallback, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Music, Send } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import { formSchema } from "./constants";

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      apiRoute: "/api/riffusion", // default API route
    },
});

  const selectedApiRoute = form.watch("apiRoute");

  const isLoading = form.formState.isSubmitting;

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      const formData = new FormData();
      formData.append('file', values.file as Blob);
      const response = await axios.post(values.apiRoute, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMusic(response.data);
      form.reset();
    } catch (error: any) {
      // handle error
    } finally {
      router.refresh();
    }
};

  return ( 
    <div>
      <Heading
        title="Sample Generation"
        description="Generate Music Samples from a prompt."
        Icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
          >
            <FormField
  name="file"
  render={({ field }) => (
    <FormItem className="col-span-12 lg:col-span-12">
      <div className="text-l font-bold">Upload a file</div>
      <FormControl className="m-0 p-0">
        <Input
          type="file"
          hidden
          onChange={onFileChange}
        />
      </FormControl>
    </FormItem>
  )}
/>
            <Button className="col-span-12 w-full" type="submit" disabled={isLoading} size="icon">
              Generate
            </Button>
            <Button className="col-span-12 w-full" variant="link" onClick={() => window.open('https://rsxdalv.github.io/musicgen-prompts/', '_blank')}>
              View Prompt Examples
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!music && !isLoading && (
          <Empty label="No music generated." />
        )}
        {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
      </div>
    </div>
  );
}
 
export default MusicPage;