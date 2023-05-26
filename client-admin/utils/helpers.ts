import { Gamon } from "gamon-react"
import { getSession, signOut } from "next-auth/react"



const customFetch = async (url: string, method: 'POST'|'GET'|'PUT'|'DELETE', options?:any)=>{

    const session = await getSession()

    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+url,{
        method: method,
        headers:{
            // "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer '+session?.user?.access, 
        },
        ...options
    })

    const data = await res.json()

    if(!res.ok){
        if(data.detail) Gamon.notify(data.detail, 'error')
        else{
            try{
                Gamon.notify(data, 'error')
            }
            catch{
                Gamon.notify('Something went wrong', 'error')
            }
        }
    }

    if(res.status == 401){
        await signOut()
        window.location.replace('/login')
    }


    
    return [res, data]
}



export {
    customFetch
}