'use client';
import { useState, FormEvent } from 'react';
import { login } from './actions';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    try {
      await login(formData);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex m-6 justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-black text-2xl font-bold mb-4 text-center">Login</h2>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={isSubmitting}
          className="text-black mt-1 mb-4 p-2 w-full border border-gray-300 rounded-md disabled:opacity-50"
        />
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          disabled={isSubmitting}
          className="text-black mt-1 mb-4 p-2 w-full border border-gray-300 rounded-md disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
