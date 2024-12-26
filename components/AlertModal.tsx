import "../src/tailwind.css";

// This Modal is displayed when the user enters an empty string
// This Modal is invoked in App.tsx for 3 seconds
function AlertModal() {
  return (
    <section className="fixed min-w-full min-h-[100vh] bg-transparent backdrop-blur-md">
      <div
        className="absolute min-w-[90%] md:min-w-[50%] top-[50%] left-[50%]
        translate-x-[-50%] translate-y-[-50%] bg-red-400 border-none rounded-2xl p-4
        text-2xl text-center font-sans font-bold"
      >
        <p className="font-extrabold text-4xl text-gray-800">Warning!!</p>
        <br />
        <p>Habit Title and Habit Detail cannot be empty!</p>
      </div>
    </section>
  );
}

export { AlertModal };
