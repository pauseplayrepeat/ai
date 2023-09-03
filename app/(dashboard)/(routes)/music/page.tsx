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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      duration: 5,
      apiRoute: "/api/riffusion", // default API route
    },
  });

  const selectedApiRoute = form.watch("apiRoute");

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setMusic(undefined);
			const response = await axios.post(values.apiRoute, values);
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
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-12">
                  <div className="text-l font-bold">Describe your sound</div>
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading} 
                      placeholder="Piano solo" 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <FormField
              name="file"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-12">
                  <div className="text-l font-bold">Upload a file</div>
                  <FormControl className="m-0 p-0">
                    <div
                      onDrop={onFileDrop}
                      onDragOver={(event) => event.preventDefault()}
                      className="border-2 border-dashed p-4 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Drop a file here or click to select
                    </div>
                    <input
                      type="file"
                      hidden
                      ref={fileInputRef}
                      onChange={onFileChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            {selectedApiRoute !== "/api/riffusion" && (
              <FormField
                name="duration"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-12">
                    <div className="text-l font-bold">Duration</div>
                    <FormControl className="m-0 p-0">
										<Slider 
  defaultValue={[field.value]} 
  max={30} 
  min={1} 
  step={1} 
  onValueChange={(values) => field.onChange(values[0])}
/>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="apiRoute"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-12">
                  <div className="w-full h-auto py-2">
                    <div className="text-l font-bold">Model</div>
                    <div className="py-2">
										<Select onValueChange={field.onChange} defaultValue={field.value}>
  <SelectTrigger>
    <SelectValue placeholder="Select an API route" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="/api/riffusion">Riffusion - Generates images of spectrograms converted to audio clips from a text prompt.</SelectItem>
    <SelectItem value="/api/musicgen">MusicGen - Generates music using 4 sets of codes analyzed 50 times per second from a 32kHz EnCodec tokenizer.</SelectItem>
  </SelectContent>
</Select>
                    </div>
                    <FormDescription className="w-full whitespace-nowrap">
                      Select the model to use for music generation.
                    </FormDescription>
                    <FormMessage />
                  </div>
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