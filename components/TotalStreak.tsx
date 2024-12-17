import "../src/tailwind.css";
import { useEffect, useState } from "react";
import { BsDashLg } from "react-icons/bs";
import { TotalStreakCard } from "../components/TotalStreakCard.tsx";

function Loading() {
  return (
    <div className="min-w-12 min-h-12 rounded-[50%] border-4 animate-spin-wheel"></div>
  );
}

type DisplayStreakType = {
  displayStreak: {
    title: string;
    detail: string;
    isDone: boolean;
    count: number;
  }[];
};

function TotalStreak({ displayStreak }: DisplayStreakType) {
  type Quote = {
    q: string;
    a: string;
  };
  let [quotes, setQuotes] = useState<Quote[]>([]);
  useEffect(() => {
    setTimeout(async () => {
      try {
        const quotesJson = await fetch("public/quotes.json");
        const quotesList: Quote[] = await quotesJson.json();
        setQuotes(quotesList);
      } catch (err: any) {
        console.log("Error: ", err);
      }
    }, 1000);
  }, []);
  const index = Math.floor(Math.random() * 50);
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
            {quotes[index].q}
          </span>
          <span className="flex flex-row gap-2 items-center justify-end">
            <BsDashLg />
            {quotes[index].a}
          </span>
        </p>
      )}
      <ul
        className="flex flex-col gap-2 items-center justify-center 
      md:flex-row md:items-stretch md:flex-wrap"
      >
        {displayStreak.map((element, index) => (
          <li key={index} className="max-w-[90%] md:max-w-[30%]">
            <TotalStreakCard
              title={element.title}
              detail={element.detail}
              count={element.count}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
export { TotalStreak };
