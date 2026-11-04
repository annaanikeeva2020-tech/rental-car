import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers/Providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Find your perfect rental car",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
