'use client';

import { authenticate } from '@/app/actions';
import { useFormState } from 'react-dom';
import FormSubmitButton from '@/app/components/FormSubmitButton';

export default function LoginPage() {
  const [loginErrorMessage, formAction] = useFormState(authenticate, undefined);

  return <main>

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

      <FormSubmitButton>Log in</FormSubmitButton>
      {loginErrorMessage && <>
        <p>{loginErrorMessage}</p>
        <p>Please try again.</p>
      </>
      }
    </form>

  </main>
}