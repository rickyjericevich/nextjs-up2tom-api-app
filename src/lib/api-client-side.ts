'use client'

import DecisionSuccessResponse from "@/schema/up2tom-v3/manual-schema/DecisionSuccessResponse";
import { ApiEndpoint } from "@/schema/other/Enums";
import mongoose, { Document } from "mongoose";
import { DecisionDocument, DecisionModel } from "@/schema/mongoose/Decision";
import { BatchDocument, BatchModel } from "@/schema/mongoose/Batch";
import Job from "@/schema/up2tom-v3/manual-schema/Job";
import { UserModel, User, UserDocument } from "@/schema/mongoose/User";

async function insertDocumentIntoDb<Type>(doc: Document<Type>, endpoint: ApiEndpoint): Promise<object> {
    const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc.toJSON()),
    });

    return response.json();
}

async function deleteDocumentFromDb(_id: mongoose.Types.ObjectId, endpoint: ApiEndpoint): Promise<null> {
    const response = await fetch(`/api/${endpoint}/${_id.toString()}`, {
        method: "DELETE",
    });

    return response.json();
}

export async function insertDecision(decision: DecisionSuccessResponse): Promise<DecisionDocument> {
    const body = new DecisionModel({ data: decision }, { skipId: true });
    const res = await insertDocumentIntoDb(body, ApiEndpoint.Decisions);
    return DecisionModel.castObject(res);
}

export async function insertBatch(batch: Job): Promise<BatchDocument> {
    const body = new BatchModel({ data: batch }, { skipId: true });
    const res = await insertDocumentIntoDb(body, ApiEndpoint.Batches);
    return BatchModel.castObject(res);
}

export async function insertUser(user: User): Promise<UserDocument> {
    const body = new UserModel(user, { skipId: true });
    const res = await insertDocumentIntoDb(body, ApiEndpoint.Users);
    return UserModel.castObject(res);
}

// export async function deleteDecision(decisionDoc: DecisionDocument): Promise<Response> {
//     return deleteDocumentFromDb(decisionDoc._id, ApiEndpoint.Decisions);
// }