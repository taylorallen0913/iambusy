import Image from "next/image";

export const Integrations: React.FC = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Seamlessly Sync With Your Favorite Tools
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Elevate your scheduling experience by integrating your
              pre-existing calendars and essential work tools. Our app ensures a
              harmonious flow between platforms, streamlining your planning
              processes for heightened efficiency and convenience.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-xl grid-cols-3 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            <Image
              className="max-h-12 w-full object-contain object-left"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/2048px-Google_Calendar_icon_%282020%29.svg.png"
              alt="Google Calendar"
              width={105}
              height={48}
            />
            <Image
              className="max-h-12 w-full object-contain object-left"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/2491px-Google_Meet_icon_%282020%29.svg.png"
              alt="Google Meet"
              width={104}
              height={48}
            />
            <Image
              className="max-h-12 w-full object-contain object-left"
              src="https://static.vecteezy.com/system/resources/previews/012/871/376/non_2x/zoom-logo-in-blue-colors-meetings-app-logotype-illustration-free-png.png"
              alt="Zoom"
              width={140}
              height={48}
            />
            <Image
              className="max-h-12 w-full object-contain object-left"
              src="https://www.wabash.edu/images2/technology/canvas.png"
              alt="Canvas"
              width={180}
              height={70}
            />
            <Image
              className="max-h-12 w-full object-contain object-left"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/2203px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
              alt="Microsoft Teams"
              width={158}
              height={48}
            />
            <Image
              className="max-h-12 w-full object-contain object-left"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"
              alt="Gmail"
              width={147}
              height={48}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
