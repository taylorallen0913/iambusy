import dynamic from "next/dynamic";

const AvaiabilitySelector = dynamic(() => import("~/components/Availability"), {
  ssr: false,
});

const TestScreen = () => {
  return (
    <div>
      <AvaiabilitySelector />
    </div>
  );
};

export default TestScreen;
