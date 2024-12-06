import { NextRequest, NextResponse } from "next/server" 

export async function POST(res: NextRequest) {
  const data = await res.json()
  
  return NextResponse.json({ data })
}