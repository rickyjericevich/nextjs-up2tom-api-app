import CategoricalDomain from "@/schema/manual-schema/CategoricalDomain";
import { ComponentPropsWithoutRef } from "react";

interface InputGroupProps extends ComponentPropsWithoutRef<"select"> {
    domain: CategoricalDomain;
}

export default function NominalAttributeInput({ domain, ...props }: InputGroupProps): JSX.Element {
    return <select {...props} required>
        {domain.values.map(val => <option key={val} value={val}>{val}</option>)}
    </select>
}