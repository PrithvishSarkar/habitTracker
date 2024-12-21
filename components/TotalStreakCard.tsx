import "../src/tailwind.css";
import { useState, useEffect } from "react";

// Defining the Prop Type of 'TotalStreakCard'
type PropType = {
  title: string;
  detail: string;
  count: number;
  date: string;
};

// This Component displayes an instpirational quote and the Total Streaks of all the Habits
// All Habits are displayed individually with their Streak Counts
function TotalStreakCard({ title, detail, count, date }: PropType) {
  // The 'countText' contains the 'count' and is displayed as Streak Count
  const [countText, setCountText] = useState<string>("");

  // a Side Effect runs whenever the 'count' changes
  // Side Effect runs to modify the value of 'countText'
  useEffect(() => {
    count === 1 ? setCountText(`${count} Day`) : setCountText(`${count} Days`);
  }, [count]);

  return (
    <div
      className="p-2 border-2 border-indigo-500 rounded-xl bg-indigo-100
    max-w-full min-h-full flex flex-col items-center justify-between"
    >
      <span className="self-start text-sm font-mono">Start Date: {date}</span>
      <span className="text-center text-2xl font-mono font-bold text-indigo-800">
        {title}
      </span>
      <span
        className="text-indigo-800 font-sans text-lg italic
      border-b-2 border-solid streak-card-description-border"
      >
        {detail}
      </span>
      <span
        className="mt-4 p-2 
      text-center text-xl text-indigo-800 font-serif font-semibold"
      >
        Your Total Streak!!
      </span>
      <span
        className="p-4 text-emerald-500 text-4xl font-bold
      border-2 border-emerald-500 rounded-ss-lg rounded-ee-lg bg-emerald-200"
      >
        {countText}
      </span>
    </div>
  );
}
export { TotalStreakCard };
