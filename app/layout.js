// app/layout.js (root - keep this, just make sure body is clean)

import './globals.css';

export const metadata = {
  title: 'My Blog',
  description: 'A practice blog app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}