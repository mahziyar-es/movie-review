'use client'

import React, { useEffect, useRef, useState } from "react";
import Review from "./ReviewListItem";
import { customFetch } from "@/utils/helpers";


export default function ReviewsList() {

    const [reviews, setReviews] = useState<{
        id: number,
        title: string,
        seo_title: string,
        thumbnail: string,
    }[]>([])
    const prevReviewsCount = useRef<number>()

    useEffect(()=>{
        fetchReviews()
    },[])

    
    const fetchReviews = async ()=>{
        prevReviewsCount.current = reviews.length
        const [res, data] = await customFetch(`review?count=${reviews.length}`,'GET')
        if(res.ok){
            setReviews(prevReviews => [...prevReviews, ...data.items])
        }
    }

    const scrollHandler = (e:React.UIEvent)=>{
        const el = e.target as HTMLDivElement
        const fromBot = el.scrollHeight - el.scrollTop - el.clientHeight
        if(fromBot < 20 && reviews.length != prevReviewsCount.current) fetchReviews()
    }


    return (
        <div className="flex flex-wrap h-full overflow-auto" onScroll={scrollHandler}>
            {reviews.map(review=>(
                <Review review={review} key={review.id} />
            ))}
        </div>
    )
}
