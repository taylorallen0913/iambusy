import Image from "next/image";

export const Stats: React.FC = () => {
  const stats = [
    { id: 1, name: "Users on the Platform", value: "25,000+" },
    { id: 2, name: "Events Created", value: "150,000+" },
    { id: 3, name: "Team Satisfaction Rate", value: "98%" },
    { id: 4, name: "Time Saved in Scheduling", value: "500,000+ Hours" },
  ];

  return (
    <div className="mx-auto max-w-7xl to-indigo-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-blue-400 to-sky-500 bg-clip-text text-transparent">
                teams worldwide.
              </span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              The prime choice for teams to effortlessly coordinate events and
              streamline schedules.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <Image
              className="col-span-2 max-h-12 w-full fill-white object-contain lg:col-span-1"
              src="https://companieslogo.com/img/orig/META_BIG.D-db66a9c7.png?t=1654568366"
              alt="Meta"
              width={158}
              height={48}
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://companieslogo.com/img/orig/DASH_BIG.D-7adcd866.png?t=1648911998"
              alt="DoorDash"
              width={158}
              height={48}
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://companieslogo.com/img/orig/IBM.D-343f6e3f.png?t=1669436923"
              alt="IBM"
              width={158}
              height={48}
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://companieslogo.com/img/orig/AAPL.D-149adf35.png?t=1632720960"
              alt="Apple"
              width={158}
              height={48}
            />
            <Image
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://companieslogo.com/img/orig/TEAM_BIG.D-e226f95c.png?t=1683437134"
              alt="Atlassian"
              width={158}
              height={48}
            />
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-300">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
