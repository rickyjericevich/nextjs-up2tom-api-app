import ScenarioAttribute from "./ScenarioAttribute";

export default interface ScenarioResponseAttributes extends ScenarioAttribute {
    timestamp: string;
    decision: string;
    "meets-confidence": boolean;
}