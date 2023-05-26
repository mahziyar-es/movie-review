'use client'
import { customFetch } from "@/utils/helpers"
import { Button, Gamon } from "gamon-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import PageTemplate from "../../components/PageTemplate"



export default function Review({ params }: {params: {id: number} }) {

    const router = useRouter()

    const [review, setReview] = useState<{  
        id: number,
        title: string,
        thumbnail: string,
        background_image: string,
        text: string,
        video: string,
        tags: string,
    }>()


    useEffect(()=>{
        fetchReview()
    },[])



    const fetchReview = async ()=>{
        const [res, data] = await customFetch('review/'+params.id, 'GET')
        if(res.ok) setReview(data.item)
    }

    

    const deleteReview = ()=>{
        Gamon.confirm('Delete review', 'Are you sure ?', async ()=>{
            const [res, data] = await customFetch('review/'+params.id, 'DELETE')
            if(res.ok) {
                Gamon.notify('Deleted', 'success')
                router.replace('/reviews')
            }
        })

    }



    return (
        <PageTemplate 
            title="Review"
            headerChildren={
                (<div className="flex">
                    <Link href={'/review/create/'+params.id} className="m-1 w-[100px]">
                        <Button text="Edit" className="bg-lime-400 text-white" />
                    </Link>
                    <Button text="Delete" className="bg-red-500 text-white m-1 w-[100px]" onClick={deleteReview} />
                </div>)
            }
        >
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2 p-2">
                    <iframe 
                        className="rounded-1 w-full min-h-[300px]" 
                        src={`https://www.youtube.com/embed/${review?.video}`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    >
                    </iframe>
                    <div className="flex gap-1 mt-3">
                        <div className="w-1/2">
                            Thumbnail
                            <img src={review?.thumbnail} className="rounded-1 " />
                        </div>
                        <div className="w-1/2">
                            Background image
                            <img src={review?.background_image} className="rounded-1" />
                        </div>
                    </div>
                </div> 
                <div className="w-full lg:w-1/2 p-2" >
                    <p className="text-[25px]">{review?.title}</p>
                    <p>{review?.tags}</p>

                    { review?.text && <div dangerouslySetInnerHTML={{ __html: review.text }}></div> }
                    
                </div>
            </div>  
        </PageTemplate>
       
    )
}
