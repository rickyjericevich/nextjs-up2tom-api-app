import { Document, Schema, models, model, Model } from "mongoose";
import Data from "../up2tom-v3/manual-schema/Data";
import Job from "../up2tom-v3/manual-schema/Job";

export interface BatchDocument extends Data<Job>, Document {
  createdBy: string; // TODO: see if this can be changed to ObjectId type
  createdAt: Date;
  updatedAt: Date;
}

const batchSchema = new Schema<BatchDocument>({
  createdBy: { type: String, required: false },
  data: {
    id: { type: String, required: true },
    filename: { type: String, required: true },
    uploaded: { type: Date, required: true },
    size: { type: Number, required: true },
    progress: { type: Number, required: true },
  }
}, { timestamps: true } // Automatically add 'createdAt' and 'updatedAt' fields to the document
);

const BatchDocument: Model<BatchDocument> = models?.Batch || model<BatchDocument>("Batch", batchSchema);
export default BatchDocument;