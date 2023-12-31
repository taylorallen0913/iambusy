import Link from "next/link";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center space-y-7 pt-48">
        <motion.h1
          transition={{ duration: 0.6 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl text-center text-6xl font-bold text-white md:text-8xl"
        >
          Simplify the way you{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Schedule
          </span>{" "}
          Meetings.
        </motion.h1>
        <motion.h1
          transition={{ duration: 0.6 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl px-6 text-center text-sm font-light text-gray-300 md:px-0 md:text-xl"
        >
          Say goodbye to the back-and-forth of scheduling. With our
          user-friendly interface, coordinating meetings is simpler and faster
          than ever.
        </motion.h1>
      </div>
      <motion.div
        transition={{ duration: 1.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center pt-10"
      >
        <Link
          href="/dashboard"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get Started
        </Link>
      </motion.div>
    </>
  );
};
