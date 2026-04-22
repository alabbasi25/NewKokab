import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kokab | كوكب',
  description: 'مساحتكم الخاصة للنمو والارتباط الآمن',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans antialiased text-white bg-[var(--color-bg-deep)] overflow-x-hidden">
        <main className="min-h-screen max-w-md mx-auto relative bg-[var(--color-bg-deep)] shadow-2xl">
          {children}
        </main>
      </body>
    </html>
  );
}
