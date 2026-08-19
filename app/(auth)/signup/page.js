'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/actions/auth.actions';
import Link from 'next/link';

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signUp, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push('/');
      router.refresh();
    }
  }, [state, router]);

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between border-t-2 border-b border-neutral-900 py-1.5 text-[11px] uppercase tracking-[0.15em] text-neutral-500">
          <span>{today}</span>
          <span>Sign up</span>
        </div>

        <h1 className="mt-8 font-serif text-[2.25rem] italic leading-[1.1] text-neutral-900">
          Create your account.
        </h1>

        <form action={formAction} className="mt-8 space-y-6">
          <label className="block">
            <span className="block text-[11px] uppercase tracking-[0.1em] text-neutral-500">
              Name (optional)
            </span>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="mt-2 w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-[15px] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            />
          </label>

          <label className="block">
            <span className="block text-[11px] uppercase tracking-[0.1em] text-neutral-500">
              Email
            </span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="mt-2 w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-[15px] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            />
          </label>

          <label className="block">
            <span className="block text-[11px] uppercase tracking-[0.1em] text-neutral-500">
              Password
            </span>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              className="mt-2 w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-[15px] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            />
          </label>

          {state?.error && <p className="text-sm text-red-700">{state.error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-neutral-900 py-3 text-[13px] uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <div className="mt-10 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link href="/login" className="text-neutral-900 underline underline-offset-2">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}