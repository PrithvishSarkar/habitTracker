import "../src/tailwind.css";
import { useState, useEffect } from "react";

type PropType = {
  title: string;
  detail: string;
  count: number;
};

function TotalStreakCard({ title, detail, count }: PropType) {
  const [countText, setCountText] = useState<string>("");

  useEffect(() => {
    count === 1 ? setCountText(`${count} Day`) : setCountText(`${count} Days`);
  }, [count]);

  return (
    <div
      className="p-2 mx-auto border-2 border-indigo-500 rounded-xl bg-indigo-100
    max-w-full min-h-full flex flex-col items-center justify-between"
    >
      <span className="text-center text-2xl font-mono font-bold text-indigo-800">
        {title}
      </span>
      <span
        className="self-start text-left text-indigo-800 font-sans text-lg italic
      border-b-2 border-solid
      streak-card-description-border"
      >
        {detail}
      </span>
      <span
        className="mt-6 p-2
      text-center text-xl text-indigo-800 font-serif font-semibold"
      >
        Your Total Streak!!
      </span>
      <button
        className="p-4 text-emerald-500 text-4xl font-bold
      border-2 border-emerald-500 rounded-ss-lg rounded-ee-lg bg-emerald-200"
      >
        {countText}
      </button>
    </div>
  );
}
export { TotalStreakCard };
