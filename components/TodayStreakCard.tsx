import "../src/tailwind.css";
import { ImCross } from "react-icons/im";
import { MdOutlineDone } from "react-icons/md";

// Defining the Prop Type of 'TodayStreakCard' Component
interface HabitInput {
  date: string;
  isDone: boolean;
  habitTitle: string;
  habitDetail: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// This is the Card used inside 'TodayStreak.tsx' and is invoked as List Item
// date, isDone, habitTitle and habitDetail are present in Habit Info Array elements
// onClick -> Toggles between 'true' and 'false' -> Work Done or not
function TodayStreakCard({
  date,
  isDone,
  habitTitle,
  habitDetail,
  onClick,
}: HabitInput) {
  return (
    <div
      className="p-2 border-2 border-indigo-500 rounded-xl bg-indigo-100
    max-w-full min-h-full flex flex-col items-center justify-between"
    >
      <span className="text-sm font-extralight font-mono self-start">
        Start Date: {date}
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
