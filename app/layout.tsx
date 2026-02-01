import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "VamoAli — experiências locais com curadoria",
  description: "Descubra experiências locais com curadoria, roteiros vivos e encontros que viram história."
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
