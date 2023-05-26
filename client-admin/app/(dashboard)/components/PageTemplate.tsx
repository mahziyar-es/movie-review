'use client'
import { ReactNode } from "react"


export default function PageTemplate({children, title, headerChildren, onScroll}: {children: ReactNode, title:string, headerChildren?:ReactNode, onScroll?: (e:any)=>void}) {
    return (
        <div className="flex flex-col h-full overflow-hidden">  
            <div className="flex justify-between  p-2">
                <p className="text-[25px]">{title}</p>
                {headerChildren}
            </div>

            <div className="flex flex-wrap flex-1 overflow-auto p-2" onScroll={onScroll}>

                {
                    children
                }
            
            </div>
        </div>
    )
}
