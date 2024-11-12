'use client';

import { useEffect, useState } from 'react';

// Define types for habits
interface Habit {
  hid: number;
  name: string;
  description: string;
  frequency: string;
  active: boolean;
  last_completed: string | null;
  goal: number;
}

interface HabitInstance {
  date: string;
  hid: number;
  percent_completion: number;
}

export default function HabitTracker() {
  // State for the list of habits and their instances
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitInstances, setHabitInstances] = useState<Record<number, HabitInstance>>({});

  // Fetch habits and instances on load
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        // Fetch habits and habit instances from the backend
        const habitResponse = await fetch('/api/fetchHabits');
        const habitData = await habitResponse.json();
        
        const instanceResponse = await fetch('/api/createDailyHabitInstances', { method: 'POST' });
        const instanceData = await instanceResponse.json();

        setHabits(habitData.habits);
        setHabitInstances(instanceData.habitInstances);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    fetchHabits();
  }, []);

  // Handle checkbox toggle for marking a habit as completed
  const toggleHabitCompletion = async (hid: number) => {
    try {
      // Call the API to update habit completion
      await fetch('/api/completeHabit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hid }),
      });

      // Update the local state for last_completed
      setHabits(prevHabits =>
        prevHabits.map(habit =>
          habit.hid === hid
            ? { ...habit, last_completed: new Date().toISOString() }
            : habit
        )
      );
    } catch (error) {
      console.error('Error marking habit as completed:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">Daily Habits</h1>
        <div className="bg-white border-black border-2 my-4 rounded-lg px-8 py-6">
          {habits.length > 0 ? (
            <form className="space-y-4">
              {habits.map(habit => (
                <div key={habit.hid} className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={!!habit.last_completed}
                    onChange={() => toggleHabitCompletion(habit.hid)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <div className="flex flex-col">
                    <label htmlFor={`habit-${habit.hid}`} className="text-lg font-semibold">
                      {habit.name}
                    </label>
                    <span className="text-sm text-gray-600">{habit.description}</span>
                  </div>
                  <div className="ml-auto text-gray-500">
                    Goal: {habit.goal}
                    {habit.goal > 1 ? ' steps' : ' completed'}
                  </div>
                </div>
              ))}
            </form>
          ) : (
            <p className="text-center text-gray-500">Loading habits...</p>
          )}
        </div>
      </div>
    </div>
  );
}
