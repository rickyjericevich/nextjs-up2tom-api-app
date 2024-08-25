import { Mongoose, connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable');

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function connectToDatabase(): Promise<Mongoose> {
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