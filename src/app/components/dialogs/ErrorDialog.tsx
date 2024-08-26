import Dialog, { DialogProps } from "./Dialog";
import DecisionError from "@/schema/up2tom-v3/manual-schema/DecisionError";
import { useState } from "react";

export interface ErrorDialogProps extends Omit<DialogProps, "isError" | "title" | "children" | "isShowing"> {
    error: DecisionError | undefined;
}

export default function ErrorDialog({ error, ...props }: ErrorDialogProps): JSX.Element {
    const defaultError = { title: "Error", detail: "An error occurred. Please try again later", status: 400 };
    // TODO: handle & display error rules properly
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen);
    };

    function showDialog(show: boolean) {

    }

    return (
        <Dialog
            {...props}
            isShowing={error !== undefined}
            isError
            title={error?.title || defaultError.title}
        >
            <div>
                <p>{error?.detail || defaultError.title}</p>
                {error?.rules && error.rules.length > 0 && (
                    <div>
                        <button
                            onClick={toggleDropdown}
                            className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
                        >
                            {isDropdownOpen ? "Hide Rules" : "Show Rules"}
                        </button>
                        {isDropdownOpen && (
                            <ul className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                {error.rules.map((rule, index) => (
                                    <li key={index} className="mb-2">
                                        <pre className="whitespace-pre-wrap">{JSON.stringify(rule, null, 2)}</pre>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </Dialog>
    )
}