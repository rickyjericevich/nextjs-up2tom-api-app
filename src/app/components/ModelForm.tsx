'use client'

import { useState } from "react";
import { getTomDecision } from "@/app/actions";
import Model from "@/schema/manual-schema/Model";

export default function ModelForm({ tomModels }: { tomModels: Model[] }) {

    const [model, setModel] = useState<Model>();

    function changeModel(event: React.ChangeEvent<HTMLSelectElement>) {
        setModel(tomModels.find(m => m.id === event.target.value));
    }

    async function handleSubmit(formData: FormData) {
        if (!model) return;

        const response = await getTomDecision(model.id, formData);
        console.log(response);
    }

    return (
        <div>
            <label>
                Choose a model:
                <select onChange={changeModel} value={model?.id}>
                    {tomModels.map(model => {
                        return (
                            <option key={model.id} value={model.id}>{model.attributes.name}</option>
                        );
                    })}
                </select>
            </label>
            <form action={handleSubmit}>
                {model?.attributes.metadata.attributes.map(attr => {
                    return (
                        <label key={attr.name}>
                            {attr.question}
                            <input type="text" name={attr.name} />
                        </label>
                    );
                })}
                <button type="submit" disabled={model === undefined}>Submit</button>
            </form>
        </div>
    );
}