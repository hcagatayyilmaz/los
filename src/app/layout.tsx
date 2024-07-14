import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {UserLocationProvider} from "./providers/useUserLocation"

const inter = Inter({subsets: ["latin"]})

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
            <body className={inter.className}>
                <UserLocationProvider>{children}</UserLocationProvider>
            </body>
        </html>
    )
}
