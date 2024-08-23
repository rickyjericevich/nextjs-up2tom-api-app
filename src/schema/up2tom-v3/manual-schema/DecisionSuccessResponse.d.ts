import Scenario from "./Scenario";
import DecisionSuccessResponseAttributes from "./DecisionSuccessResponseAttributes";

export default interface DecisionSuccessResponse extends Scenario{
    id: string;
    attributes: DecisionSuccessResponseAttributes;
}