'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import 'react-loading-skeleton/dist/skeleton.css';
import Tilt from 'react-parallax-tilt';

// Need use client to do this convert this back to a use client component and apply the sue effect for the data laoding at the start
async function fetchPosts(tagType: string) {
  const response = await fetch("/api/getAllPosts", {
    method: "POST",
    headers: {
      Accept: "application/json"
    }, 
    body: JSON.stringify({ //dont forget the JSON.stringify part as we are passing a string not na object for the body
      tagType
  })
    
  });

  // Handle error
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  // Parse the JSON data from the response
  const data = await response.json()
  return data;
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [posts, setPosts] = useState([])
  const [tagType, setTagType] = useState("all")
  const skeletons = [];
  const [query, setQuery] = useState("");

  // Create 20 instances of the component, cheeky way of making skeletons in react if not using map make them here.
  for (let i = 0; i < 20; i++) {
    skeletons.push(
      <div key={i} className="flex justify-center col-span-1 p-4 m-4 bg-gray-600 rounded h-[200px] opacity-80">
        <div className="bg-gray-500 w-3/4 h-[90px] my-2 opacity-50"></div>
      </div>
    );
  }

  useEffect(() => {
    const getData = async () => {
      const posts = await fetchPosts(tagType);
      setPosts(posts)
    }
    getData()
    setIsMounted(true)

  }, [tagType])
  

  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">MY DIARY</h1>
        <div className="flex justify-center hidden">
          <button>
            <Link className="flex items-center mb-4 justify-center font-bold text-white" href="/new">
                <Image
                    className="pr-1 mr-2"
                    src="/write.png"
                    width={40}
                    height={20}
                    alt="Post Image"
                />
                <p>NEW POST</p>
            </Link>
          </button>
        </div>
        <div className="hidden flex justify-center text-center">
          <select className="mx-1 rounded p-1 text-center text-black" id="tags" name="tags" onChange={(e) => {
            setTagType(e.target.value)
          }}>
            <option className="text-center text-black" value="all" selected>All Tags</option>
            <option className="text-center text-black" value="university">University</option>
            <option className="text-center text-black" value="software-engineering">Software Engineering</option>
            <option className="text-center text-black" value="project-progress">Project Progress</option>
            <option className="text-center text-black" value="fitness">Fitness</option>
            <option className="text-center text-black" value="martial-arts">Martial Arts</option>
            <option className="text-center text-black" value="general-learning">General</option>
            <option className="text-center text-black" value="thoughts">Thoughts</option>
          </select>
        </div>
        <div className="hidden flex justify-center items-center my-4">
          <Image
              src="/storm-ai.png" // path to the image in the public folder
              alt="Storm AI Logo"
              width={50} // Adjust the width
              height={50} // Adjust the height
              className="mr-4"
          />
          <p className="pr-4 text-3xl fold-bold text-black">:</p>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)  
              console.log(query)
            }} // Update query as user types
            placeholder="Search for a post!"
            className="bg-white rounded-lg p-3 border-2 border-black w-2/3 sm:w-96 hover:border-sky-400"
          />
        </div>
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <Tilt>
              <div  className="flex justify-center items-center col-span-1 p-4 m-4 bg-white rounded-lg  h-5/6">
                <Link href="/new"> 
                  <div className="flex justify-center">
                    <Image
                      className="p-2"
                      src="/write.png"
                      width={100}
                      height={100}
                      alt="Post Image"
                    />
                  </div>
                    <h1 className="text-lg font-bold text-center text-black">New Post</h1>
                </Link>
              </div>
            </Tilt>
          {isMounted ? posts.map((postProps: any, index: any) => (
            <Tilt>
              <div key={index} className="col-span-1 p-4 m-4 bg-white rounded-lg hover:border-sky-400 border-2 border-black h-5/6">
                <Link href={`/diary/${postProps.post_id}`}> 
                  <div className="flex justify-center">
                    <Image
                      className="p-2"
                      src={`/${postProps.tag}.png`}
                      width={100}
                      height={100}
                      alt="Post Image"
                    />
                  </div>
                    <h1 className="text-lg font-bold text-center text-black">{postProps.title}</h1>
                    <p className="text-base italic text-center text-black">{postProps.date}</p>
                </Link>
              </div>
            </Tilt>
          )) : skeletons }
        </div>
      </div>
    </div>
  );
}
