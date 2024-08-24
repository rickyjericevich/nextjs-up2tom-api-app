'use client'

import { useEffect, useState } from "react";
import { postTomDecision } from "@/app/actions";
import Model from "@/schema/up2tom-v3/manual-schema/Model";
import AttributeInput from "./AttributeInput";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return <button type="submit" aria-disabled={pending}>Submit</button>
}

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
        console.log("STATE:",state);
      }, [state]);

    return <div>
        <form action={formAction}>

            <label>
                Choose a model:
                <select name="modelId" onChange={changeModel} value={model?.id}>
                    {tomModels.map(model => <option key={model.id} value={model.id}>{model.attributes.name}</option>)}
                </select>
            </label>

            {model?.attributes.metadata.attributes.map(attr => <AttributeInput key={attr.name} attribute={attr} />)}
            {model && < SubmitButton />}

        </form>
    </div>
}