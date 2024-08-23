import BlatantExclusion from "./BlatantExclusion";
import { StatusCode } from "./Enums";
import RelationshipExclusion from "./RelationshipExclusion";
import ValueExclusion from "./ValueExclusion";

export default interface DecisionError {
    title: string;
    detail: string;
    status: StatusCode;
    rules?: Array<BlatantExclusion | RelationshipExclusion | ValueExclusion>
}