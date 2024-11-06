'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  const [queries, setQueries] = useState("");
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
  }, [queries]); // Include query dependency to use the latest query when enter is pressed

  return (
    <div className={`flex ${response ? "items-center" : ""} justify-center mt-10 h-screen pb-20`}>
        <main className="flex items-end flex-col gap-8 row-start-2 items-center w-3/4 sm:w-128">
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
                    "What can I help with?", 
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
            <div className="flex justify-center items-center">
              <input
                value={queries[-1]}
                onChange={(e) => setQueries(e.target.value)} // Update query as user types
                placeholder="What would you like to learn?"
                className="bg-white rounded-lg p-3 border-2 border-black w-2/3 sm:w-96 hover:border-sky-400"
              />
              <button type="submit" className="hover:bg-sky-400 bg-gray-500 ml-2 p-3 text-white h-full rounded-lg border-black border-2">
                Ask
              </button>
            </div>
          </form>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
