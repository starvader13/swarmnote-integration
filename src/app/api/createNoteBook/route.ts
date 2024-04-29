// /api/createNoteBook

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

const arr=["https://png.pngtree.com/element_our/20190603/ourmid/pngtree-sticky-note-cartoon-illustration-image_1430615.jpg",
"https://assets-global.website-files.com/5f7ece8a7da656e8a25402bc/631f32ee984371cb97df4ce2_How%20to%20take%20notes%20from%20a%20textbook-p-800.png",
"https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm90ZSUyMHRha2luZ3xlbnwwfHwwfHx8MA%3D%3D",
"https://static-00.iconduck.com/assets.00/note-taking-illustration-2048x1707-hqbvyl4v.png"]

function randomStringFromArray(arr=[""]) {
  if (arr.length === 0) {
      return null; // If the array is empty, return null
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomStr = arr[randomIndex];
  arr.splice(randomIndex, 1); // Remove the selected string from the array
  return randomStr;
}

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("unauthorised", { status: 401 });
  }
  const body = await req.json();
  const { name } = body;
  // const image_description = await generateImagePrompt(name);
  const image_description = name;
  if (!image_description) {
    return new NextResponse("failed to generate image description", {
      status: 500,
    });
  }

  // const image_url = await generateImage(image_description);
  const image_url = randomStringFromArray(arr)
  if (!image_url) {
    return new NextResponse("failed to generate image ", {
      status: 500,
    });
  }

  const note_ids = await db
    .insert($notes)
    .values({
      name,
      userId,
      imageUrl: image_url,
    })
    .returning({
      insertedId: $notes.id,
    });

  return NextResponse.json({
    note_id: note_ids[0].insertedId,
  });
}
