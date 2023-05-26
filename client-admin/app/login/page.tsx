'use client'

import { Gamon, InputBasic, Row, Col, Button } from 'gamon-react'
import React, { useState } from 'react'
import { signIn, useSession } from "next-auth/react"


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const login = async (e: React.FormEvent) => {
        e.preventDefault()

        if(!email){
            Gamon.notify('Email is required', 'error')
            return
        }
        if(!password){
            Gamon.notify('Password is required', 'error')
            return
        }

        setLoading(true)

        const login = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
            callbackUrl: "/",
        })

        setLoading(false)

        if (login?.error) {
            Gamon.notify(login?.error, 'error')
        } else {
            window.location.replace('/')
        }
       
    }

    return (
        <div className='h-[100vh] flex flex-col items-center justify-center p-4'>
            <p className='text-[30px]'> Login </p>
            <form className='w-full' onSubmit={login}>
                <Row className='flex items-center justify-center mt-5'>
                    <Col width="lg-4 md-6 flex flex-col items-center justify-center">
                        <InputBasic model={[email, setEmail]} title="Email" />
                        <InputBasic model={[password, setPassword]} title="Password" type="password" />
                        <Button text="Login" className='bg-blue-600 text-white mt-5 flex self-center' type="submit" loading={loading} />
                    </Col>
                </Row>
            </form>
        </div>
    )
}
