'use client'

import { Gamon } from "gamon-react"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function SidebarMenu() {



    const logout = ()=>{
        Gamon.confirm('Logout', 'Are you sure?', async ()=>{
            await signOut()
            .then(res=>{
                window.location.replace('/login')
            })
        })
    }


    return (
        <>
            <Link href="/" className="flex p-2 border-b border-white text-lime-50 hover:text-lime-400  cursor-pointer transition-all duration-200"> Dashboard </Link>
            <Link href="/reviews" className="flex p-2 border-b border-white text-lime-50 hover:text-lime-400  cursor-pointer transition-all duration-200"> Reviews </Link>
            <Link href="/review/create" className="flex p-2 border-b border-white text-lime-50 hover:text-lime-400  cursor-pointer transition-all duration-200"> Create review </Link>
            <div onClick={logout} className="flex p-2 border-b border-white text-lime-50 hover:text-lime-400  cursor-pointer transition-all duration-200"> Logout </div>
        </>
    )
}