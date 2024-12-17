import { Inter as FontSans } from "next/font/google"

// utils import
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import './globals.css'

// clerk imports
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes"

// LiveBlocks provider
import Provider from "./Provider"


// next fonts
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


// Metadata of project
export const metadata: Metadata = {
  title: 'LiveDocs',
  description: 'Your go-to collaborative editor',
  icons: {
    icon: './favicon.ico',
  }
}


// Actual layout 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { 
          colorPrimary: "#3371FF" ,
          fontSize: '16px'
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}