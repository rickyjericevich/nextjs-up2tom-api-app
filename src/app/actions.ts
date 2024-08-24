'use server'

import Data from "@/schema/up2tom-v3/manual-schema/Data";
import Model from "@/schema/up2tom-v3/manual-schema/Model";
import Scenario from "@/schema/up2tom-v3/manual-schema/Scenario";
import DecisionSuccessResponse from "@/schema/up2tom-v3/manual-schema/DecisionSuccessResponse";
import DecisionErrorResponse from "@/schema/up2tom-v3/manual-schema/DecisionErrorResponse";
import { V3_API_Pathnames } from "@/schema/up2tom-v3/manual-schema/Enums";
import GetBatchFilesSuccessResponse from "@/schema/up2tom-v3/manual-schema/GetBatchFilesSuccessResponse";

// TODO: move constants to a config file
const baseUrl = process.env.UP2TOM_BASE_URL || 'https://api.up2tom.com';
const apiKey = process.env.UP2TOM_API_KEY;

const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Authorization': 'Token ' + apiKey
}

export async function getTomModels(): Promise<Data<Model[]>> {
    const res = await fetch(new URL(V3_API_Pathnames.Models, baseUrl), { headers });
    return res.json();
}

export async function getTomModel(modelId: string): Promise<Data<Model>> {
    const res = await fetch(new URL(`${V3_API_Pathnames.Models}/${modelId}`, baseUrl), { headers });
    return res.json();
}

export async function postTomDecision(modelId: string, formData: FormData): Promise<Data<DecisionSuccessResponse> | DecisionErrorResponse> {

    const input = Array.from(formData.values()).map(v => isNaN(+v) ? v : +v) // convert string numbers to numbers (not necessary - API accepts string numbers too)
    const scenarioData: Data<Scenario> = { data: { type: "scenario", attributes: { input } } };

    console.log("Getting tom decision:", modelId, JSON.stringify(scenarioData));

    const res = await fetch(new URL(`${V3_API_Pathnames.Decision}/${modelId}`, baseUrl), {
        method: 'POST',
        headers,
        body: JSON.stringify(scenarioData)
    });

    return res.json();
}

export async function getBatchFilesAndJobs(modelId: string): Promise<Data<GetBatchFilesSuccessResponse>> {
    const res = await fetch(new URL(`${V3_API_Pathnames.Batch}/${modelId}`, baseUrl), { headers });
    return res.json();
}