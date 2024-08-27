import { type NextRequest } from 'next/server'
import Batch from '@/schema/mongoose/Batch';
import { deleteRequest, getRequest, postRequest } from '@/lib/api';

export async function GET(req: NextRequest) {
    return getRequest(Batch, req);
}

export async function POST(req: NextRequest) {
    return postRequest(Batch, req);
}

export async function DELETE(req: NextRequest) {
    return deleteRequest(Batch, req);
}
