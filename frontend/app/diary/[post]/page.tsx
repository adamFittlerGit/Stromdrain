'use client';
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";

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

      setIsMounted(true);
    }

    getData();  
  
  }, []);

  return (
    <div className="flex justify-center">
      {isMounted && params?.post ? (// create a post type to remove typescript error
        <div className="grid p-4 m-4 bg-white border-2 border-black hover:border-sky-400  rounded  w-3/4 sm:w-128 ">
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
            <Link href="/diary">
              <Image
                src="/back-button.png"
                alt="back-button"
                width={30}
                height={30}
              />
            </Link>
            
        </div> 
      ) : ( //Adding in the page skeleton here
        <div className="">
          <div className="flex justify-center p-4 m-4 bg-gray-600 rounded opacity-80  w-80 sm:w-128 h-96 sm:h-132">
            <div className="bg-gray-500 w-2/3 h-32 sm:h-48 my-2 opacity-50"></div>
          </div>    
        </div> 
      )}
    </div>
  );
};

export default Post;
