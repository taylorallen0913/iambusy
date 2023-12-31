import { useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const {
    mutate: subscribeToNewsletter,
    isLoading: isSubscribingToNewsletter,
  } = api.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success("Thank you for signing up for the newsletter!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(
          "Failed to subscribe to newsletter! Please try again later."
        );
        console.log(errorMessage[0]);
      } else {
        toast.error(
          "Failed to subscribe to newsletter! Please try again later."
        );
      }
    },
  });

  const onSubscribeToNewsletter = (e: FormEvent) => {
    e.preventDefault();
    subscribeToNewsletter({ email });
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get{" "}
            <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
              notified
            </span>{" "}
            when we&apos;re launching.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
            Be the first to experience a scheduling revolution. Sign up for
            early access perks and features.
          </p>
          <form
            onSubmit={(e) => onSubscribeToNewsletter(e)}
            className="mx-auto mt-10 flex max-w-md gap-x-4"
          >
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              disabled={isSubscribingToNewsletter}
              type="submit"
              className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Notify me
            </button>
          </form>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient
                id="759c1415-0410-454c-8f7c-9a820de03641"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#4645a3" />
                <stop offset={1} stopColor="#4645a3" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};
