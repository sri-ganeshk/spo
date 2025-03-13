"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../components/ui/button";

export function Appbar() {
  const [active, setActive] = useState<string | null>(null);

  const toggleDropdown = (item: string) => {
    setActive(active === item ? null : item);
  };

  return (
    <div className="bg-black relative">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 z-50 w-full p-2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 backdrop-blur-xl rounded-2xl bg-black border border-neutral-700 shadow-lg"
        >
          <div className="flex h-16 items-center justify-between relative text-white">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="flex items-center space-x-1 transition-opacity hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <span className="hidden font-bold font-mono text-xl sm:inline-block">
                  100<span className="text-pink-500">x</span>Photos
                </span>
              </Link>
            </motion.div>

            {/* Navigation Menu Buttons */}
            <div className="flex items-center gap-4">
              {/* Home */}
              <Link href="/">
                <Button variant="ghost" className="text-white">
                  Home
                </Button>
              </Link>

              {/* Products */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="text-white"
                  onClick={() => toggleDropdown("Products")}
                >
                  Products
                </Button>
                {active === "Products" && (
                  <div className="absolute top-full left-0 mt-2 p-4 bg-black border border-neutral-700 rounded shadow-lg z-10">
                    <div className="text-sm grid grid-cols-2 gap-10 text-white">
                      <div className="flex flex-col items-center">
                        <Link href="https://algochurn.com">
                          <img
                            src="https://assets.aceternity.com/demos/algochurn.webp"
                            alt="Algochurn"
                            className="h-12 w-12 object-cover mb-2"
                          />
                          <span className="font-bold">Algochurn</span>
                        </Link>
                        <p className="text-xs text-white text-center">
                          Prepare for tech interviews like never before.
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Link href="https://tailwindmasterkit.com">
                          <img
                            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                            alt="Tailwind Master Kit"
                            className="h-12 w-12 object-cover mb-2"
                          />
                          <span className="font-bold">Tailwind Master Kit</span>
                        </Link>
                        <p className="text-xs text-white text-center">
                          Production ready Tailwind css components for your next project.
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Link href="https://gomoonbeam.com">
                          <img
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                            alt="Moonbeam"
                            className="h-12 w-12 object-cover mb-2"
                          />
                          <span className="font-bold">Moonbeam</span>
                        </Link>
                        <p className="text-xs text-white text-center">
                          Never write from scratch again. Go from idea to blog in minutes.
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Link href="https://userogue.com">
                          <img
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                            alt="Rogue"
                            className="h-12 w-12 object-cover mb-2"
                          />
                          <span className="font-bold">Rogue</span>
                        </Link>
                        <p className="text-xs text-white text-center">
                          Respond to government RFPs, RFIs and RFQs 10x faster using AI.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="text-white"
                  onClick={() => toggleDropdown("Pricing")}
                >
                  Pricing
                </Button>
                {active === "Pricing" && (
                  <div className="absolute top-full left-0 mt-2 p-4 bg-black border border-neutral-700 rounded shadow-lg z-10">
                    <div className="flex flex-col space-y-4 text-sm text-white">
                      <Link href="/songs" className="hover:underline">
                        Songs
                      </Link>
                      <Link href="/feed" className="hover:underline">
                        Feed
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </div>
  );
}
