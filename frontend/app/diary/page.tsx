'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  useEffect(() => {
    const getData = async () => {
      const posts = await fetchPosts(tagType);
      setPosts(posts)
    }
    getData()
    setIsMounted(true)

  }, [tagType])
  
  
  if (!isMounted) return <div>loading...</div>

  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <h1 className="text-5xl font-bold p-4 pt-6 text-center">STORM'S DIARY</h1>
        <p className="font-bold px-4 text-lg hidden">Welcome to my blog! Here, I’ll share a collection of my thoughts, lessons learned, and progress on various projects, university work, and personal interests. You’ll also find code snippets worth remembering, as well as posts about martial arts, fitness, and other topics that I am passionate about!</p>
        <div className="flex justify-center text-center">
          <select className="mx-1 rounded p-1 text-center text-black" id="tags" name="tags" onChange={(e) => {
            setTagType(e.target.value)
          }}>
            <option className="text-center text-black" value="all">All Tags</option>
            <option className="text-center text-black" value="university">University</option>
            <option className="text-center text-black" value="software-engineering">Software Engineering</option>
            <option className="text-center text-black" value="project-progress">Project Progress</option>
            <option className="text-center text-black" value="fitness">Fitness</option>
            <option className="text-center text-black" value="martial-arts">Martial Arts</option>
            <option className="text-center text-black" value="general-learning">General</option>
            <option className="text-center text-black" value="thoughts">Thoughts</option>
          </select>
        </div>
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {posts.map((postProps: any, index: any) => (
            <div key={index} className="col-span-1 p-4 m-4 bg-white rounded">
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
          ))}
        </div>
      </div>
    </div>
  );
}
