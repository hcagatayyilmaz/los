// src/app/components/ToastProvider.tsx
"use client"

import {Toaster} from "react-hot-toast"
import {ReactNode} from "react"

const ToastProvider = ({children}: {children: ReactNode}) => {
    return (
        <>
            {children}
            <Toaster position='top-center' />
        </>
    )
}

export default ToastProvider
