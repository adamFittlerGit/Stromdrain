'use client';
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';

const Post = () => {
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      {isMounted && params?.post ? (
        <div>Post: {params.post}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Post;
