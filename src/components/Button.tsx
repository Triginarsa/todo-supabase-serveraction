import React from "react";
import { useFormStatus } from "react-dom";

type Props = {};

export default function Button({}: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {pending ? "Adding..." : "Add Todo"}
    </button>
  );
}
