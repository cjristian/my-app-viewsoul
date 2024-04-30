import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ViewSoul",
  description: "Tu app de confianza",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <SessionProvider session={session}>
      <html lang="es">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
