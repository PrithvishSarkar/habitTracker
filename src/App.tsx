import "./tailwind.css";
import { useState, useEffect, useRef } from "react";
import { NavigationBar } from "../components/NavigationBar.tsx";
import { TodayStreak } from "../components/TodayStreak.tsx";
import { TotalStreak } from "../components/TotalStreak.tsx";
import { Footer } from "../components/Footer.tsx";
import { AlertModal } from "../components/AlertModal.tsx";
import { DeleteDataModal } from "../components/DeleteDataModal.tsx";

export default function App() {
  const [navigationIndex, setNavigationIndex] = useState<number>(1);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showDeleteDataModal, setShowDeleteDataModal] = useState(false);

  const lastUsedDate = useRef<string>(
    (() => {
      const storedDate = window.localStorage.getItem("last-used-date");
      return storedDate ? storedDate : new Date().toDateString();
    })()
  );

  type StreakCardType = {
    title: string;
    detail: string;
    isDone: boolean;
    count: number;
    date: string;
  };

  const tempStreakCardInfo = [
    {
      title: "Early Bird",
      detail: "I will wake up daily at 5AM starting today",
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
    {
      title: "Play Guitar",
      detail: "I will practice playing Guitar for 1 hour daily",
      isDone: false,
      count: 0,
      date: new Date().toDateString(),
    },
  ];

  const [todayStreakCardInfo, setTodayStreakCardInfo] = useState<
    StreakCardType[]
  >(() => {
    const localStorageData = window.localStorage.getItem("habit-info");
    return localStorageData ? JSON.parse(localStorageData) : tempStreakCardInfo;
  });

  useEffect(() => {
    window.localStorage.setItem(
      "habit-info",
      JSON.stringify(todayStreakCardInfo)
    );
  }, [todayStreakCardInfo]);

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
