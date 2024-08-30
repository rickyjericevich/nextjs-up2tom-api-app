import { Document, Schema, models, model, Model } from "mongoose";
import DecisionSuccessResponse from "@/schema/up2tom-v3/manual-schema/DecisionSuccessResponse";
import Data from "@/schema/up2tom-v3/manual-schema/Data";


export interface DecisionDocument extends Data<DecisionSuccessResponse>, Document {
  createdBy: string; // TODO: see if this can be changed to ObjectId type
  createdAt: Date;
  updatedAt: Date;
}

const decisionSchema = new Schema<DecisionDocument>({
  createdBy: { type: String, required: false },
  data: {
    id: { type: String, required: true },
    type: { type: String, required: true, default: "scenario" },
    attributes: {
      timestamp: { type: String, required: true },
      decision: { type: String, required: true, },
      "meets-confidence": { type: Boolean, required: true, },
      model: { type: String, required: true, },
      confidence: { type: Number, required: true, },
      reasons: { type: [Object], required: false }, // too lazy to create the different Exclusion types so I'm using Object
    }
  }
}, { timestamps: true } // Automatically add 'createdAt' and 'updatedAt' fields to the document
);

export const DecisionModel: Model<DecisionDocument> = models?.Decision || model<DecisionDocument>("Decision", decisionSchema);