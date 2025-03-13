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
      <body >
        <div ></div>
        <Appbar />
        {children}
      </body>
    </html>
  );
}
