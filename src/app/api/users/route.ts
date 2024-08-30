import { type NextRequest } from 'next/server'
import { UserModel } from '@/schema/mongoose/User';
import { handleGetRequest, handlePostRequest } from '@/lib/api-server-side';

export async function GET(req: NextRequest) {
    return handleGetRequest(UserModel, req);
}

export async function POST(req: NextRequest) {
    return handlePostRequest(UserModel, req);
}
