import React from 'react'

export interface PostProps {
  heading: string;
  image: string;  // Assuming image is a URL or file path
  body: string;
}

const Thumb: React.FC<PostProps> = (props: PostProps) => {
  return (
    <>
      <h1>{props.heading}</h1>
      <img src={props.image} alt={props.heading} />
      <p>{props.body}</p>
    </>
  );
}

export default Thumb;
