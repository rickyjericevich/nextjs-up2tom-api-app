import Error from "./Error";

export default interface Errors<Type extends Error> {
    errors: Type[];
}