import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import StoreProvider from "./StoreProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Movie DB",
  description: "Bring latest movies to you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <StoreProvider>
          <Navigation />
          <main>
            <div className="h-screen overflow-auto py-24 px-5 md:p-24 bg-white">
              {children}
            </div>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
