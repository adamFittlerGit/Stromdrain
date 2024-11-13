'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define types for habits
interface Habit {
  hid: number;
  name: string;
  description: string;
  frequency: string;
  active: boolean;
  last_completed: string | null;
  goal: number;
  percent_completion: number;
  date: string;
}

export default function HabitTracker() {
  const router = useRouter();

  // State for the list of habits and their instances
  const [habits, setHabits] = useState<Habit[]>([]);

  // Fetch habits and instances on load
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        // Fetch habits and habit instances from the backend
        const habitResponse = await fetch('/api/getHabits');
        const habitData = await habitResponse.json();
        console.log(habitData);
        
        setHabits(habitData);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    fetchHabits();
  }, []);

  // Handle completion update for a habit (calculates percentage if habit goal > 1)
  const updateHabitCompletion = async (hid: number, currentValue: number) => {
    const date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    // Calculate the percentage based on the habit's goal
    const habit = habits.find(habit => habit.hid === hid);
    const percentCompletion = habit && habit.goal > 1
      ? Math.min((currentValue / habit.goal) * 100, 100)  // Cap at 100%
      : currentValue === 100 ? 100 : 0; // Binary completion

    try {
       await fetch('/api/updateHabits', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ hid, date, percent_completion: percentCompletion }),
       });
     } catch (error) {
       console.error('Error updating habit completion:', error);
    }

    // Update the local state for percent_completion
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.hid === hid
          ? { ...habit, percent_completion: percentCompletion }
          : habit
      )
    );
  };

  // Separate habits by type
  const binaryHabits = habits.filter(habit => habit.goal === 1);
  const multiStepHabits = habits.filter(habit => habit.goal > 1);

  return (
    <div className="flex justify-center">
      <div className="w-3/4 max-w-3xl mb-10">
        <h1 className="text-4xl font-bold pt-6 pb-4 text-center text-white">Daily Habit Tracker</h1>
        
        {/* New Habit Button */}
        <div className="flex justify-start mb-4 mx-4">
          <button
            onClick={() => router.push('/habits/new')}
            className="bg-sky-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            + New Habit
          </button>
        </div>

        {/* Binary Habits Section */}
        <div className="p-4 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Completion Habits</h2>
          <div className="bg-gray-200 p-6 rounded-lg shadow-inner">
            {binaryHabits.length > 0 ? (
              <div className="space-y-6">
                {binaryHabits.map(habit => (
                  <div key={habit.hid} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{habit.name}</h2>
                      </div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={habit.percent_completion === 100}
                          onChange={() => updateHabitCompletion(habit.hid, habit.percent_completion === 100 ? 0 : 100)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">Complete</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No completion habits available.</p>
            )}
          </div>
        </div>

        {/* Multi-Step Habits Section */}
        <div className=" p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-white mb-4">Progressive Habits</h2>
          <div className="bg-gray-200 p-6 rounded-lg shadow-inner">
            {multiStepHabits.length > 0 ? (
              <div className="space-y-6">
                {multiStepHabits.map(habit => (
                  <div key={habit.hid} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{habit.name}</h2>
                      </div>
                      <div className="text-gray-500">
                        <p>Goal: {habit.goal}</p>
                        <p>Progress: {Math.round(habit.percent_completion)}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="0"
                        max={habit.goal}
                        value={Math.round((habit.percent_completion / 100) * habit.goal)}
                        onChange={(e) => {
                          const inputValue = parseInt(e.target.value);
                          updateHabitCompletion(habit.hid, inputValue);
                        }}
                        className="w-24 p-2 border border-gray-300 rounded-md text-center"
                      />

                      <input
                        type="range"
                        min="0"
                        max={habit.goal}
                        value={Math.round((habit.percent_completion / 100) * habit.goal)}
                        onChange={(e) => {
                          const inputValue = parseInt(e.target.value);
                          updateHabitCompletion(habit.hid, inputValue);
                        }}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No progressive habits available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
