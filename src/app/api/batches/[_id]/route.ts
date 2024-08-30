import { handleDeleteRequest } from "@/lib/api-server-side";
import { BatchModel } from "@/schema/mongoose/Batch";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest, { params }: { params: { _id: string } }) {
    return handleDeleteRequest(BatchModel, new mongoose.Types.ObjectId(params._id));
}
