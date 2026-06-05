import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Somwanshi | Game Programmer & Software Developer",
  description:
    "Portfolio of Yash Somwanshi — Game Programmer & Software Developer. Specializing in game development with Unity and full-stack applications. Explore projects, skills, and achievements in an immersive cyberpunk-themed experience.",
  keywords: [
    "Game Programmer",
    "Software Developer",
    "Unity Developer",
    "Full-Stack Developer",
    "Portfolio",
    "Yash Somwanshi",
  ],
  authors: [{ name: "Yash Somwanshi" }],
  openGraph: {
    title: "Yash Somwanshi | Game Programmer & Software Developer",
    description:
      "Explore the digital universe of Yash Somwanshi — a Game Programmer and Software Developer building immersive experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Somwanshi | Game Programmer",
    description:
      "Game Programmer & Software Developer. Explore my cyberpunk portfolio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#050816" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
