'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset messages
    setError('');
    setSuccess('');

    // Hash the password using SHA-256
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: hashedPassword }),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess('Login successful!'); // Set success message
      router.refresh()
      setTimeout(() => router.back(), 1000); // Redirect after a short delay
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
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
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
