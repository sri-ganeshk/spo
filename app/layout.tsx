// app/layout.tsx
import './globals.css';
import React from 'react';
import {Appbar} from './components/navbar';
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
        <Appbar />
        {children}
      </body>
    </html>
  );
}
