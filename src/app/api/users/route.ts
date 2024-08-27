import { type NextRequest } from 'next/server'
import User from '@/schema/mongoose/User';
import { deleteRequest, getRequest, postRequest } from '@/lib/api';

export async function GET(req: NextRequest) {
    return getRequest(User, req);
}

export async function POST(req: NextRequest) {
    return postRequest(User, req);
}

export async function DELETE(req: NextRequest) {
    return deleteRequest(User, req);
}
