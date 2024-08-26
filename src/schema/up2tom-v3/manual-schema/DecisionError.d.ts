import Error from "./Error";
import BlatantExclusion from "./BlatantExclusion";
import RelationshipExclusion from "./RelationshipExclusion";
import ValueExclusion from "./ValueExclusion";

export default interface DecisionError extends Error {
    rules?: Array<BlatantExclusion | RelationshipExclusion | ValueExclusion>
}