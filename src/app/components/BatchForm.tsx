'use client'

import { useEffect, useState } from "react";
import { postTomDecision } from "@/app/actions";
import Model from "@/schema/up2tom-v3/manual-schema/Model";
import AttributeInput from "@/app/components/AttributeInput";
import { useFormState } from "react-dom";
import FormSubmitButton from "@/app/components/FormSubmitButton";

async function handleSubmit(previousState: any, formData: FormData) {
    const modelId = formData.get('modelId') as string;
    formData.delete('modelId'); // modelId is must be removed from the form data before sending it to the server
    // TODO: validate data here
    return postTomDecision(modelId, formData);
}

export default function BatchForm({ tomModels }: { tomModels: Model[] }): JSX.Element {

    const [model, setModel] = useState<Model>();
    const [state, formAction] = useFormState(handleSubmit, null);

    function changeModel(e: React.ChangeEvent<HTMLSelectElement>) {
        setModel(tomModels.find(m => m.id === e.target.value));
    }

    useEffect(() => {
        //output the current values entered in the form
        console.log("STATE:", state);
    }, [state]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-transparent to-background-end-rgb">
            {/* <form action={formAction} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <label className="block mb-4">
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">Choose a model:</span>
                    <select
                        name="modelId"
                        onChange={changeModel}
                        value={model?.id}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {tomModels.map(model => (
                            <option key={model.id} value={model.id}>
                                {model.attributes.name}
                            </option>
                        ))}
                    </select>
                </label>

                {model?.attributes.metadata.attributes.map(attr => (
                    <AttributeInput key={attr.name} attribute={attr} />
                ))}
                {model && (
                    <FormSubmitButton className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </FormSubmitButton>
                )}
            </form> */}
        </div>
    );
}