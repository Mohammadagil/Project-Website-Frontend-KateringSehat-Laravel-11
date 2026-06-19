import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/assets/css/index.css";
import "@/libs/thousands";
import Toaster from "@/components/Toaster";
import NProgressBar from "@/components/NProgressBar";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Katering Sehat",
    default: "Katering Sehat",
  },
  description: "Healthy foods, asian foods, instant foods, and more",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <NProgressBar>
          <main className="container max-w-sm mx-auto flex flex-col gap-y-5 relative">{children}</main>
          {modal}
          <Toaster />
        </NProgressBar>
      </body>
    </html>
  );
}
