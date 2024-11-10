'use client';
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';

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
  const [summary, setSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false)

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
        <div className="grid p-4 m-4 bg-white border-2 border-black rounded  w-3/4 sm:w-128 ">
          <div className="flex justify-start absolute z-50 opacity-50">
            <button className={`border-2 border-black rounded-full p-1 bg-gray-300 ${!showSummary ? "hover:bg-sky-400": ""}`}>
              <Image
                src={`/${showSummary ? post?.tag : "storm-ai"}.png`}
                alt="Logo"
                width={30}
                height={30}
                onClick={() => {setShowSummary(!showSummary)}}
              />
            </button>
          </div>
          <div className="px-12">
            <h1 className="text-3xl font-bold text-center text-black">{post?.title}</h1>
            <p className="text-xl italic text-center text-black">{post?.date}</p>
            <br></br>
            <div className="text-black flex items-center justify-center my-2">
              <Image
                  src={`/${showSummary ? "storm-ai" : post?.tag}.png`}
                  alt="Me Logo"
                  width={60}
                  height={60}
              />
            </div>
            {showSummary ? (
              <div className="mb-2 text-black">
                <TypeAnimation 
                    sequence={[
                      "Here is an example summary of the text within this post for the user to checkout if they have less time", 
                    ]}
                    cursor={true}
                    repeat={1}
                    speed={80}
                />
              </div>
            ) : (
              <div className="mb-2">
                {post?.body.split('\n').map((line, index) => (
                  <>
                    <p key={index} className="text-black">{line}</p>
                    <br/>
                  </>
                ))}
              </div>
            )}
            <Link href="/blog">
              <Image
                src="/back-button.png"
                alt="back-button"
                width={30}
                height={30}
              />
            </Link>
          </div>
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
