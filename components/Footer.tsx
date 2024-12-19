import "../src/tailwind.css";
import { FaHeart } from "react-icons/fa6";

function Footer() {
  return (
    <div className="border-t border-t-rose-500 bg-rose-200 text-red-500 text-sm
    flex flex-row items-center justify-center gap-2 p-1">
      <p className="text-neutral-800 font-semibold">Made with </p>
      <FaHeart />
      <p className="text-neutral-800 font-semibold"> by Prithvish Sarkar</p>
    </div>
  );
}

export { Footer };