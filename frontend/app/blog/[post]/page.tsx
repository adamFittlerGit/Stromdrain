'use client';
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';
import Textarea from '@mui/joy/Textarea';
import { checkAuth } from '@/utils/services/auth';

type post = {
  title: string;
  body: string;
  tag: string;
  date: string;  
  image_urls: string[];
};

async function fetchPost(post_id: string) {
  const response = await fetch("/api/post", {
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

const isVideo = (url: any) => {
  const videoExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mov'];
  const extension = url.split('.').pop();
  return videoExtensions.includes(extension);
};



const Post = () => {
  const params = useParams();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [post, setPost] = useState<post>();
  const [summary, setSummary] = useState("Loading");
  const [showSummary, setShowSummary] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [title , setTitle] = useState("")
  const [body, setBody] = useState("")


  // Delete post function, api not implemented yet will do in the future. 
  const deletePost = async () => {
    const id = params.post // get the post id from the url
    if (typeof id === 'string') {
      const response = await fetch("/api/post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        // Redirect to the blog page, use next navigation here
        router.push("/blog");
      }
    }
  }

  const updatePost = async () => {
    console.log("updating post")
    const id = params.post // get the post id from the url
    if (typeof id === 'string') {
      const response = await fetch("/api/post", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, title, body })
      });
    }
  }

  const getData = async() => {
    const post = params.post
    if (typeof post === 'string') {
      const post_data = await fetchPost(post)
      setSummary(post_data.summary)
      setPost(post_data)
      setTitle(post_data.title)
      setBody(post_data.body)
      console.log(post_data)
    }
    setIsMounted(true);
  }

  useEffect(() => {
    const setup = async() => {
      setAuthChecked(false)
      const loggedIn = await checkAuth()
      setAuthChecked(true)
      setLoggedIn(loggedIn)
      getData()
    }
    setup()
  }, []);

  return (
    <div className="flex justify-center text-black">
      {isMounted && params?.post ? (// create a post type to remove typescript error
        <div className="grid p-4 my-4 bg-white border-2 border-black rounded  w-3/4 sm:w-128 ">
          <div className="flex justify-start absolute z-50 opacity-50">
            <button className={`border-2 border-black rounded-full p-1 bg-gray-300 ${!showSummary ? "hover:bg-sky-400": ""}`}>
              <Image
                src={`/${showSummary ? post?.tag : "storm-ai"}.png`}
                alt="Logo"
                width={20}
                height={20}
                onClick={() => {setShowSummary(!showSummary)}}
              />
            </button>
          </div>
          <div className="px-6 text-black">
            {editMode ? (
              <div className="flex justify-center items-center">
                <input
                  value={title}
                  onChange={(event) => setTitle(event.currentTarget.value)}
                  className="w-3/4  text-3xl font-bold text-center text-gray-500 border-gray-300 border-2 rounded p-1"
                />
              </div>
            ) : (
              <h1 className="text-3xl font-bold text-center text-black">{title}</h1>
            )}
            <p className="text-xl italic text-center text-black">{post?.date}</p>
            <br></br>
            <div className="text-black flex items-center justify-center my-2">
              {!(!!post?.image_urls[0] && isVideo(post?.image_urls[0])) ? (
              <Image
                  src={`${showSummary ? "/storm-ai.png" : (post?.image_urls[0] || `/${post?.tag}.png`)}`}
                  alt="Me Logo"
                  width={200}
                  height={200}
              />
              ) : (
                <video width="320" height="240" controls muted autoPlay loop>
                  <source src={post?.image_urls[0]} />
                  Your browser does not support the video tag.
                </video>
              )}

            </div>
            <br></br>
            {loggedIn && !showSummary && (
              <div className="justify-center mb-5 text-black">
                <button
                  className="border-2 p-1 border-black rounded bg-lime-200 hover:bg-lime-400 mr-2"
                  onClick={!editMode ? () => setEditMode(!editMode): () => {
                    setEditMode(!editMode)
                    updatePost()
                  }}
                >
                  {editMode ? "+ Save" : " + Update"}
                </button>
                {editMode && (
                  <button 
                    className="border-2 border-black rounded p-1 bg-red-200 hover:bg-red-400"
                    onClick={() => deletePost()}>
                    x Delete
                  </button>
                )}
              </div>
            )}

            {showSummary ? (
              <div className="mb-2 text-black text-blue-500 font-bold">
                <TypeAnimation 
                    sequence={[
                      summary
                    ]}
                    cursor={true}
                    repeat={1}
                    speed={80}
                />
              </div>
            ) : (
              <div className="flex mb-2">
                {editMode ? (
                  <Textarea
                    onChange={(event) => setBody(event.currentTarget.value)}
                    value={body}
                    className="text-black text-lg leading-relaxed whitespace-pre-line p-4 w-full"
                  > 
                  </Textarea>
                ) : (
                  <p className="text-black text-lg leading-relaxed whitespace-pre-line border-2 border-black rounded-lg p-4">{body}</p>
                )}

              </div>
            )}
            
            <br></br>
            <Link href="/blog">
              <Image
                src="/back.png"
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
