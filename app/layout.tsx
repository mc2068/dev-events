import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import LightRays from "./components/LightRays";
import NavBar from "./components/NavBar";

// Drawn to stay readable at small sizes on a phone; Arabic excerpts fall back to the phone's own font.
const SchibstedGgrotesk = Schibsted_Grotesk({ 
    variable: "--font-schibsted-grotesk",
    subsets: ["latin"], 
});

const martianMono = Martian_Mono({
    variable: "--font-martian-mono",
    subsets: ["latin"], 
});
export const metadata: Metadata = {
  title: "DevEvent",
  description:
    "The Hub for Every Dev Event You Musn t Miss",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={SchibstedGgrotesk.variable + " " + martianMono.variable + " min-h-screen antialiased"}>
      <NavBar />
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
              raysOrigin="top-center-offset"
              raysColor="#5dfeca"
              raysSpeed={0.5}
              lightSpread={0.9}
              rayLength={1.4}
              followMouse={true}
              mouseInfluence={0.02}
              noiseAmount={0}
              distortion={0.01}
              className="custom-rays"
          />
        </div>
        <main>
            {children}
        </main>
      </body>

    </html>
  );
}
