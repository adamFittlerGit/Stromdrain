'use client';
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Image from "next/image";

type post = {
  title: string;
  body: string;
  tag: string;
  date: string;  
};

async function fetchPost(post_id: string) {
  const response = await fetch("/api/getPost", {
    method: "POST",
    headers: {
      Accept: "application/json"
    }, 
    body: JSON.stringify({ //dont forget the JSON.stringify part as we are passing a string not na object for the body
      post_id
  })
  });

  // Handle error
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  // Parse the JSON data from the response
  console.log(response)
  const data = await response.json();
  console.log(`data: ${data}`)
  return data[0];
}


const Post = () => {
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [post, setPost] = useState<post>();

  useEffect(() => {
    const getData = async() => {
      const post = params.post
      if (typeof post === 'string') {
        const post_data = await fetchPost(post)
        setPost(post_data)
      }
    }

    getData();
    setIsMounted(true);
  
  }, []);

  return (
    <div className="flex justify-center">
      {isMounted && params?.post ? (// create a post type to remove typescript error
        <div className="grid p-4 m-4 bg-gray-300 rounded w-3/4 r">
            <div className="flex justify-center">
              <Image
                  className="m-2"
                  src={`/${post?.tag}.png`} 
                  width={200}
                  height={200}
                  alt="Post Image"
                />
            </div>
            <h1 className="text-3xl font-bold text-center text-black">{post?.title}</h1>
            <p className="text-xl italic text-center text-black">{post?.date}</p>
            <br></br>
            {post?.body.split('\n').map((line, index) => (
              <>
                <p key={index} className="text-black">{line}</p>
                <br/>
              </>
            ))}
            
        </div>
         // returns an array so need to ensure the useState is set to an empty array to get the typing or typescript will have a hissy fit
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Post;
