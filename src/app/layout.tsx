import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { fontMono, fontSans } from "./fonts";

export const metadata: Metadata = {
    title: "Vicenza CRM",
    description: "Vicenza CRM @Phòng chuyển đổi số",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${fontSans.variable} ${fontMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="fixed right-4 top-2 z-50 md:top-4 cursor-pointer">
                    </div>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
