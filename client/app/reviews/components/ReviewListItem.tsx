'use client'

import Image from "next/image";
import Link from "next/link";


export default function Review(
    {review}:
    {
        review:{
            id: number,
            title: string,
            seo_title: string,
            thumbnail: string,
        }
    }
) {
   
    return (
        <Link href={`review/${review.id}/${review.seo_title}`} 
            className="w-full lg:w-1/3 sm:w-1/2 p-2 "
        >
            <div className="w-full border border-gray-500 rounded-md hover:drop-shadow-2xl shadow-black  transition-[0.5s] relative">
                <img
                    src={review.thumbnail}
                    alt={review.title}
                    className="w-full h-full sm:h-[300px] rounded-md"
                />
                <p className="absolute bottom-[0] left-[0] bg-gray-500/70 text-white p-2 w-full">{ review.title }</p>
            </div>
        </Link>
    )
}
