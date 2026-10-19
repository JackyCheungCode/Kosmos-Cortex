import type { Metadata } from "next";
import "./globals.scss";
import "./dashboard-refresh.scss";
import "@carbon/charts/styles.css";

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
