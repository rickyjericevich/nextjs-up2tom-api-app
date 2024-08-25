'use client'

import Model from "@/schema/up2tom-v3/manual-schema/Model";
import { useState } from "react";
import BatchForm from "@/app/components/BatchForm";
import DecisionForm from "@/app/components/DecisionForm";

enum FormType {
    Decision = 'decision',
    Batch = 'batch',
  }

export default function DecisionOrBatchChooser({ tomModels }: { tomModels: Model[] }): JSX.Element {

    const [formType, setFormType] = useState<FormType>();
    
    return <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
    <div className="flex justify-around mb-6">
      <button
        className={` text-sm font-medium ${formType === FormType.Batch && 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
        onClick={() => setFormType(FormType.Decision)}
      >
        Create Decision
      </button>
      <button
        className={`text-sm font-medium ${formType === FormType.Decision && 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
        onClick={() => setFormType(FormType.Batch)}
      >
        Create Batch
      </button>
    </div>

    {formType && (formType === FormType.Decision ? <DecisionForm tomModels={tomModels} /> : <BatchForm tomModels={tomModels} />)}
  </div>
}