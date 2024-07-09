import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { TmdbProvider } from "./contexts/TmdbProvider";

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
        <TmdbProvider>
          <Navigation />
          <main>
            <div className="h-screen overflow-auto py-24 p-10 md:p-24">
              {children}
            </div>
          </main>
        </TmdbProvider>
      </body>
    </html>
  );
}
