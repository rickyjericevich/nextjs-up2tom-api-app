'use client'

import { postTomDecision } from "@/lib/up2tom-api";
import Model from "@/schema/up2tom-v3/manual-schema/Model";
import AttributeInput from "@/app/components/inputs/AttributeInput";
import { useFormState } from "react-dom";
import FormSubmitButton from "@/app/components/FormSubmitButton";
import ErrorDialog from "./dialogs/ErrorDialog";
import { Up2TomResponseType } from "@/schema/other/Enums";
import DecisionDialog from "./dialogs/DecisionDialog";
import { DialogButtonType } from "./dialogs/OneButtonDialog";
import Up2TomSuccessResponse from "@/schema/other/Up2TomSuccessResponse";
import DecisionSuccessResponse from "@/schema/up2tom-v3/manual-schema/DecisionSuccessResponse";
import Up2TomErrorResponse from "@/schema/other/Up2TomErrorResponse";
import DecisionError from "@/schema/up2tom-v3/manual-schema/DecisionError";

export default function DecisionForm({ tomModel }: { tomModel: Model }): JSX.Element {

    const [formState, formAction] = useFormState(handleSubmitForm, undefined);

    function stopShowingDialog() {
        formAction(); // reset formState to undefined
    }

    async function handleSubmitForm(previousState?: any, formData?: FormData): Promise<Up2TomSuccessResponse<DecisionSuccessResponse> | Up2TomErrorResponse<DecisionError> | undefined> {
        // TODO: validate data here
        if (!formData) return;

        return postTomDecision(tomModel.id, formData);
    }

    return (
        <form action={formAction}>

            {tomModel.attributes.metadata.attributes.map(attr => <AttributeInput key={attr.name} attribute={attr} />)}

            <FormSubmitButton className="w-full border border-transparent text-sm font-medium">
                Submit
            </FormSubmitButton>

            {formState && (formState.type === Up2TomResponseType.Success ? (
                <DecisionDialog
                    tomModel={tomModel}
                    decision={formState.data}
                    isShowing={!!formState}
                    stopShowing={stopShowingDialog}
                    buttonType={DialogButtonType.Save}
                />
            ) : (
                <ErrorDialog
                    stopShowing={stopShowingDialog}
                    error={formState.data}
                />))}

        </form>
    );
}