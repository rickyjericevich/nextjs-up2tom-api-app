import { type NextRequest } from 'next/server'
import Batch from '@/schema/mongoose/Batch';
import dbConnect from '@/lib/db';
import { convertURLSearchParamsToObject, insertDocumentIntoDb, queryDocumentsFromDb } from '@/lib/helpers';

export async function GET(req: NextRequest) {
    await dbConnect();

    const query = convertURLSearchParamsToObject(req.nextUrl.searchParams);
    console.debug("Query params: ", query);

    const docs = await queryDocumentsFromDb(Batch, query);
    console.debug("Found batches: ", docs);
    return Response.json(docs);
}

export async function POST(req: NextRequest) {
    await dbConnect();

    const body = await req.json();
    console.debug("Request body: ", body);

    const batch = new Batch(body);
    console.info("Received batch: ", batch);

    const savedBatch = await insertDocumentIntoDb(batch);
    console.info("Saved batch: ", savedBatch);
    return Response.json(savedBatch, { status: 201 });
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
}