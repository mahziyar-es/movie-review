import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const url =`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${process.env.YOUTUBE_API_KEY}`

  const res = await fetch(url,{
      method: 'GET',
  })

  const data = await res.json()
  
  const item = data.items[0]


  return NextResponse.json({
    likes: item.statistics.likeCount,
    views: item.statistics.viewCount,
    comments: item.statistics.commentCount,
  });
}
