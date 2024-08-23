import Attribute from "@/schema/manual-schema/Attribute";
import { AttributeType } from "@/schema/manual-schema/Enums";
import ContinuousAttributeInput from "./ContinuousAttributeInput";
import NominalAttributeInput from "./NominalAttributeInput";

function getAppropriateAttributeInput(attribute: Attribute): JSX.Element {
    switch (attribute.type) {
        case AttributeType.Continuous:
            return <ContinuousAttributeInput name={attribute.name} domain={attribute.domain}/>;
        case AttributeType.Nominal:
            return <NominalAttributeInput name={attribute.name} domain={attribute.domain}/>;
        default: // TODO: fix this up
            console.warn(`Unknown attribute type '${attribute.type}'. Rendering default input element for this attribute...`);
            return <></>;
    }
}

export default function AttributeInput({ attribute }: { attribute: Attribute }): JSX.Element {
    const Component = getAppropriateAttributeInput(attribute);

    return (
        <label>
            {attribute.question}
            {Component}
        </label>
    )
}