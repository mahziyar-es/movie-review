'use client'

import './globals.css'
import { SessionProvider } from "next-auth/react"
import LayoutContent from './components/LayoutContent'


export default function RootLayout({
    children,
    session
}: {
    children: React.ReactNode,
    session: any
}) {
  
  
    return (
        <SessionProvider session={session}>
            <LayoutContent>
                {children}
            </LayoutContent>
        </SessionProvider>
    )
}
