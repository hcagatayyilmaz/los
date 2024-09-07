import type {Metadata} from "next"
import {Roboto} from "next/font/google"
import "./globals.css"
import {UserLocationProvider} from "./providers/useUserLocation"
import ToastProvider from "./providers/ToastProvider"
import Head from "next/head"
import {UIProvider} from "./providers/UIProvider"
import CookieConsent from "../app/components/CookieConsent"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
})

export const metadata: Metadata = {
  title: "Los - Gamified Experiences with Exciting Rewards!",
  description: "Gamified experiences map of your city with exciting rewards!"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body className={roboto.className}>
        <ToastProvider>
          <UserLocationProvider>
            {children}
            <CookieConsent />
          </UserLocationProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
