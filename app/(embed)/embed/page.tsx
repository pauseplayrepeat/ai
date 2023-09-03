"use client";

import { useState } from "react";
// import { PageLayout } from "@/components/Layouts";
// import { NamespaceSelector } from "@/components/NamespaceInput";
import { DocumentQA } from "@/components/embed/DocumentQA";

export default function Query() {
  const [namespace, setNamespace] = useState("");

  return (
    // <PageLayout>
      <div className="flex flex-col items-center gap-3 px-3 p-16">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-5 items-center md:max-w-2xl">
            <div className="w-full">
              {/* <NamespaceSelector
                newNamespace={namespace}
                onNamespaceSelect={(selectedNamespace) => {
                  console.log("Selected namespace:", selectedNamespace);
                  setNamespace(selectedNamespace);
                }}
              /> */}
            </div>
          </div>

          <div className="flex w-full flex-col items-center">
            <p className="mb-3 mt-2 max-w-lg text-center text-neutral-800 dark:text-neutral-200 md:text-lg">
              Ask a question.
            </p>
            <DocumentQA namespace={namespace} />
          </div>
        </div>
      </div>
    // </PageLayout>
  );
}
