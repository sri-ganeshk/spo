// app/layout.tsx
import './globals.css';
import React from 'react';
import NavbarDemo from './components/navbar';
import RainAnimation from './components/Raineffect';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body style={{ position: "relative", zIndex: 1 }}>
      <RainAnimation />
        <div ></div>
        <NavbarDemo />
        {children}
      </body>
    </html>
  );
}
