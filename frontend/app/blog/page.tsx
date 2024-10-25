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
  console.log(response)
  const data = await response.json();
  console.log(data)
  return data;
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const posts = await fetchPosts();
      setPosts(posts)
      setIsMounted(true)
    }

    getData()
  }, [])
  
  if (!isMounted) return <div>loading...</div>

  return (
    <>
      <div className="grid grid-cols-3">
        {posts.map((postProps: any, index: any) => (
          <div key={index} className="col-span-1 p-4 m-4 bg-white rounded">
            <Link href={`/blog/${postProps.post_id}`}> 
                <Image
                className=" w-full h-auto"
                src={
                    postProps.image_urls && 
                    postProps.image_urls.length > 0 && 
                    postProps.image_urls[0] 
                    ? postProps.image_urls[0] 
                    : "/storm.png"
                } 
                width={300}
                height={300}
                alt="Post Image"
                />
                <h1 className="text-lg font-bold">{postProps.title}</h1>
                <p className="text-base italic">{postProps.date}</p>
                <p className="">[{postProps.tag}]</p>
                <p className="text-sm">{postProps.body}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
