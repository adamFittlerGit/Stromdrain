'use client';
import React, { useState, useRef, ChangeEvent} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';

async function makePost(title: string, tag: string, body: string, images: File[]) {
  const response = await fetch("/api/post", {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
          title,
          body, // Consider renaming this to 'content' to avoid confusion
          tag,
          images, // Include image_urls,
      })
      
  });

  if (!response.ok) {
      throw new Error("Failed to fetch posts");
  }
}

const Page = () => {
  // useStates for our data
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]); // For displaying locally
  const [imageFiles, setImageFiles] = useState<File[]>([]); // For sending to the supabase storage
  const [isImageSelected, setisImageSelected] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  

  // Use router for changes pages
  const router = useRouter()

  // useRef so we can use the button istead of normal file upload ui
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true)
    e.preventDefault();

    try {
        await makePost(title, tag, content, imageFiles); // Await the makePost function
        router.push("/blog"); // Redirect only after the post has been made
    } catch (error) {
        console.error("Error making post:", error);
    }
    setSubmitting(false)
};

  // Handling the upload of mutliple files
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImageFiles = Array.from(e.target.files)
      const newImageUrls = newImageFiles.map((file) => URL.createObjectURL(file))
      
      setImageUrls([...imageUrls, ...newImageUrls])
      setImageFiles([...imageFiles, ...newImageFiles])
      setisImageSelected(true)
    }
  } 

  return (
    <div className='flex justify-center'>
      <div className='bg-white mt-5 p-5 mb-5 rounded border-2 border-black  w-3/4 sm:w-128 '>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <h2 className='text-3xl text-black'>New Post</h2>
          <input 
            hidden
            ref = {imageInputRef}
            type="file" 
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleUpload}
          />

          {/*<Button className="hidden" variant="outlined" onClick={() => {imageInputRef.current?.click()}}>{isImageSelected ? "Select Another Image" : "Select Image"}</Button> */}
          
          <div className='flex gap-4'>
            
            {imageUrls.map((url, index) => (
            
              <Image
                key={url}
                src={url}
                width={50}
                height={50}
                alt={`img-${index}`}
              />
            ))}
          </div>

          <TextField
            type="text"
            variant='outlined'
            color='primary'
            label="Post Title"
            onChange={(e) => {setTitle(e.target.value)}} // Capture title input
            fullWidth
            required
            disabled={submitting}
          />
          
          <TextField
            type="text"
            variant='outlined'
            color='primary'
            label="Tag"
            onChange={(e) => {setTag(e.target.value)}} // Capture tag input
            required
            fullWidth
            disabled={submitting}
          />
          
          <TextField
            variant='outlined'
            color='primary'
            label="Content"
            onChange={(e) => {setContent(e.target.value)}} // Capture content input
            fullWidth
            required
            multiline
            disabled={submitting}
          />

          <Button variant="contained" color="primary" type="submit" disabled={submitting}>
            Post
          </Button>
        </form>
        <br></br>
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
  );
};

export default Page;