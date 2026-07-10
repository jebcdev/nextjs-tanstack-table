import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});
import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";
import { Toaster } from "sonner";
import { TanStackQueryProvider } from "@/features/shared/components";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
    const title = await generateAsyncTitle();
    const description = await generateAsyncDescription();
    return {
        title,
        description,
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "dark h-full",
                "antialiased",
                geistSans.variable,
                geistMono.variable,
                "font-mono",
                jetbrainsMono.variable,
            )}
        >
            <body className="min-h-full flex flex-col">
                <Toaster
                    duration={3000}
                    position="top-right"
                    richColors
                    closeButton
                    theme="dark"
                />
                <TanStackQueryProvider>
                    {children}
                </TanStackQueryProvider>
            </body>
        </html>
    );
}
