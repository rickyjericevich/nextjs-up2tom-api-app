'use client'

import Model from "@/schema/up2tom-v3/manual-schema/Model";
import { useState } from "react";
import BatchForm from "@/app/components/BatchForm";
import DecisionForm from "@/app/components/DecisionForm";
import { FormType } from "@/schema/other/Enums";


export default function DecisionOrBatchChooser({ tomModels }: { tomModels: Model[] }): JSX.Element {

    const [formType, setFormType] = useState<FormType>();
    const [model, setModel] = useState<Model>();

    function changeModel(e: React.ChangeEvent<HTMLSelectElement>) {
        setModel(tomModels.find(m => m.id === e.target.value));
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">

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

            {formType && (<>
                <label>

                    <span className="block">Choose a model:</span>

                    <select
                        name="modelId"
                        onChange={changeModel}
                        value={model?.id}
                        className="mt-1 block w-full px-3 py-2 dark:border-gray-600 sm:text-sm"
                    >
                        {tomModels.map(model => (
                            <option key={model.id} value={model.id}>
                                {model.attributes.name}
                            </option>
                        ))}
                    </select>

                </label>

                {model && (formType === FormType.Decision ? <DecisionForm tomModel={model} /> : <BatchForm tomModel={model} />)}
            </>)}

        </div>
    );
}