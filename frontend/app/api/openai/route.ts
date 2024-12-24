import { NextResponse, NextRequest } from 'next/server';
import { supabaseClient } from '@/supabase/client';
import * as dotenv from 'dotenv';
import {OpenAI } from "openai";

export async function POST(request: NextRequest) {
  const { query } = await request.json()

  // OpenAI recommends replacing newlines with spaces for best results
  const input = query.replace(/\n/g, ' ')

  // Create clients
  dotenv.config();

  // Get the Openai api key
  const OPENAI_KEY: string = process.env.OPENAI_KEY!;

  // Create OPENAI Client wrapper
  const openai = new OpenAI({
    apiKey: OPENAI_KEY,
  });

  // Get query embedding
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: input,
  });

  const embedding = response.data[0].embedding;

  // Perform post cosine search, CURRENTLY NOT WORKING
  const { data } = await supabaseClient.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.3, // Choose an appropriate threshold for your data
    match_count: 10, // Choose the number of matches
  })

  // Get the Combined Title and Body of each returned post
  let posts = ``
  console.log(data)

  data.map((post: any) => {
    const combined = `title:  ${post.title}; tag: ${post.tag}; body: ${post.body};  `.replace(/\n/g, ' ');
    posts += combined 
  })

  // Create the necessary prompt we need to get the RAG response
  const prompt = `
    You are an enthusiastic assistant designed to help people by providing the best possible answers using the content from Adam's blog. Your task is to assist the user in answering their question by referencing the most relevant blog posts. Some posts might not be as relevant, so make sure to focus on the content that directly answers the query.

    Context sections (relevant posts are presented first, followed by any additional posts that might help):

    ${posts}

    Now, based on the given query, respond thoughtfully using the posts as your main context. If any of the posts don't seem directly related to the query, try to filter them out or only use them if needed for extra context.

    Question: """ ${query} """

    Return the answer in plain text with no markdown please, use /n in the response to add new line breaks where necessary to improve readability
  `

  // Get the response from the model
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini",
  });

  const result = chatCompletion.choices[0].message.content
  console.log(result)
  // I want to also return the posts to be linked too in the text output or something like that so they can be accessed easily
  return NextResponse.json(result)
}