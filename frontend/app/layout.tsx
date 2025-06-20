import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Signer",
  description: "Add a signature to an image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-700 text-white min-h-screen`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
