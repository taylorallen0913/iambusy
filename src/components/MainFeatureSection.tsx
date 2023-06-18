import {
  ShareIcon,
  EyeIcon,
  CalendarIcon,
  BellAlertIcon,
  ClockIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    name: "Effortless Event Creation",
    description:
      "Create events in seconds with our intuitive user interface. Just name your event, select the date range, and you're all set!",
    icon: CalendarIcon,
  },
  {
    name: "Share with Ease",
    description:
      "Invite your friends, family, or colleagues to your event with a simple shareable link. No account necessary for them to select their availability.",
    icon: ShareIcon,
  },
  {
    name: "Visual Availability",
    description:
      "Get an at-a-glance view of the group's availability with our visually rich calendar. Easily spot the best time slots where everyone can make it.",
    icon: EyeIcon,
  },
  {
    name: "Smart Notifications",
    description:
      "Stay informed without being overwhelmed. Receive smart notifications about updates to your events and your friends' availability.",
    icon: BellAlertIcon,
  },
  {
    name: "Customizable Time Slots",
    description:
      "Tailor your event’s time slots to suit your needs. Choose from various time increments and even set custom availability times for special occasions.",
    icon: ClockIcon,
  },
  {
    name: "Seamless Synchronization",
    description:
      "Sync your events with popular calendar apps. With seamless integration, never worry about double booking or missing an event again.",
    icon: ComputerDesktopIcon,
  },
];

export const MainFeatureSection: React.FC = () => {
  return (
    <div className="py-6 sm:py-8">
      <div className="relative overflow-hidden pt-16">
        <motion.div
          transition={{ duration: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto max-w-7xl px-6 lg:px-8"
        >
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/iambusy-48815.appspot.com/o/app-screenshot.png?alt=media&token=dcfaa4a0-1227-4449-ba7c-e4ab18502116"
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
            width={2432}
            height={1442}
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]" />
          </div>
        </motion.div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
