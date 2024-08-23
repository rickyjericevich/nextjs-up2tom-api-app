'use server'

import Data from "@/schema/manual-schema/Data";
import Model from "@/schema/manual-schema/Model";
import Scenario from "@/schema/manual-schema/Scenario";
import DecisionSuccessResponse from "@/schema/manual-schema/DecisionSuccessResponse";
import DecisionErrorResponse from "@/schema/manual-schema/DecisionErrorResponse";
import { V3_API_Pathnames } from "@/schema/manual-schema/Enums";

// TODO: move constants to a config file
const baseUrl = 'https://api.up2tom.com';
const apiKey = '9307bfd5fa011428ff198bb37547f979';

const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Authorization': 'Token ' + apiKey
}

export async function getTomModels(): Promise<Data<Model[]>> {
    const res = await fetch(new URL(V3_API_Pathnames.Models, baseUrl), { headers });
    return res.json();
}

export async function getTomDecision(modelId: string, formData: FormData): Promise<Data<DecisionSuccessResponse> | DecisionErrorResponse> {

    const input = Array.from(formData.values()) // .map(v => isNaN(+v) ? v : +v) // convert string numbers to numbers (not necessary - API accepts string numbers too)
    const scenarioData: Data<Scenario> = { data: { type: "scenario", attributes: { input } } };

    console.log("Getting tom decision:", modelId, JSON.stringify(scenarioData));

    const res = await fetch(new URL(`${V3_API_Pathnames.Decision}/${modelId}`, baseUrl), {
        method: 'POST',
        headers,
        body: JSON.stringify(scenarioData)
    });

    return res.json();
}