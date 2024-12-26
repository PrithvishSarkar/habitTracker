import { SetStateAction, useState, Dispatch, FormEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import "../src/tailwind.css";

// Defining the type of Streak Card elements
type StreakCardType = {
  title: string;
  detail: string;
  isDone: boolean;
  count: number;
  date: string;
};

// Defining Prop Type of Edit Modal
type EditModalPropType = {
  index: number;
  updateStreakCardInfo: Dispatch<SetStateAction<StreakCardType[]>>;
  updateShowEditModal: Dispatch<
    SetStateAction<{ show: boolean; index: number }>
  >;
};

// This Modal is displayed when the user clicks on 'Edit' button icon
// index -> refers to the 'index' of a particular Streak Card
// updateStreakCardInfo -> same as 'setTodayStreakCardInfo'
// updateShowEditModal -> Updates 'showEditModal' -> {show: boolean, index: number}
function EditModal({
  index,
  updateStreakCardInfo,
  updateShowEditModal,
}: EditModalPropType) {
  const [habitTitle, setHabitTitle] = useState("");
  const [habitDetail, setHabitDetail] = useState("");

  // This function runs when the user clicks on 'Add Habit' button in Edit Modal
  // This function updates 'todayStreakCardInfo' Array
  // This function then closes the Edit Modal
  const handleUpdateDisplayInfo = (e: FormEvent) => {
    e.preventDefault();
    updateStreakCardInfo((previousValue) =>
      previousValue.map((value, ind) => {
        if (ind === index)
          return { ...value, title: habitTitle, detail: habitDetail };
        return value;
      })
    );
    updateShowEditModal({ show: false, index: -1 });
  };
  return (
    <section className="fixed min-w-full min-h-[100vh] bg-transparent backdrop-blur-md z-10">
      <form
        className="absolute min-w-[90%] md:min-w-[50%] top-[50%] left-[50%]
        translate-x-[-50%] translate-y-[-50%] 
        bg-neutral-100 border border-neutral-900 rounded-2xl
        flex flex-col items-stretch justify-between gap-2 px-2 py-4"
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
        <section className="flex flex-row items-center justify-between mt-8">
          <button
            type="submit"
            className="px-2 py-1 flex flex-row gap-2 items-center justify-center 
            border-none rounded-md bg-emerald-800 text-lg text-white font-bold font-sans"
          >
            <FaPlus />
            <p>Add Habit</p>
          </button>
          <button
            type="button"
            onClick={() => updateShowEditModal({ show: false, index: -1 })}
            className="px-2 py-1 flex flex-row gap-2 items-center justify-center
            border-none rounded-md bg-rose-800 text-lg text-white font-bold font-sans"
          >
            <ImCross />
            <p>Close</p>
          </button>
        </section>
      </form>
    </section>
  );
}

export { EditModal };
