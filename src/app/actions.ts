'use server'

import Data from "@/schema/manual-schema/Data";
import Model from "@/schema/manual-schema/Model";
import Scenario from "@/schema/manual-schema/Scenario";
import ScenarioResponse from "@/schema/manual-schema/ScenarioResponse";

export async function getTomModels(): Promise<Data<Model[]>> {
    const res = await fetch('https://api.up2tom.com/v3/models',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979'
            }
        }
    );

    return res.json();
}

export async function getTomDecision(modelId: string, formData: FormData): Promise<Data<ScenarioResponse>> {
    const scenarioData: Data<Scenario> = {
        data: {
            type: "scenario",
            attributes: { input: [...formData.values()] }
        }
    }

    console.log("Getting tom decision:", modelId, scenarioData, scenarioData.data.attributes.input);

    const res = await fetch(`https://api.up2tom.com/v3/decision/${modelId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979'
            },
            body: JSON.stringify(scenarioData)
        }
    );

    return res.json();
}