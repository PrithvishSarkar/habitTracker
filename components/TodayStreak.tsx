import { TodayStreakCard } from "./TodayStreakCard.tsx";
import { FaPlus } from "react-icons/fa";
import "../src/tailwind.css";
import { useState, SetStateAction, Dispatch } from "react";

type DisplayInfoType = {
  displayInfo: {
    title: string;
    detail: string;
    isDone: boolean;
    count: number;
  }[];
  updateDisplayInfo: Dispatch<
    SetStateAction<
      {
        title: string;
        detail: string;
        isDone: boolean;
        count: number;
      }[]
    >
  >;
};

function TodayStreak({ displayInfo, updateDisplayInfo }: DisplayInfoType) {
  const [habitTitle, setHabitTitle] = useState<string>("");
  const [habitDetail, setHabitDetail] = useState<string>("");

  const handleUpdateDisplayInfo = () => {
    updateDisplayInfo((previousArray) => {
      return [
        {
          title: habitTitle,
          detail: habitDetail,
          isDone: false,
          count: 0,
          clicks: 0,
        },
        ...previousArray,
      ];
    });
    setHabitTitle("");
    setHabitDetail("");
  };
  const handleClick = (i: number) => {
    updateDisplayInfo((previousArray) =>
      previousArray.map((ele, index) =>
        i === index
          ? { ...ele, isDone: !ele.isDone }
          : ele
      )
    );
    updateDisplayInfo((previousArray) =>
      previousArray.map((ele, index) => {
        if (i === index) {
          return ele.isDone
            ? { ...ele, count: ele.count + 1 }
            : { ...ele, count: ele.count - 1 };
        }
        return ele;
      })
    );
  };

  return (
    <section className="p-2 mt-24 md:mt-16 flex flex-col items-center justify-between gap-4">
      <section className="flex flex-col items-center justify-center min-w-full">
        <span
          className="flex flex-row gap-2 items-center justify-center 
          bg-indigo-200 border-2 border-b-0 border-indigo-500 rounded-t-lg 
          text-indigo-500 text-xl font-mono px-2 py-1"
        >
          <FaPlus /> Habit Title
        </span>
        <input
          type="text"
          name="habit-title"
          placeholder="Book Reading"
          value={habitTitle}
          onChange={(e) => setHabitTitle(e.target.value)}
          required={true}
          className="min-w-full grow border-2 border-indigo-500
        outline-0 font-mono text-lg text-emerald-600 selection:bg-amber-200"
        />
      </section>
      <section className="flex flex-col items-center justify-center min-w-full">
        <span
          className="flex flex-row gap-2 items-center justify-center 
          bg-indigo-200 border-2 border-b-0 border-indigo-500 rounded-t-lg 
          text-indigo-500 text-xl font-mono px-2 py-1"
        >
          <FaPlus /> Habit Detail
        </span>
        <input
          type="text"
          name="habit-detail"
          placeholder="Read 1 book per day"
          value={habitDetail}
          onChange={(e) => setHabitDetail(e.target.value)}
          required={true}
          className="min-w-full grow border-2 border-indigo-500
        outline-0 font-mono text-lg text-emerald-600 selection:bg-amber-200"
        />
      </section>
      <button
        onClick={handleUpdateDisplayInfo}
        className="px-2 py-1 flex flex-row gap-2 items-center justify-center 
        border-none rounded-md bg-indigo-500 text-lg text-white font-bold font-sans"
      >
        <FaPlus />
        <p>Add Habit</p>
      </button>
      <ul
        className="flex flex-col gap-2 items-center justify-center 
      md:flex-row md:items-stretch md:flex-wrap"
      >
        {displayInfo.map(
          (cardInfo: { title: string; detail: string }, index: number) => (
            <li key={index} className="max-w-[90%] md:max-w-[30%]">
              <TodayStreakCard
                isDone={displayInfo[index].isDone}
                habitTitle={cardInfo.title}
                habitDetail={cardInfo.detail}
                onClick={() => handleClick(index)}
              />
            </li>
          )
        )}
      </ul>
    </section>
  );
}
export { TodayStreak };
