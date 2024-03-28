"use client";
import Image from "next/image";
import React, { use, useEffect } from "react";
import { Permanent_Marker } from "next/font/google";

const marker = Permanent_Marker({ weight: "400", subsets: ["latin"] });

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 2) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const date = new Date();
  const thisDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const thisDay = date.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div
      className={`fixed bg-white dark:bg-black  w-full max-w-lg h-48 ${
        scrolled ? "border-b-2 border-gray-200" : ""
      }`}
    >
      <div className=" my-4 mx-6 space-y-11">
        <Image src="/logo.svg" alt="logo" width={110} height={36} />
        <div className="space-y-2">
          <p className="text-zinc-400 text-[10px] font-normal font-['Helvetica']">
            {thisDate}
          </p>
          <div className={marker.className}>
            <h1 className="text-black text-[32px] font-normal">{thisDay}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
