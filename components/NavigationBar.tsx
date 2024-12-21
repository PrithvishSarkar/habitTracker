import { GiBiceps } from "react-icons/gi";
import "../src/tailwind.css";
import { Dispatch, SetStateAction } from "react";

// Defining the Prop Type of 'NavigationBar' Component
type PropType = {
  updateNavigationIndex: Dispatch<SetStateAction<number>>;
  updateShowDeleteDataModal: Dispatch<SetStateAction<boolean>>;
};

// This is a fixed Navigation Bar at the very top of the App
// updateNavigationIndex -> Number State Variable -> Updates the navigation index
// updateShowDeleteDataModal -> Boolean State Variable -> Updates the value to 'true'
function NavigationBar({
  updateNavigationIndex,
  updateShowDeleteDataModal,
}: PropType) {
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
      <span
        className="flex flex-row items-center justify-center 
      text-sm md:text-base mt-2 md:mt-0"
      >
        <button
          onClick={() => updateNavigationIndex(1)}
          className="grow px-2 border-r-2 border-amber-500 ouline-0
          cursor-pointer text-white font-serif italic"
        >
          Today's Streak
        </button>
        <button
          onClick={() => updateNavigationIndex(2)}
          className="grow px-2 border-r-2 border-amber-500 outline-0
          cursor-pointer text-white font-serif italic"
        >
          Total Streak
        </button>
        <button
          onClick={() => updateShowDeleteDataModal(true)}
          className="grow px-2 outline-0
          cursor-pointer text-white font-serif italic"
        >
          Delete All
        </button>
      </span>
    </nav>
  );
}
export { NavigationBar };
