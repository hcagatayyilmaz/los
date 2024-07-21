import type {Metadata} from "next"
import {Roboto} from "next/font/google"
import "./globals.css"
import {UserLocationProvider} from "./providers/useUserLocation"
import ToastProvider from "./providers/ToastProvider"

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"]
})

export const metadata: Metadata = {
    title: "Los - Gamified Travel with Rewards!",
    description: "Los - Gamified Travel with Rewards!"
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={roboto.className}>
                <ToastProvider>
                    <UserLocationProvider>{children}</UserLocationProvider>
                </ToastProvider>
            </body>
        </html>
    )
}
