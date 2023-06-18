import {
  CalendarDaysIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

const features = [
  {
    name: "Easy Event Creation",
    description:
      "Quickly create events with an intuitive interface. Name your event, set the date range, and you’re ready to go.",
    icon: CalendarDaysIcon,
  },
  {
    name: "Streamlined Sharing",
    description:
      "Easily share a link with everyone. Participants can select their availability with no account needed.",
    icon: UsersIcon,
  },
  {
    name: "Visual Group Availability",
    description:
      "View everyone’s availability through sleek calendars. Effortlessly make informed decisions on event times.",
    icon: ChartBarIcon,
  },
];

export const FeatureSection1: React.FC = () => {
  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">
                Plan Together, Effortlessly
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Smart Scheduling for Everyone
              </p>
              <p className="mt-6  leading-8 text-gray-300">
                Unite teams and friends effortlessly through our intuitive
                scheduler, boasting a powerful interface with advanced date
                pickers and dynamic calendars for masterful, seamless planning.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
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
          <Image
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
};
