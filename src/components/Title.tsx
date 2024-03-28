import { Permanent_Marker } from "next/font/google";
import Header from "./Header";

const marker = Permanent_Marker({ weight: "400", subsets: ["latin"] });

export default function Title() {
  const date = new Date();
  const thisDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const thisDay = date.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="-space-y-3">
      <p className="text-zinc-400 dark:text-zinc-500 text-[10px] font-normal font-['Helvetica']">
        {thisDate}
      </p>
      <div className={marker.className}>
        <h1 className="text-black dark:text-white text-[32px] font-normal">
          {thisDay}
        </h1>
      </div>
    </div>
  );
}
