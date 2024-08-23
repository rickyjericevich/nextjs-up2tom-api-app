import ContinuousDomain from "@/schema/manual-schema/ContinuousDomain";
import { ComponentPropsWithoutRef } from "react";

interface InputGroupProps extends ComponentPropsWithoutRef<"input"> {
    domain: ContinuousDomain;
}

export default function ContinuousAttributeInput({ domain, ...props }: InputGroupProps): JSX.Element {
    return <input
        {...props}
        type='number'
        min={domain.lower}
        max={domain.upper}
        step={domain.discrete ? domain.interval : 'any'}
        required
    />
}