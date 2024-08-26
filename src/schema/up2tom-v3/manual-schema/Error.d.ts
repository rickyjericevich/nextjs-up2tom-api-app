import { StatusCode } from "./Enums";

export default interface Error {
    title: string;
    detail: string;
    status: StatusCode;
}