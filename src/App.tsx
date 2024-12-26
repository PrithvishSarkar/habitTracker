import "./tailwind.css";
import { useState, useEffect, useRef } from "react";
import { NavigationBar } from "../components/NavigationBar.tsx";
import { TodayStreak } from "../components/TodayStreak.tsx";
import { TotalStreak } from "../components/TotalStreak.tsx";
import { Footer } from "../components/Footer.tsx";
import { AlertModal } from "../components/AlertModal.tsx";
import { DeleteDataModal } from "../components/DeleteDataModal.tsx";
import { EditModal } from "../components/EditModal.tsx";

export default function App() {
  // The 'navigationIndex' refers to the page we are in
  // navigationIndex = 1 means 'Today Streak' page
  // navigationIndex = 2 means 'Total Streak' page
  // The default value is '1' which is 'Today Streak' page
  const [navigationIndex, setNavigationIndex] = useState<number>(1);

  // The 'showAlertModal' is set to 'false' by default
  // It shows the Alert Modal when the user enters blank Habit Title or Detail
  const [showAlertModal, setShowAlertModal] = useState(false);

  // The 'showDeleteDataModal' is set to 'false' by default
  // It shows the Delete Data Modal when the user clicks on 'Delete All' on Navigation Bar
  const [showDeleteDataModal, setShowDeleteDataModal] = useState(false);

  // It either shows or hides the 'Edit Modal'
  // The 'showEditModal' is set to 'false' by default
  // The 'index' refers to the index of 'todayStreakCardInfo' Array element
  const [showEditModal, setShowEditModal] = useState({ show: false, index: -1 });

  // This stores the date when the App was last used
  const lastUsedDate = useRef<string>(
    (() => {
      const storedDate = window.localStorage.getItem("last-used-date");
      return storedDate ? storedDate : new Date().toDateString();
    })()
  );

  // Defining the type of Array elements
  type StreakCardType = {
    title: string;
    detail: string;
    isDone: boolean;
    count: number;
    date: string;
  };

  // This is a default Card Information
  const tempStreakCardInfo = [
    {
      title: "Early Bird",
      detail: "I will wake up daily at 5AM starting today",
      isDone: false,
      count: 0,
      date: new Date().toDateString(),
    },
    {
      title: "Zen Meditation",
      detail: "I will practice guided meditation for at least 10 minutes daily",
      isDone: false,
      count: 0,
      date: new Date().toDateString(),
    },
    {
      title: "Weight Loss",
      detail:
        "I will hit the Gym 4 times a week for at least 3 months straight",
      isDone: false,
      count: 0,
      date: new Date().toDateString(),
    },
  ];

  // The 'todayStreakCardInfo' contains the information of user's habits
  const [todayStreakCardInfo, setTodayStreakCardInfo] = useState<
    StreakCardType[]
  >(() => {
    const localStorageData = window.localStorage.getItem("habit-info");
    return localStorageData ? JSON.parse(localStorageData) : tempStreakCardInfo;
  });

  // A Side Effect runs to update the Local Storage stored value
  // The Local Storage contains user's habits
  useEffect(() => {
    window.localStorage.setItem(
      "habit-info",
      JSON.stringify(todayStreakCardInfo)
    );
  }, [todayStreakCardInfo]);

  // A Side Effect runs to store last used date
  // This Side Effect mainly initializes the 'done or not' mark on each day
  // On the next day, all the 'checked marks' becomes 'unchecked' for a fresh start
  useEffect(() => {
    const handleDateStorage = () => {
      window.localStorage.setItem("last-used-date", new Date().toDateString());
    };
    window.addEventListener("beforeunload", handleDateStorage);

    const updateTodayStreakCardInfo = () => {
      setTodayStreakCardInfo((previousArray) =>
        previousArray.map((ele) => ({ ...ele, isDone: false }))
      );
    };

    if (lastUsedDate.current !== new Date().toDateString()) {
      updateTodayStreakCardInfo();
    }

    const getMilliseconds = () => {
      const now = new Date();
      const then = new Date();
      then.setDate(now.getDate() + 1);
      then.setHours(0, 0, 0, 0);
      return then.getTime() - now.getTime();
    };

    const delay = getMilliseconds();

    const timer = setTimeout(() => {
      updateTodayStreakCardInfo();

      const intervalID = setInterval(
        updateTodayStreakCardInfo,
        24 * 3600 * 1000
      );

      return () => clearInterval(intervalID);
    }, delay);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleDateStorage);
    };
  }, []);

  return (
    <section data-type="wrapper">
      {showAlertModal && <AlertModal />}
      {showDeleteDataModal && (
        <DeleteDataModal updateShowDeleteDataModal={setShowDeleteDataModal} />
      )}
      {showEditModal.show && (
        <EditModal
          index={showEditModal.index}
          updateStreakCardInfo={setTodayStreakCardInfo}
          updateShowEditModal={setShowEditModal}
        />
      )}
      <section className="flex flex-col items-stretch justify-between gap-1 min-h-[100vh]">
        <div className="grow">
          <NavigationBar
            updateNavigationIndex={setNavigationIndex}
            updateShowDeleteDataModal={setShowDeleteDataModal}
          />
          {navigationIndex === 1 ? (
            <TodayStreak
              displayInfo={todayStreakCardInfo}
              updateDisplayInfo={setTodayStreakCardInfo}
              updateShowAlertModal={setShowAlertModal}
              updateShowEditModal={setShowEditModal}
            />
          ) : (
            <TotalStreak displayStreak={todayStreakCardInfo} />
          )}
        </div>
        <Footer />
      </section>
    </section>
  );
}
