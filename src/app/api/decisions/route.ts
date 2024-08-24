import { type NextRequest } from 'next/server'
import Decision from '@/schema/mongoose/Decision';
import dbConnect from '@/lib/db';
import { convertURLSearchParamsToObject, insertDocumentIntoDb, queryDocumentsFromDb } from '@/lib/helpers';

export async function GET(req: NextRequest) {
    await dbConnect();

    const query = convertURLSearchParamsToObject(req.nextUrl.searchParams);
    console.debug("Query params: ", query);
    
    const docs = await queryDocumentsFromDb(Decision, query);
    console.debug("Found decisions: ", docs);
    return Response.json(docs);
}

export async function POST(req: NextRequest) {
    await dbConnect();

    const body = await req.json();
    console.debug("Request body: ", body);

    const decision = new Decision(body);
    console.info("Received decision: ", decision);

    const savedDecision = await insertDocumentIntoDb(decision);
    console.info("Saved decision: ", savedDecision);
    return Response.json(savedDecision, { status: 201 });
 }

export async function DELETE(req: NextRequest) {
    await dbConnect();

 }