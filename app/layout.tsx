import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SnakeGameBackground } from "@/components/ui/snake-game-background";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Ravi Gangwar - Software Engineer & Full-Stack Developer",
  description:
    "Final-year B.Tech IT student with 1+ year experience at Wyvate building scalable apps with React Native, Next.js, Node.js and AI/LLM integrations.",
  keywords:
    "Software Engineer, Full-Stack Developer, React Native, Next.js, Node.js, JavaScript, TypeScript",
  authors: [{ name: "Ravi Gangwar" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* Background Snake Game - Hidden on small screens */}
          <SnakeGameBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
