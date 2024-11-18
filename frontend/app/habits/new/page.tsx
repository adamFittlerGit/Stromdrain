'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const NewHabit = () => {
  const router = useRouter();

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [goal, setGoal] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/addHabit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          frequency,
          active: true, // Always set to true
          goal,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add habit.');
      }

      // Notify user and redirect upon successful creation
      alert('Habit added successfully!');
      router.push('/habits'); // Redirect to the habits list page
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg m-10 relative text-black">
      <h1 className="text-3xl font-bold text-center mb-6">Add a New Habit</h1>
      
      {error && (
        <div className="mb-4 p-2 text-red-700 bg-red-200 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Habit Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Goal</label>
          <input
            type="number"
            min="1"
            value={goal}
            onChange={(e) => setGoal(parseInt(e.target.value))}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-600"
        >
          {loading ? 'Adding...' : 'Add Habit'}
        </button>
      </form>
      <br></br>
      {/* Back Button */}
      <button onClick={() => router.push('/habits')} >
        <Image src="/back-button.png" alt="Back" width={32} height={32} />
      </button>
    </div>
  );
};

export default NewHabit;
