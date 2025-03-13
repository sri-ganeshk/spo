import "./globals.css"// Ensure the correct path
import React from "react";
import NavbarDemo from "./components/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        
        <body className="bg-black">
            
            <NavbarDemo />
            
            <div className="pt-18">
            {children}
            </div>
            
            
            </body>
        </html>
    );
}
