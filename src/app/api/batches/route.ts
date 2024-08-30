import { type NextRequest } from 'next/server'
import { BatchModel } from '@/schema/mongoose/Batch';
import { handleGetRequest, handlePostRequest } from '@/lib/api-server-side';

export async function GET(req: NextRequest) {
    return handleGetRequest(BatchModel, req);
}

export async function POST(req: NextRequest) {
    return handlePostRequest(BatchModel, req);
}
