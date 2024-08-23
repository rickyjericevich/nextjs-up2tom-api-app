import Scenario from "./Scenario";
import ScenarioResponseAttributes from "./ScenarioResponseAttributes";

export default interface ScenarioResponse extends Scenario{
    attributes: ScenarioResponseAttributes;
}