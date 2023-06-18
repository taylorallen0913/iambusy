import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How do I create an event?",
    answer:
      "To create an event, click the ‘Create Event’ button on the homepage, set a name, date range, and then share the generated link with your participants.",
  },
  {
    question: "Can I integrate the app with my calendar?",
    answer:
      "Yes, our app supports integration with major calendar platforms. Go to settings and choose ‘Integrate Calendar’ to connect your preferred calendar.",
  },
  {
    question: "How do participants indicate their availability?",
    answer:
      "Participants can indicate their availability by clicking on the shared event link and selecting the dates and times that work for them.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely, data security is our top priority. We employ encryption and follow best practices to ensure that your data is secure and private.",
  },
  {
    question: "Can I edit or delete an event after creating it?",
    answer:
      "Yes, you can edit or delete an event by going to your dashboard, selecting the event, and choosing the edit or delete option.",
  },
  {
    question: "Do participants need an account to join an event?",
    answer:
      "No, participants do not need to create an account. They can join an event and select their availability directly through the shared link.",
  },
  {
    question: "What happens if there is a conflict in availability?",
    answer:
      "The app will visually highlight the conflicting times, and as an event creator, you can decide on the best course of action or suggest alternative times.",
  },
];

export const FAQ: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-4xl divide-y divide-white/10">
        <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Frequently Asked Questions
        </h2>
        {/* <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
          Frequently asked questions
        </h2> */}
        <dl className="mt-10 space-y-6 divide-y divide-white/10">
          {faqs.map((faq) => (
            <Disclosure as="div" key={faq.question} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                      <span className="text-base font-medium leading-7">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusSmallIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusSmallIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-300">
                      {faq.answer}
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  );
};
