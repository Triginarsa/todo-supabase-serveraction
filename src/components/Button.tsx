import React from "react";
import { useFormStatus } from "react-dom";

type Props = {};

export default function Button({}: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className=" w-full px-4 py-2 text-white bg-zinc-600 rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
    >
      {pending ? "Adding..." : "DO IT 🔥"}
    </button>
  );
}
