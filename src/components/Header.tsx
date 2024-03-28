"use client";
import Image from "next/image";
import React, { use, useEffect } from "react";
import Title from "./Title";

type Props = {};

export default function Header({}: Props) {
  const [scrolled, setScrolled] = React.useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
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
  return (
    <div
      className={`fixed flex flex-row space-x-3 bg-white items-center dark:bg-black  w-full max-w-lg py-4 px-6 h-20 ${
        scrolled
          ? "border-b border-zinc-200 dark:border-zinc-800"
          : "border-none"
      }`}
    >
      <Image src="/logo.svg" alt="logo" width={110} height={36} />
      {scrolled && <Title />}
    </div>
  );
}
