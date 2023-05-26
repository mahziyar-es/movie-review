'use client'
import PageTemplate from "@/app/(dashboard)/components/PageTemplate"
import { customFetch } from "@/utils/helpers"
import { Button, Gamon, InputBasic, InputFile } from "gamon-react"
import { useSession } from "next-auth/react"
import { FormEvent, useEffect, useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function ReviewCreate({params} : {params:{id:number[]}} ) {

    const {data:session} = useSession()
    
    const [id, setId] = useState<number>()
    const [title, setTitle] = useState('')
    const [video, setVideo] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [bgImage, setBgImage] = useState('')
    const [text, setText] = useState('')
    const [tags, setTags] = useState('')


    useEffect(()=>{
        if(params?.id?.[0]) setId(params.id[0])
    },[])

    useEffect(()=>{
        if(id) fetchReview()
    },[id])

    const fetchReview  = async ()=>{
        const [res,data] = await customFetch('review/'+id, 'GET')
        if(res.ok){
            setTitle(data.item.title)
            setVideo(data.item.video)
            setText(data.item.text)
            setTags(data.item.tags)
        }
    }


    const save = async (e:FormEvent)=>{
        e.preventDefault()
        if(id) update()
        else create()
    }


    const create = async ()=>{

        if(!title){
            Gamon.notify('Title is required', 'error')
            return
        }
        if(!thumbnail){
            Gamon.notify('Thumbnail is required', 'error')
            return
        }
        if(!bgImage){
            Gamon.notify('Background image is required', 'error')
            return
        }
        if(!video){
            Gamon.notify('Video ID is required', 'error')
            return
        }
        if(!text){
            Gamon.notify('Text is required', 'error')
            return
        }
        if(!tags){
            Gamon.notify('Tags are required', 'error')
            return
        }

        let formData = new FormData()
        formData.append('title', title)
        formData.append('thumbnail', thumbnail)
        formData.append('background_image', bgImage)
        formData.append('video', video)
        formData.append('text', text)
        formData.append('tags', tags)


        const [res, data] = await customFetch('review', 'POST',{
            body: formData
        })
        
        if(res.ok) {
            Gamon.notify('Saved', 'success')
            setTitle('')
            setVideo('')
            setThumbnail('')
            setBgImage('')
            setText('')
            setTags('')
        }
    }


    const update = async ()=>{
        if(!title){
            Gamon.notify('Title is required', 'error')
            return
        }
        if(!video){
            Gamon.notify('Video ID is required', 'error')
            return
        }
        if(!text){
            Gamon.notify('Text is required', 'error')
            return
        }
        if(!tags){
            Gamon.notify('Tags are required', 'error')
            return
        }

        let formData = new FormData()
        formData.append('title', title)
        if(thumbnail) formData.append('thumbnail', thumbnail)
        if(bgImage) formData.append('background_image', bgImage)
        formData.append('video', video)
        formData.append('text', text)
        formData.append('tags', tags)


        const [res, data] = await customFetch('review/'+id, 'PUT',{
            body: formData
        })
        
        if(res.ok) {
            Gamon.notify('Updated', 'success')
        }
    }


    return (
        <PageTemplate title={id ? 'Update review' : 'Create review'}>
            <form onSubmit={save} className="flex flex-wrap mt-5 pb-5">


                <div className="w-full p-2">
                    <InputBasic title="Title" model={[title, setTitle]} />
                </div>

                <div className="w-full lg:w-1/2 md:w-1/2 p-2">
                    <InputFile title="Thumbnail" model={[thumbnail, setThumbnail]} preview />
                </div>

                <div className="w-full lg:w-1/2 md:w-1/2 p-2">
                    <InputFile title="Background image" model={[bgImage, setBgImage]} preview  />
                </div>

                <div className="w-full p-2">
                    <InputBasic title="Youtube video ID" model={[video, setVideo]} />
                </div>
                <div className="w-full p-2">
                    <InputBasic title="Tags" model={[tags, setTags]} />
                </div>

                <div className="w-full p-2">
                    <ReactQuill theme="snow" value={text} onChange={setText} 
                        modules={
                            {
                                toolbar: [
                                    [{ 'header': [1, 2, false] }],
                                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                    ['link', 'image'],
                                    [{ 'color': [] }, { 'background': [] }],
                                    [{ 'size': ['small', false, 'large', 'huge'] }],
                                    [{ 'font': [] }],
                                    [{ 'align': [] }],
                                    ['clean'],
                                ],
                            }
                        }
                        formats={
                            [
                                'header',
                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                'list', 'bullet', 'indent',
                                'link', 'image'
                            ]
                        }
                    />
                </div>

                <div className="w-full p-2 flex justify-center">
                    <Button text={id ? 'Update' : 'Create'} type="submit" className="bg-lime-400 text-white"  />
                </div>

            </form>
        </PageTemplate>
    )
}
