import { GiBiceps } from "react-icons/gi";
import "../src/tailwind.css";
import { Dispatch, SetStateAction } from "react";

type PropType = {
  updateNavigationIndex: Dispatch<SetStateAction<number>>
}
function NavigationBar({updateNavigationIndex}: PropType) {
  return (
    <nav
      className="p-2 min-w-full fixed top-0
    flex flex-col items-stretch justify-between md:flex-row md:items-center
    navigation-bar-background-image"
    >
      <span
        className="flex flex-row gap-2 items-center justify-center
      navigation-bar-logo-background-image navigation-bar-logo-border md:border-none"
      >
        <span className="text-transparent font-extrabold font-serif text-2xl">
          Power of Habits
        </span>
        <span className="text-2xl text-amber-400 md:text-amber-200">
          <GiBiceps />
        </span>
      </span>
      <span className="mt-2 md:mt-0 flex flex-row items-stretch justify-stretch">
        <button
          onClick={() => updateNavigationIndex(1)}
          className="grow px-4 border-r border-solid ouline-0
        navigation-bar-button-border cursor-pointer text-white font-serif italic"
        >
          Today's Streak
        </button>
        <button
          onClick={() => updateNavigationIndex(2)}
          className="grow px-4 border-l border-solid outline-0
        navigation-bar-button-border cursor-pointer text-white font-serif italic"
        >
          Total Streak
        </button>
      </span>
    </nav>
  );
}
export { NavigationBar };
