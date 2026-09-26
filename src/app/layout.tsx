import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque } from "next/font/google";
import "@/assets/css/index.css";
import "@/libs/thousands";
import Toaster from "@/components/Toaster";
import NProgressBar from "@/components/NProgressBar";
import { themeInitScript } from "@/libs/theme";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Katering Sehat",
    default: "Katering Sehat",
  },
  description: "Katering sehat langganan — pilih paket, bayar via transfer, dan menu sehat diantar tiap hari.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${archivo.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <NProgressBar>
          {children}
          {modal}
          <Toaster />
        </NProgressBar>
      </body>
    </html>
  );
}
