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
  const supabaseUrl: string = process.env.SUPABASE_URL!;
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

  // Perform post cosine search 
  const { data: posts } = await supabaseClient.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.80, // Choose an appropriate threshold for your data
    match_count: 10, // Choose the number of matches
  })

  // Get the Combined Title and Body of each returned post
  const contextText = ""

  // Create the necessary prompt we need to get the RAG response
  const prompt = `
    You are a very enthusiastic Supabase representative who loves
    to help people! Given the following sections from the Supabase
    documentation, answer the question using only that information,
    outputted in markdown format. If you are unsure and the answer
    is not explicitly written in the documentation, say
    "Sorry, I don't know how to help with that."

    Context sections:
    ${contextText}

    Question: """
    ${query}
    """

    Answer as markdown (including related code snippets if available):
  `

  // Get the response from the model
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini",
  });

  const result = chatCompletion.choices[0].message.content

  return NextResponse.json(result)
}