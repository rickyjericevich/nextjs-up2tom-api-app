import { useFormStatus } from "react-dom";
import { ComponentPropsWithoutRef } from "react";

interface InputGroupProps extends ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
}

export default function FormSubmitButton({ children, ...props }: InputGroupProps): JSX.Element {
    const { pending } = useFormStatus();
    return <button
        {...props}
        type="submit"
        aria-disabled={pending}>
        {children}
    </button>
}