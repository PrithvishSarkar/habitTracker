import "../src/tailwind.css";
import { ImCross } from "react-icons/im";
import { MdOutlineDone } from "react-icons/md";

interface HabitInput {
  isDone: boolean;
  habitTitle: string;
  habitDetail: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
function TodayStreakCard({isDone, habitTitle, habitDetail, onClick}: HabitInput) {
  return (
    <div
      className="p-2 mx-auto border-2 border-indigo-500 rounded-xl bg-indigo-100
    max-w-full min-h-full flex flex-col items-center justify-between"
    >
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
        className="mt-6 p-2 
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
