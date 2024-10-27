'use client';
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Image from "next/image";

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
  const [post, setPost] = useState([]);

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
    <div>
      {isMounted && params?.post ? (// create a post type to remove typescript error
        <div className="grid p-4 m-4 bg-white rounded w-3/4 justify-self-center">
          <Image
              className="justify-self-center m-2"
              src={`/${post.tag}.png`} 
              width={200}
              height={200}
              alt="Post Image"
            />
            <h1 className="text-3xl font-bold text-center">{post.title}</h1>
            <p className="text-xl italic text-center">{post.date}</p>
            <br></br>
            <p className="text-justify text-lg">{post.body}</p>
        </div>
         // returns an array so need to ensure the useState is set to an empty array to get the typing or typescript will have a hissy fit
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Post;
