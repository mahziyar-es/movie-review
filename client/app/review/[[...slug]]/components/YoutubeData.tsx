'use client'
import { useEffect, useState } from 'react'
import IconView from '@/public/icon-view.png'
import IconLike from '@/public/icon-like.png'
import IconComment from '@/public/icon-comment.png'
import { formatNumber } from '@/utils/helpers'

export default function YoutubeData({videoId}:{videoId:string}) {

    const [data, setData] = useState({
        likes: 0,
        views: 0,
        comments: 0,
    })

    useEffect(()=>{
        fetchData()
    },[])


    const fetchData = async ()=>{
        const data = await fetch('/api/youtube?id='+videoId)
        const data1 = await data.json()
        setData(data1)
    }

    return (
        <div className="flex justify-between mt-3 text-gray-300 text-[13px] md:text-[15px]">
            <div className='flex justify-center items-center'> <img className='w-[20px] h-[20px] me-2' src={IconLike.src} /> {formatNumber(data.likes)} </div>
            <div className='flex justify-center items-center'> <img className='w-[20px] h-[20px] me-2' src={IconView.src} />  {formatNumber(data.views)}</div>
            <div className='flex justify-center items-center'> <img className='w-[20px] h-[20px] me-2' src={IconComment.src} /> {formatNumber(data.comments)}</div>
        </div>
    )
}
