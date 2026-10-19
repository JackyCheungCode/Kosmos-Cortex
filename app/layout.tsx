import type { Metadata } from "next";
import "./globals.scss";
import "@carbon/charts-react/dist/styles.css";

export const metadata: Metadata = {
  title: "Kosmos Cortex",
  description: "Kosmos Cortex 外贸 CRM 业务数据中枢",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
