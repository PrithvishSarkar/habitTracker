import "./tailwind.css";
import { useState, useEffect, useRef } from "react";
import { NavigationBar } from "../components/NavigationBar.tsx";
import { TodayStreak } from "../components/TodayStreak.tsx";
import { TotalStreak } from "../components/TotalStreak.tsx";

export default function App() {
  const [navigationIndex, setNavigationIndex] = useState<number>(1);
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
  };

  const [todayStreakCardInfo, setTodayStreakCardInfo] = useState<
    StreakCardType[]
  >(() => {
    const localStorageData = window.localStorage.getItem("habit-info");
    return localStorageData ? JSON.parse(localStorageData) : [];
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
    <div>
      <NavigationBar updateNavigationIndex={setNavigationIndex} />
      {navigationIndex === 1 ? (
        <TodayStreak
          displayInfo={todayStreakCardInfo}
          updateDisplayInfo={setTodayStreakCardInfo}
        />
      ) : (
        <TotalStreak displayStreak={todayStreakCardInfo} />
      )}
    </div>
  );
}
