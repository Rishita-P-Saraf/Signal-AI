import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Signal AI - Customer Call Intelligence",
    description: "AI-powered customer call analysis system that extracts insights from every conversation",
    keywords: ["AI", "customer calls", "analytics", "VWO", "insights", "feature requests"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
