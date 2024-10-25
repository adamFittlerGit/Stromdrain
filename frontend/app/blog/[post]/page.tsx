'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use this to access the dynamic slug
import { supabaseClient } from '@/supabase/client'; // Adjust the import based on your setup
import Image from 'next/image';

const PostPage = () => {
  const { post_id } = useParams(); // Get the dynamic post_id from the route url
  const [post, setPost] = useState();

  // Fetch post data by slug
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabaseClient
        .from('posts')
        .select('*')
        .eq('post_id', post_id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
    };

    if (post_id) {
      fetchPost();
    }
  }, [post_id]);

  if (!post) {
    return <div>Loading...</div>; // Add loading state
  }

  return (
    <div className="col-span-1 p-4 m-4 bg-white rounded">
      <Image
        className=" w-full h-auto"
        src={
            post.image_urls && 
            post.image_urls.length > 0 && 
            post.image_urls[0] 
            ? post.image_urls[0] 
            : "/storm.png"
        } 
        width={300}
        height={300}
        alt="Post Image"
      />
      <h1 className="text-lg font-bold">{post.title}</h1>
      <p className="text-base italic">{post.date}</p>
      <p className="">[{post.tag}]</p>
      <p className="text-sm">{post.body}</p>
    </div>
  );
};

export default PostPage;
