import { Up2TomResponseType } from "./Enums";
import Up2TomResponse from "./Up2TomResponse";

export default interface Up2TomSuccessResponse<Type> extends Up2TomResponse {
    type: Up2TomResponseType.Success;
    data: Type;
}