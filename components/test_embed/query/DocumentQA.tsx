import React, { useState, useRef } from "react"
import { usePineconeQuery } from "@/hooks/embed/use-query"
import { SearchInput } from "./SearchInput"

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

  function handleChange(e: any) {
    return setUserQuestion(e.target.value)
  }

  function handleSubmit(e: any) {
    setUserQuestion("")
    return generateAnswer(e)
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
    <section className="p-4 bg-white shadow rounded-lg">
      <div className="flex flex-col space-y-4">
        <div className="overflow-y-auto">
          {chatMessages.map((message, i) => (
            <div key={i} className="p-2 bg-gray-100 rounded-md">{message.message}</div>
          ))}
        </div>
        <div className="mt-4">
            <SearchInput
                status={status}
                handleClick={handleSubmit}
                handleChange={handleChange}
                loading={status === "loading" || status === "streaming"}
                placeholder="What do you want to know?" 
                value={""}
                className="w-full p-2 border border-gray-300 rounded-md"
            />
        </div>
      </div>
      <div ref={messagesEndRef} />
    </section>
  )
}