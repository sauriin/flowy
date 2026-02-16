import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from '@clerk/nextjs'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flowy – Automate Your Workflows Effortlessly",
  description:
    "Flowy helps you automate repetitive tasks, connect apps, and build workflows without code. The easiest automation platform for creators and teams.",

  keywords: [
    "workflow automation",
    "task automation",
    "no code automation",
    "Zapier alternative",
    "business automation",
    "Flowy automation",
  ],

  openGraph: {
    title: "Flowy – Workflow Automation Platform",
    description:
      "Automate your tasks, connect apps, and scale productivity with Flowy.",
    url: "https://flowy.app",
    siteName: "Flowy",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Flowy Automation Platform",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Flowy – Automate Your Work",
    description:
      "Build powerful workflows and automate tasks easily with Flowy.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
