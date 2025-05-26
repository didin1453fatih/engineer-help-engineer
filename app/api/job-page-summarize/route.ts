import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import axios from 'axios';
import {
  GoogleGenAI,
} from '@google/genai';




export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const url = requestUrl.searchParams.get("url");;

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
  }

  if (!process.env.PUPPETER_SERVICE_URL) {
    return NextResponse.json({ error: "PUPPETER_SERVICE_URL is not set" }, { status: 500 });
  }
  // Create a Supabase client
  const supabase = await createClient();
  // Get the user's session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // If the user is not authenticated, redirect to the sign-in page
  if (!session) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 },
    );
  }

  const { data: jobPageSummarizeCache, error } = await supabase.from("job_page_summarize_cache").select("*").eq("url", url).single()

  if (jobPageSummarizeCache) {
    return NextResponse.json({ data: jobPageSummarizeCache.llm_response }, { status: 200 });
  }
  var pageText = await axios.get(process.env.PUPPETER_SERVICE_URL, {
    params: {
      url: url,
    },
  })


  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 });
  }
  if (!process.env.GEMINI_API_URL) {
    return NextResponse.json({ error: "GEMINI_API_URL is not set" }, { status: 500 });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const llmInstuction = `
                  Generate summarize of this job posting to plain json without any other text.
                  The json should contain the following fields:
                  {
                  title:string,
                  company_name: string,
                  skills:string[],
                  locations:string[],
                  salary_min:number
                  salary_max:number
                  currency:string
                  salary_cycle:string
                  company_description: short description of this company, maximum 25 words.
                  job_description: get full job description from the page and formating using markdown format.
                  }
          `


  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: llmInstuction,
        }
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: pageText.data,
        }
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  if (!response.text || response.text.length < 10) {
    return NextResponse.json({ error: "No response from the model" }, { status: 500 });
  }


  let parsedResponse = null
  try {
    parsedResponse = parseNestedJsonResponse(response.text);
  } catch (error) {
    return NextResponse.json({ error: "Failed to parse the response" }, { status: 500 });
  }


  await supabase.from("job_page_summarize_cache").insert({
    url: url,
    llm_response: parsedResponse
  })

  return NextResponse.json({ data: parsedResponse }, { status: 200 });
}


function parseNestedJsonResponse(response: string) {
  try {
    const match = response.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  } catch (e) {
    console.error("Parsing failed:", e);
    throw new Error("Failed to parse nested JSON response");
  }
}
