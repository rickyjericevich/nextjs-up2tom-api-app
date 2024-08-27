import { type NextRequest } from 'next/server'
import Decision from '@/schema/mongoose/Decision';
import { deleteRequest, getRequest, postRequest } from '@/lib/api';

export async function GET(req: NextRequest) {
    return getRequest(Decision, req);
}

export async function POST(req: NextRequest) {
    return postRequest(Decision, req);
}

export async function DELETE(req: NextRequest) {
    return deleteRequest(Decision, req);
}
