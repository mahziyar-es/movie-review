import { Gamon } from "gamon-react"



const customFetch = async (url: string, method: 'POST'|'GET'|'PUT'|'DELETE', options?:any)=>{

    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+url,{
        method: method,
        headers:{
            // "Content-Type": "multipart/form-data",
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

    
    return [res, data]
}



const formatNumber = (value: number|string)=>{
    value = value.toString()
    const length = value.length 
    if(length > 9) return (Math.floor(Number(value)/1000000000)) + 'B'
    else if(length > 6) return (Math.floor(Number(value)/1000000)) + 'M'
    else if(length > 3) return (Math.floor(Number(value)/1000)) + 'K'
    else return value
}



export {
    customFetch,
    formatNumber,
}