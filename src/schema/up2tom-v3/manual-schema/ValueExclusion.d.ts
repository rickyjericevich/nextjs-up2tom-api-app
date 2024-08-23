import { ExclusionType } from "./Enums";
import Exclusion from "./Exclusion";
import Relation from "./Relation";

export default interface ValueExclusion extends Exclusion {
    type: ExclusionType.Value;
    antecedent: Relation[];
    consequent: Relation[];
}