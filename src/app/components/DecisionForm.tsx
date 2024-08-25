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

export default function DecisionForm({ tomModels }: { tomModels: Model[] }): JSX.Element {

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
            <form action={formAction}>
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

                {model?.attributes.metadata.attributes.map(attr => (
                    <AttributeInput key={attr.name} attribute={attr} />
                ))}
                {model && (
                    <FormSubmitButton className="w-full border border-transparent text-sm font-medium">
                        Submit
                    </FormSubmitButton>
                )}
            </form>
    );
}