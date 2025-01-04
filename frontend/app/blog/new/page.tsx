'use client';
import React, { useState, useRef, ChangeEvent} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';
import  uploadImage  from '@/services/storage';

async function makePost(title: string, tag: string, body: string, images: string[]) {
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
  const [tag, setTag] = useState('general-learning');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]); // For displaying locally
  const [imageFiles, setImageFiles] = useState<File[]>([]); // For sending to the supabase storage
  const [submitting, setSubmitting] = useState(false)
  const [isImageSelected, setIsImageSelected] = useState(false)

  

  // Use router for changes pages
  const router = useRouter()

  // useRef so we can use the button istead of normal file upload ui
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true)
    e.preventDefault();

    try {
        const imageUrls = await Promise.all(imageFiles.map(uploadImage)); // Upload images to storage
        console.log(imageFiles)
        console.log(imageUrls)
        await makePost(title, tag, content, imageUrls.filter((url): url is string => url !== null)); // Await the makePost function, ensure to filter to nulls
        router.push("/blog"); // Redirect only after the post has been made
    } catch (error) {
        console.error("Error making post:", error);
    }
    setSubmitting(false)
};

  // Handling the upload of mutliple files
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsImageSelected(true)
      const newImageFiles = Array.from(e.target.files)
      const newImageUrls = newImageFiles.map((file) => URL.createObjectURL(file))
      
      setImageUrls([...imageUrls, ...newImageUrls])
      setImageFiles([...imageFiles, ...newImageFiles])
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

          {!isImageSelected &&
              <Button className="" variant="outlined" onClick={() => {imageInputRef.current?.click()}}>Select Image</Button>
          }

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

          <select className="rounded p-1 text-center text-black border-gray-300 border-2 hover:border-black" id="tags" name="tags" onChange={(e) => {
            setTag(e.target.value)
          }}>
            <option className="text-center text-black" value="relationship">Relationship</option>
            <option className="text-center text-black" value="general-learning">General Learning</option>
            <option className="text-center text-black" value="machine-learning">Machine Learning</option>
            <option className="text-center text-black" value="frontend-learning">Frontend Learning</option>
            <option className="text-center text-black" value="backend-learning">Backend Learning</option>
            <option className="text-center text-black" value="algorithms">Algorithms</option>
            <option className="text-center text-black" value="university">University</option>
            <option className="text-center text-black" value="project-progress">Project Progress</option>
            <option className="text-center text-black" value="fitness" >Fitness</option>
            <option className="text-center text-black" value="martial-arts" >Martial Arts</option>
            <option className="text-center text-black" value="thoughts">Thoughts</option>
          </select>

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
                src="/back.png"
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
