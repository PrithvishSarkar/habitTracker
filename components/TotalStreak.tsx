import "../src/tailwind.css";
import { useEffect, useState } from "react";
import { BsDashLg } from "react-icons/bs";
import { TotalStreakCard } from "../components/TotalStreakCard.tsx";

// This gives the user an illusion of Data Fetching
// The Spin Loader is displayed until the Quotes is completely fetched
function Loading() {
  return (
    <div className="min-w-12 min-h-12 rounded-[50%] border-4 animate-spin-wheel"></div>
  );
}

// Defining the Prop Type of 'TotalStreak' Component
type DisplayStreakType = {
  displayStreak: {
    date: string;
    title: string;
    detail: string;
    isDone: boolean;
    count: number;
  }[];
};

// This component mounts when the user clicks on 'Total Streak'
// It has all the Habits and its corresponding Streak Count
function TotalStreak({ displayStreak }: DisplayStreakType) {

  // Defining the type of Quotes element
  type Quote = {
    q: string;
    a: string;
  };

  // The 'quotes' Array contains all the Quotes to be displayed to the user
  let [quotes, setQuotes] = useState<Quote[]>([]);

  // A Side Effect runs on every mounting which fetches quotes data
  // The data is fetched after 1 second to display the Spin Loader (Intentional Delay)
  useEffect(() => {
    setTimeout(async () => {
      try {
        const quotesJson = await fetch("/habitTracker/quotes.json");
        const quotesList: Quote[] = await quotesJson.json();
        setQuotes(quotesList);
      } catch (err: any) {
        console.log("Error: ", err);
      }
    }, 1000);
  }, []);

  // This generates random numbers from 0 to 49 -> Indexes of Quotes Array
  const quotesArrayIndex = Math.floor(Math.random() * 50);
  
  return (
    <section className="p-2 mt-24 md:mt-16 flex flex-col gap-8 items-center justify-between">
      {quotes.length === 0 ? (
        <Loading />
      ) : (
        <p
          className="border-none rounded-t-lg p-2
      bg-emerald-200 text-emerald-500 flex flex-col gap-4 items-stretch justify-between"
        >
          <span className="text-xl font-serif font-semibold">
            {quotes[quotesArrayIndex].q}
          </span>
          <span className="flex flex-row gap-2 items-center justify-end">
            <BsDashLg />
            {quotes[quotesArrayIndex].a}
          </span>
        </p>
      )}

      <ul
        className="flex flex-col gap-2 items-stretch justify-center 
      md:flex-row md:flex-wrap"
      >
        {displayStreak.map(
          (
            element: {
              date: string;
              title: string;
              detail: string;
              count: number;
            },
            index: number
          ) => (
            <li
              key={index}
              className="max-w-full md:max-w-[40%] lg:max-w-[30%]"
            >
              <TotalStreakCard
                date={element.date}
                title={element.title}
                detail={element.detail}
                count={element.count}
              />
            </li>
          )
        )}
      </ul>
    </section>
  );
}
export { TotalStreak };
