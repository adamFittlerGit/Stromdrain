'use client';
// Importing Libraries
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import 'react-loading-skeleton/dist/skeleton.css';
import Tilt from 'react-parallax-tilt';

// Fetching the backend logic for the posts
async function fetchPosts(tagType: any, start: any, end: any) {
  const response = await fetch("/api/getAllPosts", {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: JSON.stringify({ tagType, start, end })
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  return data;
}

export default function Home() {
  // Constant Variables
  const postsPerPage = 10; // Number of posts per page
  const skeletons = []; // Array to hold our skeleton componenets
  const startIdx = 0

  // State Variables
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication State
  const [posts, setPosts] = useState([]); // Array to hold our blog posts
  const [tagType, setTagType] = useState("software-engineering"); // Current Tags to show
  const [page, setPage] = useState(1); // Current page state
  const [query, setQuery] = useState(""); // Used for search query
  const [endIdx, setEndIdx] = useState(postsPerPage-1)
  const [range, setRange] = useState({start: startIdx, end: endIdx}) // Current range of posts for pagination
  const [loading, setLoading] = useState(true) // Current page state
  const [authChecked, setAuthChecked] = useState(false)

  // Creation of skeletons
  for (let i = 0; i < 10; i++) {
    skeletons.push(
      <div key={i} className="flex justify-center col-span-1 p-4 m-4 bg-gray-600 rounded h-[200px] opacity-80">
        <div className="bg-gray-500 w-3/4 h-[90px] my-2 opacity-50"></div>
      </div>
    );
  }

  // Getting the data from the backend
  const getData = async (start: number, end: number, tagType: string) => {
    // Set page to loading state
    setLoading(true)
    // Retrieve Posts Asynchronously
    const allPosts = await fetchPosts(tagType, start, end);
    // Update Page State 
    setPosts(allPosts); 
    // Set to not loading
    setLoading(false)
  };

  // Check if the user is authenticated
  const checkAuth = async () => {
    setAuthChecked(false)
    // Check with backend if the cookie payload is valid
    const res = await fetch("/api/checkAuth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    // Check the response
    const data = await res.json();
    // Set logged in status based on response 
    setAuthChecked(true)
    return data.loggedIn

  };

  // Used for initial Setup on first render
  useEffect(() => {
    const setup = async () => {
      // Check if logged in 
      const loggedIn = await checkAuth();
      // Get different amount of data on first page if logged in or not 
      let newEndIdx
      loggedIn ? newEndIdx = postsPerPage - 2 : newEndIdx = endIdx
      loggedIn ? setTagType("all") : setTagType("software-engineering")
      getData(startIdx, newEndIdx, tagType)
      // Set the use state variables
      setIsLoggedIn(loggedIn)
      setRange({start: range.start, end: newEndIdx})
      setEndIdx(newEndIdx)
    } 

    setup()
  }, []);

  // Changing the tag type on update
  const handleTagChange = async (tag: any) => {
    // Retrieve new tag data for 1st page
    await getData(startIdx, endIdx, tag);
    //Update State variables 
    setTagType(tag);
    setPage(1);
    setRange({
      start: startIdx, 
      end: endIdx
    })
  }

  // Update data for next page
  const handleNextPage = async () => {
    // Calculate new range
    const newStart = range.end + 1
    const newEnd = range.end + postsPerPage
    setPage((page) => page + 1)
    // Retrieve data in new range
    await getData(newStart, newEnd, tagType)
    // Set variable for new range and page
    setRange({
      start: newStart,
      end: newEnd
    })
  };

  // Update data for previous page
  const handlePrevPage = async () => {
    // Calculate new range
    const newStart = Math.max(0, range.start - postsPerPage)
    const newEnd = range.start - 1
    setPage((page) => page - 1)
    // Get data in new range
    await getData(newStart, newEnd, tagType)
    // Update range and page states
    setRange({
      start: newStart,
      end: newEnd
    })
  };

  // UI Components  
  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">MY BLOG</h1>
        {/* New Post Section and AI RAG Search Bar*/}
        {isLoggedIn && 
        <>
          <div className=" hidden flex justify-center items-center my-4">
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
        </>
        }

        {/* Currently hidden tag selector*/}
        
        <div className="flex justify-center text-center">
          {authChecked ? 
            <select className="mx-1 rounded p-1 text-center text-black" id="tags" name="tags" disabled={loading} onChange={(e) => {
              handleTagChange(e.target.value)
            }}>
              {isLoggedIn &&
                <option className="text-center text-black" value="all">All Tags</option>
              }
              <option className="text-center text-black" value="software-engineering">Engineering</option>
              <option className="text-center text-black" value="university">University</option>
              <option className="text-center text-black" value="project-progress">Project Progress</option>
              <option className="text-center text-black" value="fitness" hidden={!isLoggedIn}>Fitness</option>
              <option className="text-center text-black" value="martial-arts" hidden={!isLoggedIn}>Martial Arts</option>
              <option className="text-center text-black" value="general-learning">General Learning</option>
              <option className="text-center text-black" value="thoughts">Thoughts</option>
            </select>
          : 
            <div className="flex justify-center items-center p-2 bg-gray-600 rounded h-[20px] opacity-80 w-[150px]">
              <div className="bg-gray-500 w-full h-[10px] opacity-50 rounded"></div>
            </div>
        }
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={range.end < 10 || loading}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white">Page {page}</span>
          <button
            onClick={handleNextPage}
            disabled={(isLoggedIn && page === 1) ? posts.length < 9 || loading : posts.length < 10 || loading}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Section for the blog posts */}
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {isLoggedIn && page === 1 &&
            <Tilt>
              <div className="col-span-1 p-4 m-4 bg-white rounded-lg hover:border-sky-400 border-2 border-black h-5/6">
                <Link href={`/blog/new`}>
                  <div className="flex justify-center">
                    <Image
                      className="p-2"
                      src={`/write.png`}
                      width={100}
                      height={100}
                      alt="Post Image"
                    />
                  </div>
                  <h1 className="text-lg font-bold text-center text-black">New Post</h1>
                </Link>
              </div>
            </Tilt>
          }
          {!loading  
            ? posts.map((postProps:any, index) => (
                <Tilt key={index}>
                  <div className="col-span-1 p-4 m-4 bg-white rounded-lg hover:border-sky-400 border-2 border-black h-5/6">
                    <Link href={`/blog/${postProps.post_id}`}>
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
                    </Link>
                  </div>
                </Tilt>
              ))
            : (page === 1 && isLoggedIn) ? skeletons.slice(0, -1) : skeletons}
        </div>
      </div>
    </div>
  );
}
