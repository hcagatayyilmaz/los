import type {Metadata} from "next"
import {Roboto} from "next/font/google"
import "./globals.css"
import {UserLocationProvider} from "./providers/useUserLocation"
import ToastProvider from "./providers/ToastProvider"
import Head from "next/head"

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"]
})

export const metadata: Metadata = {
    title: "Los - Gamified Experiences with Rewards!",
    description: "Los - Experiences Travel with Rewards!"
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <Head>
                <link rel='icon' href='/favicon.png' />
            </Head>
            <body className={roboto.className}>
                <ToastProvider>
                    <UserLocationProvider>{children}</UserLocationProvider>
                </ToastProvider>
            </body>
        </html>
    )
}
