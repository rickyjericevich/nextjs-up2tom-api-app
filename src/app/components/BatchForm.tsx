'use client'

import { postBatchFile } from "@/app/actions";
import Model from "@/schema/up2tom-v3/manual-schema/Model";
import { useFormState } from "react-dom";
import FormSubmitButton from "@/app/components/FormSubmitButton";
import ErrorDialog from "./dialogs/ErrorDialog";
import { Up2TomResponseType } from "@/schema/other/Enums";
import BatchDialog from "./dialogs/BatchDialog";
import { DialogButtonType } from "./dialogs/OneButtonDialog";
import Up2TomSuccessResponse from "@/schema/other/Up2TomSuccessResponse";
import Job from "@/schema/up2tom-v3/manual-schema/Job";
import Up2TomErrorResponse from "@/schema/other/Up2TomErrorResponse";
import Error from "@/schema/up2tom-v3/manual-schema/DecisionError";

export default function BatchForm({ tomModel }: { tomModel: Model }): JSX.Element {

    const [formState, formAction] = useFormState(handleSubmitForm, null);

    function stopShowingDialog() {
        formAction(); // reset formState to undefined
    }

    async function handleSubmitForm(previousState?: any, formData?: FormData): Promise<Up2TomSuccessResponse<Job> | Up2TomErrorResponse<Error> | undefined> {
        // TODO: validate data here
        if (!formData) return;

        return postBatchFile(tomModel.id, formData);
    }

    return (
        <form action={formAction}>

            <label>

                <span className="block">Select a file:</span>

                <input
                    type="file"
                    name="file"
                    accept=".csv"
                    className="mt-1 block w-full text-sm  dark:text-gray-300 dark:border-gray-600"
                />

            </label>

            <FormSubmitButton className="w-full border border-transparent text-sm font-medium">
                Submit
            </FormSubmitButton>

            {formState && (formState.type === Up2TomResponseType.Success ? (
                <BatchDialog
                    tomModel={tomModel}
                    batch={formState.data}
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