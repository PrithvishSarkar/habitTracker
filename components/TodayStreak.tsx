import { TodayStreakCard } from "./TodayStreakCard.tsx";
import { FaPlus } from "react-icons/fa";
import "../src/tailwind.css";
import { useState, SetStateAction, Dispatch, FormEvent } from "react";

// Defining the Prop Type of 'TodayStreak' Component
type DisplayInfoType = {
  displayInfo: {
    title: string;
    detail: string;
    isDone: boolean;
    count: number;
    date: string;
  }[];
  updateDisplayInfo: Dispatch<
    SetStateAction<
      {
        title: string;
        detail: string;
        isDone: boolean;
        count: number;
        date: string;
      }[]
    >
  >;
  updateShowAlertModal: Dispatch<SetStateAction<boolean>>;
};

function TodayStreak({
  displayInfo,
  updateDisplayInfo,
  updateShowAlertModal,
}: DisplayInfoType) {
  // The 'habitTitle' contains the value of Habit Title Input
  const [habitTitle, setHabitTitle] = useState<string>("");

  // The 'habitDetail' contains the value of Habit Description Input
  const [habitDetail, setHabitDetail] = useState<string>("");

  // This function runs the user clicks on 'Add Habit' button
  // This function adds a new habit in the Habit Info Array
  const handleUpdateDisplayInfo = (e: FormEvent) => {
    e.preventDefault();
    if (habitTitle.trim() === "" || habitDetail.trim() === "") {
      updateShowAlertModal(true);
      setTimeout(() => {
        updateShowAlertModal(false);
        setHabitTitle("");
        setHabitDetail("");
      }, 3000);
    } else {
      updateDisplayInfo((previousArray) => [
        {
          title: habitTitle,
          detail: habitDetail,
          isDone: false,
          count: 0,
          date: new Date().toDateString(),
        },
        ...previousArray,
      ]);
      setHabitTitle("");
      setHabitDetail("");
    }
  };

  // This function runs when the user clicks on the 'Toggle Task Done' button
  // This function first updates whether the task is done or not
  // This function secondly updates the 'count' which is the number of streak
  const handleClick = (i: number) => {
    updateDisplayInfo((previousArray) =>
      previousArray.map((ele, index) =>
        i === index ? { ...ele, isDone: !ele.isDone } : ele
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
    <section data-type="today-streak-wrapper" className="p-2 mt-24 md:mt-16">
      <form
        className="flex flex-col items-stretch justify-between gap-4 mb-4"
        onSubmit={handleUpdateDisplayInfo}
      >
        <section className="flex flex-col items-center justify-center">
          <span
            className="flex flex-row gap-2 items-center justify-center 
          bg-emerald-200 border-2 border-b-0 border-emerald-500 rounded-t-lg 
          text-emerald-500 text-xl font-mono px-2 py-1"
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
            className="px-2 min-w-full border-2 border-emerald-500 rounded-md
            outline-0 font-mono text-lg text-indigo-600 selection:bg-amber-200"
          />
        </section>
        <section className="flex flex-col items-center justify-center">
          <span
            className="flex flex-row gap-2 items-center justify-center 
          bg-emerald-200 border-2 border-b-0 border-emerald-500 rounded-t-lg 
          text-emerald-500 text-xl font-mono px-2 py-1"
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
            className="px-2 min-w-full border-2 border-emerald-500 rounded-md
            outline-0 font-mono text-lg text-indigo-600 selection:bg-amber-200"
          />
        </section>
        <button
          type="submit"
          className="self-center px-2 py-1 flex flex-row gap-2 items-center justify-center 
          border-none rounded-md bg-emerald-800 text-lg text-white font-bold font-sans"
        >
          <FaPlus />
          <p>Add Habit</p>
        </button>
      </form>
      <ul
        className="flex flex-col gap-2 items-stretch justify-center 
        md:flex-row md:flex-wrap"
      >
        {displayInfo.map(
          (
            cardInfo: {
              title: string;
              detail: string;
              isDone: boolean;
              date: string;
            },
            index: number
          ) => (
            <li
              key={index}
              className="max-w-full md:max-w-[40%] lg:max-w-[30%]"
            >
              <TodayStreakCard
                date={cardInfo.date}
                isDone={cardInfo.isDone}
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
