import { NextResponse, NextRequest } from 'next/server';
import { supabaseClient } from '@/supabase/client';
import * as dotenv from 'dotenv';
import { AccordionSummary } from '@mui/material';

// Load environment variables from .env file
dotenv.config();

// Now you can access your environment variables using process.env
const supabaseUrl: string = process.env.SUPABASE_URL!;

async function uploadImage(file: File) {
    const filePath = `${Date.now()}_${file.name}`;
    const { data, error } = await supabaseClient.storage.from('images').upload(filePath, file);
  
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    console.log(data)
    console.log(data.path)
    return `${supabaseUrl}/storage/v1/object/public/images/${data.path}`
  }

async function getSummary(data: string) {
    const query = {"inputs": data}
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(query),
        }
    );
    const result = await response.json();
    console.log(`result: ${result}`)
    return result;
}
  

export async function POST(request: NextRequest) {
    // Parse the JSON body from the request
    const { title: title, body: content, tag: tag, images: images, passcode: passcode} = await request.json();
    console.log(`after api: ${images[0]}`)
    if (passcode === "7135") {
        // Get specific non user inputted data
        const now = new Date();
        const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
        const user_id = "fbc72f17-b191-48a6-86ab-54ed20be6cf1"; // This should be dynamic later based on the current logged in user

        // Get short summary of input
        const summary = await getSummary(content);
        // Avoid uploading empty files array
        let image_urls = []
        if (images && images.length > 0) image_urls = await Promise.all(images.map(uploadImage)); // need to specifically check length due to javascript being a trash language with truthy etc
        // Use the supabase client to request the data
        let { data, error } = await supabaseClient
            .from('posts')
            .insert([{ title: title, date: date, body: content, tag: tag, user_id: user_id, image_urls: image_urls, summary: summary }]); // Use 'content' here

        if (error) {
            console.error("Error fetching posts:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } 

    console.error("Incorrect passcode");
    return NextResponse.json({ error: "Incorrect passcode" }, { status: 500 });

}
