import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jay Bhatt // Quantitative Risk Architecture, Embedded Systems & Full-Stack Engineering',
  description: 'Personal monograph and systems portfolio of Jay Bhatt. High-throughput escrow protocols, GARCH quantitative risk models, eBPF threat mitigation, and GNU Radio SDR engineering.',
};

export const viewport: Viewport = {
  themeColor: '#14150E',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#14150E', color: '#F4F3EF', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
