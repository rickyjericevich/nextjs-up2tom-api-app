'use client';

import { authenticate } from '@/app/actions';
import { useFormState } from 'react-dom';
import FormSubmitButton from '@/app/components/FormSubmitButton';

export default function LoginPage() {
  const [loginErrorMessage, formAction] = useFormState(authenticate, undefined);

  return (
    <main className="bg-gradient-to-b from-transparent to-background-end-rgb">

      <form action={formAction}>

        <h1 className="text-2xl mb-6 text-center text-gray-900 dark:text-gray-100">
          Please log in to continue
        </h1>

        <label htmlFor="email">
          <span className="block">Email</span>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            className="mt-1 block w-full px-3 py-2 dark:border-gray-600 sm:text-sm"
          />
        </label>

        <label htmlFor="password" className="mb-6">
          <span className="block">Password</span>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            minLength={8}
            className="mt-1 block w-full px-3 py-2 dark:border-gray-600 sm:text-sm"
          />
        </label>

        <FormSubmitButton className="w-full border border-transparent text-sm font-medium">
          Log in
        </FormSubmitButton>

        {loginErrorMessage && (
          <div className="mt-4 text-center form-error">
            <h2>{loginErrorMessage} Please try again.</h2>
          </div>
        )}

      </form>

    </main>
  );
}