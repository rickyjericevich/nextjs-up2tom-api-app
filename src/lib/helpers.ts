import { Model, Document } from "mongoose";

export function resolve(path: string, obj: object = self, separator = '.'): any { // https://stackoverflow.com/a/22129960
    const properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev?.[curr], obj)
}

export function castStringToNativeType(value: string): any {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;

    const num = Number(value);
    if (isNaN(num)) return value;
    return num;
}

export function convertURLSearchParamsToObject(params: URLSearchParams): Record<string, any> {
    const obj: Record<string, any> = {};

    for (const [key, value] of params.entries())
        obj[key] = castStringToNativeType(value);

    return obj;
}

export async function queryDocumentsFromDb<Type>(MongooseModel: Model<Type>, query: Record<string, any> = {}): Promise<Type[]> {
    return MongooseModel.find(query);
}

export async function insertDocumentIntoDb<Type>(document: Document<Type>): Promise<Document<Type>> {
    const model = document.constructor as Model<Type>;

    const existingDocument: Document<Type> | null = await model.findOne({ 'data.id': resolve('data.id', document) }); // check if document already exists // TODO: dont just assume that the id field is always present and unique

    if (existingDocument) {
        console.debug("Not creating new document as it already exists: ", existingDocument);
        return existingDocument;// if it does, return it, no need to error
    }

    return document.save(); // otherwise save it in the db and return it
}

export async function deleteDocumentFromDb<Type>(){
    // TODO: implement
}