'use client'

import { customFetch } from "@/utils/helpers"
import Link from "next/link"
import { useEffect, useState } from "react"
import PageTemplate from "./components/PageTemplate"


export default function Home() {

    const [reviewsCount, setReviewsCount] = useState(0)

    useEffect(()=>{
        fetchData()
    },[])


    const fetchData = async ()=>{
        const[res, data] = await customFetch('dashboard', 'GET')
        if(res.ok){
            setReviewsCount(data.reviews_count)
        }
    }



    return (
        <PageTemplate title="Dashboard">
            <div className="w-full lg:w-1/4 md:w-1/3 p-2">
                <div className="bg-lime-400 text-white text-center p-2 rounded-2 shadow-md">
                    <p className="text-[20px]">Reviews</p>
                    <div>
                        <span className="text-[40px]"> {reviewsCount} </span>
                    </div>
                    <Link href="/reviews" className="text-gray-800">Go to reviews</Link>
                </div>
            </div>
        </PageTemplate>
    )
}
