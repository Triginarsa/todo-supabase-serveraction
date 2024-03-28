import type { Metadata } from "next";
import { Noto_Sans_Mono } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_Mono({ subsets: ["latin"] });

const title = "TO DO IT NOW 🔥";
const description =
  "Dont wait, do it now! Simple Todo demo using Supabase & Server Actions";

export const metadata: Metadata = {
  title: {
    default: title,
    template: " %s | to do it now 🔥",
  },
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@triginarsa",
  },
  metadataBase: new URL("https://todoitnow.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>{children}</body>
    </html>
  );
}
