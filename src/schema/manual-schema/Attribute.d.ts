import AttributeType from "./AttributeType";
import Domain from "./Domain";

export default interface Attribute {
    type: AttributeType;
    name: string;
    question: string;
    domain: Domain;
}