'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  async function getResponse() {
    
  }

  // Handle "Enter" key press to trigger the submitQuery function
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        getResponse();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [query]); // Include query dependency to use the latest query when enter is pressed

  return (
    <div className="items-center justify-items-center min-h-screen p-2 mt-5">
      <main className="flex flex-col gap-8 row-start-2 items-center w-1/3">
        {response && (
            <div className="flex items-start">
              <Image
                src="/storm-ai.png" // path to the image in the public folder
                alt="Storm AI logo"
                width={25} // Adjust the width
                height={25} // Adjust the height
              />
              <p>:&nbsp;&nbsp;</p> 
              <TypeAnimation
                sequence={[
                  response, 
                ]}
                cursor={true}
                repeat={1}
                className="text-white"
              />
            </div>
          )}
        {!response && (
          <div className="flex items-center justify-items">
            <Image
              src="/storm-ai.png" // path to the image in the public folder
              alt="Storm AI Logo"
              width={50} // Adjust the width
              height={50} // Adjust the height
              className=""
            />
            <TypeAnimation 
                sequence={[
                  "What can I help with today?", 
                ]}
                cursor={true}
                repeat={1}
                className="text-2xl font-bold p-2 m-2 text-white"
              />
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission refresh
            getResponse();
          }}
          className="w-full"
        >
          <div className="grid grid-cols-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update query as user types
              placeholder="What would you like to learn?"
              className="col-span-7 bg-gray-200 rounded-lg p-3 border-2 border-black"
            />
            <button type="submit" className="bg-gray-500 ml-2 p-2 text-white h-full rounded-lg col-span-1 border-black border-2">
              Ask
            </button>
          </div>
        </form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
