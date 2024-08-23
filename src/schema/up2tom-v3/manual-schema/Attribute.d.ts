import AttributeType from "./AttributeType";
import CategoricalDomain from "./CategoricalDomain";
import ContinuousDomain from "./ContinuousDomain";

export default interface Attribute {
    type: AttributeType;
    name: string;
    question: string;
    domain: ContinuousDomain | CategoricalDomain; // These are the only two types of domains we have for now
}