import BlatantExclusion from "./BlatantExclusion";
import Exclusion from "./Exclusion";
import RelationshipExclusion from "./RelationshipExclusion";
import ScenarioAttributes from "./ScenarioAttributes";
import ValueExclusion from "./ValueExclusion";

export default interface DecisionSuccessResponseAttributes extends ScenarioAttribute {
    timestamp: string;
    decision: string;
    "meets-confidence": boolean;
    model: string;
    confidence: number;
    reasons?: Array<BlatantExclusion | RelationshipExclusion | ValueExclusion>
}