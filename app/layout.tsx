import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import Providers from './providers/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fifty Size',
  description: 'Find your size comparing between brands',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fs-icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <>
          <div className="flex-none fixed -z-1">
            <div
              className="fixed inset-0 w-screen h-screen bg-repeat invert-100"
              style={{
                backgroundImage: `url('/rR6HYXBrM.png')`,
                backgroundSize: 200,
                opacity: 0.08,
              }}
            ></div>
          </div>
          <NuqsAdapter>
            <Providers>{children}</Providers>
          </NuqsAdapter>
        </>
      </body>
    </html>
  );
}
