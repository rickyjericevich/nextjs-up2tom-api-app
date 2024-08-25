'use client';

import { authenticate } from '@/app/actions';
import { useFormState } from 'react-dom';

export default function LoginForm() {
    const [isPending, formAction] = useFormState(authenticate, undefined);

    return (
        <form action={formAction}>

            <h1>
                Please log in to continue.
            </h1>
            
            <label htmlFor="email">
                Email
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                />
            </label>

            <label htmlFor="password">
                Password
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={8}
                />
            </label>

            <button aria-disabled={isPending}>
                Log in
            </button>
            {/* {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
        </form>
    );
}