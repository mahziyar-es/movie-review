import NextAuth from "next-auth";


declare module "next-auth"{
    interface Session{
        user:{
            access: string,
            refresh: string,
        },
    }
    
    interface JWT{
        access: string,
        refresh: string,
    }
}