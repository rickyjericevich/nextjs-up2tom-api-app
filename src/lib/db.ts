import mongoose, { Mongoose, connect, Model, Document } from "mongoose";
import { getPropertyGivenStringPath } from "./helpers";

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable');

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase(): Promise<Mongoose> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            //   bufferCommands: false,
        };

        console.info('Connecting to db at ', MONGODB_URI);

        cached.promise = connect(MONGODB_URI, opts).then((mongoose) => {
            console.info('Db connected');
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};


export async function queryDocumentsFromDb<Type>(mongooseModel: Model<Type>, query: Record<string, any> = {}): Promise<Type[]> {
    await connectToDatabase();

    return mongooseModel.find(query);
}

export async function insertDocumentIntoDb<Type>(document: Document<Type>): Promise<Document<Type>> {
    await connectToDatabase();

    const existingDocument: Document<Type> | null = await document.model().findOne({ 'data.id': getPropertyGivenStringPath('data.id', document) }); // check if document already exists // TODO: dont just assume that the id field is always present and unique

    if (existingDocument) {
        console.debug("Not creating new document as it already exists: ", existingDocument);
        return existingDocument;// if it does, return it, no need to error
    }

    return document.save(); // otherwise save it in the db and return it
}

export async function deleteDocumentFromDb<Type>(mongooseModel: Model<Type>, _id: mongoose.Types.ObjectId): Promise<Document<Type> | null> {
    await connectToDatabase();
    return mongooseModel.findByIdAndDelete(_id);
}