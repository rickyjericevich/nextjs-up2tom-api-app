// 'use client'

import { useState } from 'react';
import DecisionForm from '@/app/components/DecisionForm';
import BatchForm from '@/app/components/BatchForm';
import { getTomModels } from '@/app/actions';

enum FormType {
  Decision = 'decision',
  Batch = 'batch',
}

export default async function Home() {
  const tomModels = await getTomModels();

  // const [formType, setFormType] = useState<FormType>(FormType.Decision);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-transparent to-background-end-rgb">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-around mb-6">
          <button
            // className={`py-2 px-4 rounded-md shadow-sm text-sm font-medium ${formType === FormType.Decision ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            // onClick={() => setFormType(FormType.Decision)}
          >
            Create Decision
          </button>
          <button
            // className={`py-2 px-4 rounded-md shadow-sm text-sm font-medium ${formType === FormType.Batch ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            // onClick={() => setFormType(FormType.Batch)}
          >
            Create Batch
          </button>
        </div>

        {/* {formType === FormType.Decision ? <DecisionForm tomModels={tomModels.data} /> : <BatchForm tomModels={tomModels.data} />} */}
      </div>
    </main>
  );
}
