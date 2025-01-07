'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages

  const handleLogin = async (e: React.FormEvent) => {
    
    e.preventDefault();

    // Reset messages
    setError('');
    setSuccess('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    console.log("test")
    const data = await res.json();
    console.log(data)

    if (data.success) {
      setSuccess('Login successful!'); // Set success message
      router.refresh()
      setTimeout(() => router.push('/blog'), 1000); // Redirect after a short delay
    } else {
      setError('Invalid username or password. Please try again.'); // Set error message
      console.error(data.message); // Log the error message for debugging
    }
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <form onSubmit={handleLogin} className="flex flex-col w-80 gap-4 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-black">Login</h2>
        
        <TextField
          type="text"
          variant="outlined"
          color="primary"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />

        <TextField
          type="password"
          variant="outlined"
          color="primary"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />

        {error && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )}
        
        {success && (
          <p className="text-green-500 text-center mt-2">{success}</p>
        )}

        <button type="submit" className="p-2 mt-4 bg-gray-500 text-white rounded hover:bg-gray-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Page;
