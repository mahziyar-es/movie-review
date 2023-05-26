'use client'

import { Notify, Confirm } from 'gamon-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'



export default function LayoutContent({
  children
}: {
  children: React.ReactNode
  }) {
  
    const {data:session, status} = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status == 'unauthenticated') 
            router.replace('/login')
    }, [status])

    return (
        <html lang="en">
            <body >
                {status != 'loading' && 
                    <>
                        <Notify position='bottom' />
                        <Confirm />
                        {children}
                    </>
                }
            </body>
        </html>
    )
}
