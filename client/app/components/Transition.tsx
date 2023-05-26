'use client'
import { motion } from 'framer-motion';
import React from 'react';


export default function Transition({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <motion.div
            style={{height:'100%', width:'100%'}}
            initial={{  opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.5,
            }}
        > 
            {children}
        </motion.div>
    )
}
