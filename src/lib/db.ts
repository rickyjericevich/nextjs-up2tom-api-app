import { Mongoose, connect } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

type CachedMongoose = {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable');

let cached: CachedMongoose = global.mongo;
if (!cached) cached = global.mongo = { conn: null, promise: null };

async function dbConnect(): Promise<Mongoose> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            // bufferCommands: false,
        }
        console.log('Connecting to db at ', MONGODB_URI);
        cached.promise = connect(MONGODB_URI, opts).then(mongoose => {
            console.log('Db connected');
            return mongoose;
        })
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;