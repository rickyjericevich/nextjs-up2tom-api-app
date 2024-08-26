import Dialog, { DialogProps } from "./Dialog";
import React from "react";
import ErrorDialog, { ErrorDialogProps } from "./ErrorDialog";
import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";


export enum DialogButtonType {
    Save = "save",
    Delete = "delete",
}

export interface OneButtonDialogProps extends ErrorDialogProps, Omit<DialogProps, "isError"> {
    onClick: () => void;
    buttonType: DialogButtonType;
    stopShowingError: () => void;
}

function getButtonJSX(buttonType: DialogButtonType, onClick: () => void): JSX.Element {
    switch (buttonType) {
        case DialogButtonType.Save:
            return <button onClick={onClick} >
                <CloudArrowUpIcon className="h-5 w-5" />
            </button>

        case DialogButtonType.Delete:
            return <button onClick={onClick} >
                <TrashIcon className="h-5 w-5" />
            </button>

        default:
            return <></>
    }
}

export default function OneButtonDialog({ onClick, buttonType, error, stopShowingError, children, ...props }: OneButtonDialogProps): JSX.Element {
    return (<>
        <Dialog {...props}>

            <div className="flex flex-col h-full">

                <div className="flex-grow">
                    {children}
                </div>

                <div className="flex justify-center">
                    {getButtonJSX(buttonType, onClick)}
                </div>

            </div>

        </Dialog>

        <ErrorDialog
            error={error}
            stopShowing={stopShowingError}
        />
    </>)
}