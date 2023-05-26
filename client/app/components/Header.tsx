'use client'

import { InputBasic, Loading, Sheet } from "gamon-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import IconSearch from '@/public/icon-search.svg'
import { customFetch } from "@/utils/helpers";
import Review from "../reviews/components/ReviewListItem";
import { createPortal } from "react-dom";


export default function RootLayoutHeader({
}: {
}) {

    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [reviews, setReviews] = useState<{
        id: number,
        title: string,
        seo_title: string,
        thumbnail: string,
    }[]>([])
    const [docBody, setDocBody] = useState<HTMLElement>()


    useEffect(()=>{
        setDocBody(document.body)
    },[])

    useEffect(()=>{
        setReviews([])
        if(searchQuery.length > 3)
        fetchReviews()
    },[searchQuery])

    
    const fetchReviews = async ()=>{
        setLoading(true)
        const [res, data] = await customFetch(`review?query=${searchQuery}`,'GET')
        setLoading(false)
        if(res.ok){
            setReviews(data.items)
        }
    }


    return (
        <div className="w-full border-bot bg-gray-500/30 shadow-2xl p-4  flex items-center justify-between">
            <div>
                <Link className="text-white ms-3 hover:text-lime-400 transition-[0.2s]" href="/">Home</Link>
                <Link className="text-white ms-3 hover:text-lime-400 transition-[0.2s]" href="/reviews">Reviews list</Link>
            </div>

            <img gamon-sheet-toggle="searchSheet" src={IconSearch.src} className="w-[25px] h-[25px]  sm:h-[30px] sm:w-[30px] cursor-pointer" />

            {docBody && createPortal(
                <Sheet id="searchSheet" title="Search" >
                    <InputBasic model={[searchQuery, setSearchQuery]} placeholder="Search among reviews..." />
                    { loading && 
                        <div className="flex justify-center mt-5">
                            <Loading type="dual-ring" />
                        </div> 
                    }
                    { searchQuery.length > 3 && reviews.length == 0 &&
                        <div className="p-2 rounded-md text-center mt-5"> Found nothing!  </div>
                    }
                    {reviews.map(review=>(
                        <Review review={review} key={review.id} />
                    ))}
                </Sheet>
                ,
                docBody!
            )}
            
        </div>
    )
}
