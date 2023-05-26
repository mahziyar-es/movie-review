'use client'
import { customFetch } from "@/utils/helpers"
import { Button, Gamon } from "gamon-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import PageTemplate from "../components/PageTemplate"



export default function Dashboard() {

    const [reviews, setReviews] = useState<{
        id: number,
        title: string,
        thumbnail: string,
    }[]>([])

    const prevReviewsCount = useRef<number>() 

    useEffect(()=>{
        fetchReviews()
    },[])



    const fetchReviews = async ()=>{
        if(reviews.length == prevReviewsCount.current) return 
        prevReviewsCount.current = reviews.length
        const [res, data] = await customFetch('review?count='+reviews.length, 'GET')
        if(res.ok) setReviews(reviews => [...reviews , ...data.items])
    }


    const scrollHandler = async (e: MouseEvent)=>{
        const el = e.target as HTMLElement
        const distToBottom = el.scrollHeight - el.scrollTop - el.clientHeight
        if(distToBottom < 10){
            fetchReviews()
        }
    }

    
    return (
        <PageTemplate title="Reviews" onScroll={scrollHandler} 
            headerChildren={
                <Link href="review/create">
                    <Button text="Create" className="bg-lime-400 text-white" />
                </Link>
            }
        >

            {
                reviews.map(review=>(
                    <Link href={'/review/'+review.id}  key={review.id} className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 p-2 ">
                        <div className="shadow-md rounded-1 p-2">
                            <img src={review.thumbnail} className="rounded-1" />
                            <p>{review.title}</p>
                        </div>
                    </Link>
                ))
            }
        </PageTemplate>
    )
}
