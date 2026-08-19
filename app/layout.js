// app/layout.js (root - keep this, just make sure body is clean)

import './globals.css';
import { newsreader, plexSans } from '@/lib/fonts';
export const metadata = {
  title: 'My Blog',
  description: 'A practice blog app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}