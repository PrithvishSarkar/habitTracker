import React from "react";
import "../src/tailwind.css";
import { ImCross } from "react-icons/im";
import { MdOutlineDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

// Defining the Prop Type of 'TodayStreakCard' Component
interface HabitInput {
  date: string;
  isDone: boolean;
  habitTitle: string;
  habitDetail: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// This is the Card used inside 'TodayStreak.tsx' and is invoked as List Item
// date, isDone, habitTitle and habitDetail are present in Habit Info Array elements
// onClick -> Toggles between 'true' and 'false' -> Work Done or not
// onDelete -> Deletes the particular item
// onEdit -> Edits the particular Streak Card Habit Title and Detail
function TodayStreakCard({
  date,
  isDone,
  habitTitle,
  habitDetail,
  onClick,
  onEdit,
  onDelete,
}: HabitInput) {
  return (
    <div
      className="p-2 border-2 border-indigo-500 rounded-xl bg-indigo-100
    max-w-full min-h-full flex flex-col items-center justify-between"
    >
      <span className="min-w-full flex flex-row items-center justify-between">
        <span className="font-mono text-sm">Start: {date}</span>
        <span className="flex flex-row gap-1 items-center justify-between">
          <button
            onClick={onEdit}
            className="bg-transparent border-none outline-0 cursor-pointer"
          >
            <FaEdit color="#b45309" />
          </button>
          <button
            onClick={onDelete}
            className="bg-transparent border-none outline-0 cursor-pointer"
          >
            <MdDelete color="#be123c" />
          </button>
        </span>
      </span>
      <span className="text-center text-2xl font-mono font-bold text-indigo-800">
        {habitTitle}
      </span>
      <span
        className="text-left text-indigo-800 font-sans text-lg italic
      border-b-2 border-solid streak-card-description-border"
      >
        {habitDetail}
      </span>
      <span
        className="mt-4 p-2 
      text-center text-xl text-indigo-800 font-serif font-semibold"
      >
        Is today's work done?
      </span>
      <button
        onClick={onClick}
        className={`p-4 text-9xl border-4 ${
          isDone ? "border-emerald-500" : "border-rose-500"
        } rounded-[50%] ${isDone ? "bg-emerald-200" : "bg-rose-200"}`}
      >
        {isDone ? (
          <MdOutlineDone color="#10b981" />
        ) : (
          <ImCross color="#f43f5e" />
        )}
      </button>
    </div>
  );
}
export { TodayStreakCard };
