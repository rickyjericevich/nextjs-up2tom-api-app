import { type NextRequest } from 'next/server'
import User from '@/schema/mongoose/User';
import dbConnect from '@/lib/db';
import { convertURLSearchParamsToObject, insertDocumentIntoDb, queryDocumentsFromDb } from '@/lib/helpers';

export async function GET(req: NextRequest) {
    await dbConnect();

    const query = convertURLSearchParamsToObject(req.nextUrl.searchParams);
    console.debug("Query params: ", query);

    const docs = await queryDocumentsFromDb(User, query);
    console.debug("Found users: ", docs);
    return Response.json(docs);
}

export async function POST(req: NextRequest) {
    await dbConnect();

    const body = await req.json();
    console.debug("Request body: ", body);

    const user = new User(body);
    console.info("Received user: ", user);

    const savedUser = await insertDocumentIntoDb(user);
    console.info("Saved user: ", savedUser);
    return Response.json(savedUser, { status: 201 });
}

export async function DELETE(req: NextRequest) {
    await dbConnect();

}