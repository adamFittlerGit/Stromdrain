import { NextResponse } from 'next/server';
import { supabaseClient } from '@/supabase/client';
import { NextRequest } from 'next/server';
import * as dotenv from 'dotenv';
import {OpenAI } from "openai";


// Load environment variables from .env file
dotenv.config();

// Now you can access your environment variables using process.env
const supabaseUrl: string = process.env.SUPABASE_URL!;
const OPENAI_KEY: string = process.env.OPENAI_KEY!;

// Upload the file to blob storage and return the url
async function uploadImage(file: File) {
    const filePath = `${Date.now()}_${file.name}`;
    const { data, error } = await supabaseClient.storage.from('images').upload(filePath, file);
  
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    return `${supabaseUrl}/storage/v1/object/public/images/${data.path}`
  }

// Get the summary from GPT 4 mini model
async function getSummary(combined: string) {

  const openai = new OpenAI({
    apiKey: OPENAI_KEY,
  });

  const prompt = `{Please provide a TLDR summary of the following content in one sentence: ${combined} The summary should capture the main points and give an overview of the key activities or plans mentioned.  The authors name is Adam for your references if needed}`
  
  const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
  });

  const result = chatCompletion.choices[0].message.content

  return result
}

// Get the embedding using text-embedding-3
async function getEmbedding(combined: string) {

  const openai = new OpenAI({
    apiKey: OPENAI_KEY,
  });

  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: combined,
  });

  const embedding = response.data[0].embedding;
  console.log(embedding)

  return embedding 
}


// Inserting a new post, change to rpc later 
export async function PUT(request: NextRequest) {
    // Parse the JSON body from the request
    const { title: title, body: content, tag: tag, images: images} = await request.json();
    // Get specific non user inputted data
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const user_id = "fbc72f17-b191-48a6-86ab-54ed20be6cf1"; // This should be dynamic later based on the current logged in user

    // Avoid uploading empty files array
    let image_urls = []
    if (images && images.length > 0) image_urls = await Promise.all(images.map(uploadImage)); // need to specifically check length due to javascript being a trash language with truthy etc
    
    // Use Openai Models to get the post embedding and summary make sure to apply same process as the other python scripting and cleaning
    const combined = `title:  ${title}; body: ${content};`.replace(/\n/g, ' '); // remove the \n for better responses
    const summary = await getSummary(combined);
    const embedding = await getEmbedding(combined);

    // Use the supabase client to insert the data
    let { data, error } = await supabaseClient
        .from('posts')
        .insert([{ title: title, date: date, body: content, tag: tag, user_id: user_id, image_urls: image_urls, summary: summary, embedding: embedding}]); // Use 'content' here

    if (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
    
}

// Retrieving a single exisitng post, upgrade to rpc call
export async function GET(request: NextRequest) {
    const {post_id: post_id} = await request.json();
    // Use the supabase client to request the data
    let { data, error } = await supabaseClient
        .from('posts')
        .select("post_id, date, title, body, tag, image_urls, summary")
        .eq("post_id", post_id)
    // Handle the error if the request fails 
    if (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Return the posts data as JSON response, we use next response ot package the data into the http request sent to the client otherwise we would have to do that ourselves
    return NextResponse.json(data);
}

// Updating an existing post
export async function UPDATE(res: NextRequest) {
    const {id, title, body} = await res.json()
    console.log(id, title, body)

    try {
        const { data, error } = await supabaseClient.rpc('update_post', {
            update_id: id,
            new_title: title, 
            new_body: body, 
        })
        console.log(error)
        console.log(data)

        return NextResponse.json({ status: 'updated successfully'})

    } catch (error) {
            return NextResponse.json({ status: 'Update failed'})
    }
}

// Deleting an existing post
export async function DELETE(res: NextRequest) {
    const {id} = await res.json()

    try {
        const { data, error } = await supabaseClient.rpc('delete_post', {
            delete_id: id
        })
        console.log(error)
        console.log(data)

        return NextResponse.json({ status: 'deleted successfully'})

    } catch (error) {
            return NextResponse.json({ status: 'Deletion failed'})
    }
}
