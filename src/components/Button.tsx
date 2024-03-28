import React from "react";
import { useFormStatus } from "react-dom";

type Props = {};

export default function Button({}: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className=" w-full px-4 py-2 text-white dark:text-black bg-zinc-900 dark:bg-zinc-100 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
    >
      {pending ? "Let him cook..." : "DO IT 🔥"}
    </button>
  );
}
