'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Move async function outside of component
  const getResponse = async () => {
    setLoading(true);
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: JSON.stringify({query})
    });

    if (!res.ok) {
      throw new Error("Failed to get response");
    }
    
    const data = await res.json();
    setResponse(data)
    setLoading(false);
    return data;
  }

  useEffect(() => {
    const handleKeyDown = async (event: any) => {
      if (event.key === "Enter") {
        await getResponse();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [query, response]); 

  return (
    <div className={`flex ${response ? "items-center" : ""} justify-center mt-10 h-screen pb-20`}>
        <main className="flex items-end flex-col gap-8 row-start-2 items-center w-full sm:w-128">
          {response && (
              <div className="flex items-start">
                <Image
                  src="/storm-ai.png" // path to the image in the public folder
                  alt="Storm AI logo"
                  width={25} // Adjust the width
                  height={25} // Adjust the height
                  className="mr-2"
                />
                <p className="text-white">:&nbsp;&nbsp;</p> 
                <TypeAnimation
                  sequence={[
                    response, 
                  ]}
                  cursor={true}
                  repeat={1}
                  speed={80}
                  className="text-white leading-relaxed whitespace-pre-line font-bold"
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
                    "How can I help?", 
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
            }}
            className="w-full"
          >
            <div className="flex justify-center items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update query as user types
                placeholder="Ask me anything?"
                className={`${(query && !loading) && "hover:border-sky-400"}bg-white rounded-lg p-3 border-2 border-black w-2/3 sm:w-96 `}
                disabled={!!response || loading}
              />
              {!response ?
                <button type="submit" onClick={() => getResponse()} disabled={!query || !!response || loading} className={`${(query && !loading) && "hover:bg-sky-400"} bg-gray-500 ml-2 p-3 text-white h-full rounded-lg border-black border-2`} >
                  Ask
                </button>
              :
                <button onClick={() => {
                  setResponse("") 
                  setQuery("")
                }} className="hover:bg-sky-400 bg-gray-500 ml-2 p-3 text-white h-full rounded-lg border-black border-2">
                  New
                </button>
              }
            </div>
          </form>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
