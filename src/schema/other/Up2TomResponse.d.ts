import { Up2TomResponseType } from "./Enums";

export default interface Up2TomResponse {
    type: Up2TomResponseType;
    data: any;
}