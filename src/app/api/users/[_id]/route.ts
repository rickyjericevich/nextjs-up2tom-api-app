import { handleDeleteRequest } from "@/lib/api-server-side";
import { UserModel } from "@/schema/mongoose/User";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest, { params }: { params: { _id: string } }) {
    return handleDeleteRequest(UserModel, new mongoose.Types.ObjectId(params._id));
}
