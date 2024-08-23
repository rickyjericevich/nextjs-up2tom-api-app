import { RelationType } from "./Enums";

export default interface Relation {
    type: RelationType;
    index: number;
    threshold: number;
}