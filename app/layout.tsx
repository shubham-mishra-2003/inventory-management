import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/hooks/ThemeProvider";

export const metadata: Metadata = {
  title: "Inventory Management Table",
  description: "Dynamic Inventory Management Table",
  icons: "/logo-icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
