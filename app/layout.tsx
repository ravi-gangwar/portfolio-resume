import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ravi Gangwar - Software Engineer & Full-Stack Developer',
  description: 'Final-year B.Tech IT student with 1+ year experience at Wyvate building scalable apps with React Native, Next.js, Node.js and AI/LLM integrations.',
  keywords: 'Software Engineer, Full-Stack Developer, React Native, Next.js, Node.js, JavaScript, TypeScript',
  authors: [{ name: 'Ravi Gangwar' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}