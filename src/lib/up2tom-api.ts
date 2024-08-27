'use server'

import Data from "@/schema/up2tom-v3/manual-schema/Data";
import Model from "@/schema/up2tom-v3/manual-schema/Model";
import Scenario from "@/schema/up2tom-v3/manual-schema/Scenario";
import DecisionSuccessResponse from "@/schema/up2tom-v3/manual-schema/DecisionSuccessResponse";
import { V3_API_Pathnames } from "@/schema/up2tom-v3/manual-schema/Enums";
import GetBatchFilesSuccessResponse from "@/schema/up2tom-v3/manual-schema/GetBatchFilesSuccessResponse";
import { AuthError } from 'next-auth';
import { signIn, signOut } from "@/lib/auth";
import DecisionError from "@/schema/up2tom-v3/manual-schema/DecisionError";
import { Up2TomResponseType } from "@/schema/other/Enums";
import Up2TomSuccessResponse from "@/schema/other/Up2TomSuccessResponse";
import Up2TomErrorResponse from "@/schema/other/Up2TomErrorResponse";
import Error from "@/schema/up2tom-v3/manual-schema/Error";
import Job from "@/schema/up2tom-v3/manual-schema/Job";

// TODO: move constants to a config file
const baseUrl = process.env.UP2TOM_BASE_URL || 'https://api.up2tom.com';
const apiKey = process.env.UP2TOM_API_KEY;

const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Authorization': 'Token ' + apiKey
}

export async function getTomModels(): Promise<Up2TomSuccessResponse<Model[]> | Up2TomErrorResponse<Error>> {
    const res = await fetch(new URL(V3_API_Pathnames.Models, baseUrl), { headers });
    const body = await res.json();

    if (body.data) return {
        type: Up2TomResponseType.Success,
        data: body.data
    }

    return {
        type: Up2TomResponseType.Error,
        data: body.errors[0]
    }
}

export async function getTomModel(modelId: string): Promise<Up2TomSuccessResponse<Model> | Up2TomErrorResponse<Error>> {
    const res = await fetch(new URL(`${V3_API_Pathnames.Models}/${modelId}`, baseUrl), { headers });
    const body = await res.json();

    if (body.data) return {
        type: Up2TomResponseType.Success,
        data: body.data
    }

    return {
        type: Up2TomResponseType.Error,
        data: body.errors[0]
    }
}

export async function postTomDecision(modelId: string, formData: FormData): Promise<Up2TomSuccessResponse<DecisionSuccessResponse> | Up2TomErrorResponse<DecisionError>> {
    const input = Array.from(formData.values()).map(v => isNaN(+v) ? v : +v) // convert string numbers to numbers (not necessary - API accepts string numbers too)
    const scenarioData: Data<Scenario> = { data: { type: "scenario", attributes: { input } } };

    console.log("Getting tom decision:", modelId, JSON.stringify(scenarioData), headers);

    let res = await fetch(new URL(`${V3_API_Pathnames.Decision}/${modelId}`, baseUrl), {
        method: 'POST',
        headers,
        body: JSON.stringify(scenarioData)
    });

    const body = await res.json();

    if (body.data) return {
        type: Up2TomResponseType.Success,
        data: body.data
    }

    return {
        type: Up2TomResponseType.Error,
        data: body.errors[0]
    }
}

export async function getBatchFilesAndJobs(modelId: string): Promise<Up2TomSuccessResponse<GetBatchFilesSuccessResponse> | Up2TomErrorResponse<Error>> {
    const res = await fetch(new URL(`${V3_API_Pathnames.Batch}/${modelId}`, baseUrl), { headers });
    const body = await res.json();

    if (body.data) return {
        type: Up2TomResponseType.Success,
        data: body.data
    }

    return {
        type: Up2TomResponseType.Error,
        data: body.errors[0]
    }
}

export async function postBatchFile(modelId: string, formData: FormData): Promise<Up2TomSuccessResponse<Job> | Up2TomErrorResponse<Error>> {
    headers['Content-Type'] = 'multipart/form-data';
    console.log("Posting batch file:", modelId, formData, new URL(`${V3_API_Pathnames.Batch}/${modelId}`, baseUrl), headers);
    const res = await fetch(new URL(`${V3_API_Pathnames.Batch}/${modelId}`, baseUrl), {
        method: 'POST',
        headers,
        body: formData
    });

    const body = await res.json();

    console.debug("Batch file response:", body);

    if (body.data) return {
        type: Up2TomResponseType.Success,
        data: body.data.jobs[0]
    }

    return {
        type: Up2TomResponseType.Error,
        data: body.errors[0]
    }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    console.debug("Authenticating with credentials:", formData);
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function logOut() {
    await signOut();
}