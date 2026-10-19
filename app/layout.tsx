import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kosmos Cortex",
  description: "Kosmos Cortex application workspace",
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
