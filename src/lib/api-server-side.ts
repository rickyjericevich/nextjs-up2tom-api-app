'use server'

import { NextRequest } from "next/server";
import { convertURLSearchParamsToObject } from "./helpers";
import { queryDocumentsFromDb, insertDocumentIntoDb, deleteDocumentFromDb } from "./db";
import mongoose, { Model, ObjectId } from "mongoose";
import DecisionSuccessResponse from "@/schema/up2tom-v3/manual-schema/DecisionSuccessResponse";
import { DecisionDocument, DecisionModel } from "@/schema/mongoose/Decision";
import { ApiEndpoint } from "@/schema/other/Enums";

export async function handleGetRequest<Type>(mongooseModel: Model<Type>, req: NextRequest): Promise<Response> {
    const query = convertURLSearchParamsToObject(req.nextUrl.searchParams);
    console.debug("Query params: ", query);

    const docs = await queryDocumentsFromDb(mongooseModel, query);
    console.debug("Found documents of type ", mongooseModel.name, mongooseModel.modelName, docs);
    return Response.json(docs);
}

export async function handlePostRequest<Type>(mongooseModel: Model<Type>, req: NextRequest): Promise<Response> {
    const body = await req.json();
    console.debug("Request body: ", body);

    const batch = new mongooseModel(body);
    console.info("Received document of type ", mongooseModel.name, mongooseModel.modelName, batch);

    const savedBatch = await insertDocumentIntoDb(batch);
    console.info("Inserted document of type", mongooseModel.name, mongooseModel.modelName, savedBatch);
    return Response.json(savedBatch, { status: 201 });
}

export async function handleDeleteRequest<Type>(mongooseModel: Model<Type>, _id: mongoose.Types.ObjectId): Promise<Response> {
    const doc = await deleteDocumentFromDb(mongooseModel, _id);

    console.log("Deleted document", doc);

    if (!doc) return Response.json(null, { status: 404 });

    return new Response(null, { status: 204 }); // must use new Response(...) when returning status 204: https://github.com/vercel/next.js/discussions/51475
}
