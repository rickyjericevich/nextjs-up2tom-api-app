import { NextRequest } from "next/server";
import { convertURLSearchParamsToObject } from "./helpers";
import { queryDocumentsFromDb, insertDocumentIntoDb } from "./db";
import mongoose, { Model } from "mongoose";

export async function getRequest<Type>(mongooseModel: Model<Type>, req: NextRequest): Promise<Response> {
    const query = convertURLSearchParamsToObject(req.nextUrl.searchParams);
    console.debug("Query params: ", query);

    const docs = await queryDocumentsFromDb(mongooseModel, query);
    console.debug("Found documents of type ", mongooseModel.name, mongooseModel.modelName, docs);
    return Response.json(docs);
}

export async function postRequest<Type>(mongooseModel: Model<Type>, req: NextRequest): Promise<Response> {
    const body = await req.json();
    console.debug("Request body: ", body);

    const batch = new mongooseModel(body);
    console.info("Received document of type ", mongooseModel.name, mongooseModel.modelName, batch);

    const savedBatch = await insertDocumentIntoDb(batch);
    console.info("Inserted document of type", mongooseModel.name, mongooseModel.modelName, savedBatch);
    return Response.json(savedBatch, { status: 201 });
}

export async function deleteRequest<Type>(mongooseModel: Model<Type>, req: NextRequest): Promise<Response> {
    // TODO: implement
    return Response.json({ message: "Not implemented" }, { status: 501 });
}