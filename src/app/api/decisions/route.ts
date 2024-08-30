import { type NextRequest } from 'next/server'
import { DecisionModel } from '@/schema/mongoose/Decision';
import { handleGetRequest, handlePostRequest } from '@/lib/api-server-side';

export async function GET(req: NextRequest) {
    return handleGetRequest(DecisionModel, req);
}

export async function POST(req: NextRequest) {
    return handlePostRequest(DecisionModel, req);
}