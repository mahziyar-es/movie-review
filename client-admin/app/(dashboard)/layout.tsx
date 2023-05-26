'use client'
import { Sheet } from "gamon-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import SidebarMenu from "./components/SidebarMenu"
import IconMenu from '@/public/icon-menu.png'
import Image from "next/image"

export default function DashboardLayout({children}:{children: ReactNode}) {

    const {data:session, status} = useSession()

    return (
        <>
            {status == 'authenticated' && ( 
                <div className="h-[100vh] flex flex-col md:flex-row overflow-hidden ">


                    {/* sidebar */}
                    <div className="h-[100vh] overflow-auto hidden flex-col lg:flex md:flex lg:w-1/5 md:w-1/4 bg-gray-600 p-2">
                        <SidebarMenu />
                    </div>
                    <div className="flex md:hidden p-2">
                        <Image src={IconMenu} gamon-sheet-toggle="sidebar" alt="Menu icon" className="w-[25px] h-[25px]" />
                        <Sheet id="sidebar" type="left" animation="slide-right" height={'100vh'} bodyClass="bg-gray-600 p-2 max-w-[250px]">
                            <SidebarMenu />
                        </Sheet>
                    </div>



                    {/* content */}
                    <div className="w-full lg:w-4/5 md:w-3/4 flex-1 md:h-[100vh] overflow-hidden">
                        {children}
                    </div>



                </div>
            )}
        </>
    )
}