import { handleDeleteRequest } from "@/lib/api-server-side";
import { DecisionModel } from "@/schema/mongoose/Decision";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest, { params }: { params: { _id: string } }) {
    return handleDeleteRequest(DecisionModel, new mongoose.Types.ObjectId(params._id));
}
