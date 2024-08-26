import Attribute from "@/schema/up2tom-v3/manual-schema/Attribute";
import { AttributeType } from "@/schema/up2tom-v3/manual-schema/Enums";
import ContinuousAttributeInput from "./ContinuousAttributeInput";
import NominalAttributeInput from "./NominalAttributeInput";
import ContinuousDomain from "@/schema/up2tom-v3/manual-schema/ContinuousDomain";
import CategoricalDomain from "@/schema/up2tom-v3/manual-schema/CategoricalDomain";

function getAppropriateAttributeInput(attribute: Attribute): JSX.Element {
    switch (attribute.type) {
        case AttributeType.Continuous:
            return <ContinuousAttributeInput
                name={attribute.name}
                domain={attribute.domain as ContinuousDomain}
                className="mt-1 block w-full px-3 py-2 dark:border-gray-600 sm:text-sm"
            />;
        case AttributeType.Nominal:
            return <NominalAttributeInput
                name={attribute.name}
                domain={attribute.domain as CategoricalDomain}
                className="mt-1 block w-full px-3 py-2 dark:border-gray-600 sm:text-sm"
            />;
        default: // TODO: fix this up
            console.warn(`Unknown attribute type '${attribute.type}'. Rendering default input element for this attribute...`);
            return <></>;
    }
}

export default function AttributeInput({ attribute }: { attribute: Attribute }): JSX.Element {
    const Component = getAppropriateAttributeInput(attribute);

    return <label>
        <span className="block">{attribute.question}</span>
        {Component}
    </label>
}