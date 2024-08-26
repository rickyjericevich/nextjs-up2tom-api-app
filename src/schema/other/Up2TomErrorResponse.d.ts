import Error from "../up2tom-v3/manual-schema/Error";
import { Up2TomResponseType } from "./Enums";
import Up2TomResponse from "./Up2TomResponse";

export default interface Up2TomErrorResponse<Type extends Error> extends Up2TomResponse {
    type: Up2TomResponseType.Error;
    data: Type;
}