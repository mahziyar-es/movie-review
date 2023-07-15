'use client'

import { useEffect, useRef, useState } from "react"
import {Carousel} from 'gamon-react'
import { customFetch } from "@/utils/helpers"
import Link from "next/link"

const Slider = (
) => {

    const [slides, setSlides] = useState<{
        id: number,
        title: string,
        background_image: string,
        thumbnail: string,
    }[]>()
    const [sliderImages, setSliderImages] = useState<JSX.Element[]>([])
    const [visibleSliderReview, setVisibleSliderReview] = useState(0) 
    const [changingBackgroundImage, setChangingBackgroundImage] = useState(false) 
    const backgroundImageEl = useRef<HTMLDivElement>(null) 

    
    useEffect(()=>{
        fetchData()
    },[])

    
    useEffect(()=>{
        if(!slides || slides?.length == 0 ) return 

        let images = []
        images = slides.map(review => (
            <Link href={'/review/'+review.id}  key={review.id} className="min-w-full min-h-full">
                <img
                    src={review.thumbnail}
                    alt={review.title}
                    className='rounded-md shadow-2xl shadow-black w-full h-[230px] md:h-[300px] lg:h-[500px]'
                />
            </Link>
        ))
        setSliderImages(images)
        setBackgroundImage()
    },[slides])


    const fetchData = async ()=>{
        const [res, data] = await customFetch('index','GET')
        if(res.ok){
            setSlides(data.new_reviews)
        }
    }

    
    useEffect(() => {
        setChangingBackgroundImage(true)
        setTimeout(() => {
            setBackgroundImage()
            setChangingBackgroundImage(false)
        },200)
    },[visibleSliderReview])


    const setBackgroundImage = ()=>{
        if(!slides || slides?.length == 0 ) return 
        backgroundImageEl.current!.style.backgroundImage = `url(${slides[visibleSliderReview].background_image})`
    }



    return (
        <>
            <div
                className={['fixed w-[100%] h-[100%] z-[-1] opacity-[0.3] top-[0] left-[0] transition duration-500 bg-cover', changingBackgroundImage ? 'hide' : ''].join(' ')}
                ref={backgroundImageEl}
            />
           
            <Carousel model={[visibleSliderReview, setVisibleSliderReview]} stopAtEnd >
                {sliderImages}
            </Carousel>
            
        </>
    )
}

export default Slider 