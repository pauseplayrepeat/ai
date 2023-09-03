import React, { useState, useRef } from "react"
import { usePineconeQuery } from "@/hooks/embed/use-query"
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"
import { useForm, Controller } from 'react-hook-form';
import { Wand2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface DocumentQAProps {
    namespace: string; // replace 'string' with the actual type if it's not a string
}

export function DocumentQA({ namespace }: DocumentQAProps) {
    const {
        status,
        setUserQuestion,
        generateAnswer,
        answerStream,
        messages,
    } = usePineconeQuery(namespace)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { toast } = useToast();

    function handleChange(e: any) {
        return setUserQuestion(e.target.value)
    }

    const { handleSubmit: handleFormSubmit, control, formState } = useForm();

    const isLoading = formState.isLoading;

    async function onSubmit(data: any) {
        try {
            setUserQuestion("");
            await generateAnswer(data);
            toast({
                description: "Your question has been submitted.",
            });
            // Remove router.refresh();
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong.",
            });
        }
    }

    function scrollToBottom() {
        return messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const chatMessages = [
        ...messages,
        ...(answerStream
            ? [
                {
                    type: "apiMessage",
                    question: "",
                    message: answerStream,
                    sourceDocs: [],
                },
            ]
            : []),
    ]

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form>
                <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-8 pb-10">
                    <FormField
                        name="userQuestion"
                        control={control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>What do you want to know?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={7}
                                        className="bg-background resize-none" 
                                        disabled={isLoading}
                                        placeholder="Enter your question"
                                        {...field}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Describe in detail your question.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center">
                        <Button size="lg" disabled={status === "loading" || status === "streaming"}> 
                            Submit your question
                            <Wand2 className="w-4 h-4 ml-2"/>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}