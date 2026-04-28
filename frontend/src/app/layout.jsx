import { Inter } from 'next/font/google';
import './globals.css';
import MainAndNav from '@/components/MainAndNav';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'cutoffs.ai',
  description: "India's College Intelligence Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <MainAndNav>{children}</MainAndNav>
      </body>
    </html>
  );
}
