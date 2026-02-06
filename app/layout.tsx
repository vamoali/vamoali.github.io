import type { ReactNode } from "react";
import "./globals.css";
import PwaInstaller from "./pwa-installer";

export const metadata = {
  title: "VamoAli — experiências locais com curadoria",
  description: "Descubra experiências locais com curadoria, roteiros vivos e encontros que viram história.",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/icon.svg",
    apple: "/images/icon.svg"
  }
};

export const viewport = {
  themeColor: "#10b981"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="emerald" suppressHydrationWarning>
      <body className="min-h-screen bg-base-100" suppressHydrationWarning>
        {children}
        <PwaInstaller />
      </body>
    </html>
  );
}
