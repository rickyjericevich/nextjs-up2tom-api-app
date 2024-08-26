import { ComponentPropsWithoutRef, ReactNode, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface DialogProps extends ComponentPropsWithoutRef<"div"> {
    isShowing: boolean;
    stopShowing: () => void;
    title: string;
    isError?: boolean;
    children: ReactNode;
}

export default function Dialog({ isShowing, stopShowing, title, children, isError = false, ...props }: DialogProps): JSX.Element {

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const dialogElement = document.getElementById('dialog');
            if (dialogElement && !dialogElement.contains(event.target as Node)) {
                stopShowing();
            }
        };

        if (isShowing) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isShowing, stopShowing]);

    return isShowing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" {...props}>
            <div
                id="dialog"
                className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg ${isError && 'border border-red-500'}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-xl font-semibold ${isError ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`}>{title}</h2>
                    <button type="button" onClick={stopShowing} >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                {/* <div> */}
                {children}
                {/* </div> */}
            </div>
        </div>
    ) : <></>
}