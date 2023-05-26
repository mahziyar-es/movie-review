import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

  
const handler = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const data = await res.json()
            
                if (res.ok && data) {
                    return data
                }
                else {
                    throw new Error('Login failed')
                }
                
            }
        })
    ],

    jwt: {
        maxAge: 30*60,
    },

    callbacks: {
        async session({ session, user, token }) {
            session.user = token as {
                access:string,
                refresh:string,
            }
            return session
        },
        async jwt({ token, user }) {
            return {...token, ...user}
        },
    },

    pages: {
        signIn: '/login',
    }
})

export { handler as GET, handler as POST }