'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Need use client to do this convert this back to a use client component and apply the sue effect for the data laoding at the start
async function fetchPosts() {
  const response = await fetch("/api/getAllPosts", {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
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

  useEffect(() => {
    const getData = async () => {
      const posts = await fetchPosts();
      setPosts(posts)
    }
    getData()
    setIsMounted(true)
  }, [])
  
  if (!isMounted) return <div>loading...</div>

  return (
    <>
      <div className="w-3/4 justify-self-center">
        <h1 className="text-5xl font-bold p-4 pt-6 text-center">MY BLOG</h1>
        <p className="font-bold px-4 text-lg hidden">Welcome to my blog! Here, I’ll share a collection of my thoughts, lessons learned, and progress on various projects, university work, and personal interests. You’ll also find code snippets worth remembering, as well as posts about martial arts, fitness, and other topics that I am passionate about!</p>
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {posts.map((postProps: any, index: any) => (
            <div key={index} className="col-span-1 p-4 m-4 bg-white rounded">
              <Link href={`/blog/${postProps.post_id}`}> 
                  <Image
                    className="justify-self-center p-2"
                    src={`/${postProps.tag}.png`}
                    width={100}
                    height={100}
                    alt="Post Image"
                  />
                  <h1 className="text-lg font-bold text-center">{postProps.title}</h1>
                  <p className="text-base italic text-center">{postProps.date}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
