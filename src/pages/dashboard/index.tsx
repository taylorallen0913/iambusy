import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Calendar, { type Meeting } from "~/components/Calendar";
import { api } from "~/utils/api";

const DashboardPage: NextPage = () => {
  const router = useRouter();

  const { mutate: createMeetingMutation, isLoading: isCreatingMeetingLoading } =
    api.meeting.create.useMutation({
      onSuccess: async (meeting) => {
        console.log("Successfully created meeting!");
        await router.push(`/dashboard/meeting/${meeting.id}`);
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage && errorMessage[0]) {
          console.log(errorMessage[0]);
        } else {
          console.log("Failed to create meeting! Please try again later.");
        }
      },
    });

  const createMeeting = () => {
    createMeetingMutation({ name: "Test meeting" });
  };

  return (
    <>
      <Head>
        <title>iambusy</title>
        <meta
          name="description"
          content="Simple availabilitiy coordination app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-gradient-radial from-slate-900 to-indigo-950">
        <div className="mx-auto max-w-6xl pt-20">
          <Calendar
            meetings={meetings}
            isAddEventButtonVisible={!isCreatingMeetingLoading}
            onAddEvent={createMeeting}
          />
          <UserButton />
        </div>
      </main>
    </>
  );
};

const meetings: Meeting[] = [
  {
    id: "12345",
    date: "June 17th, 2023",
    time: "5:00 PM",
    datetime: "2023-06-17T17:00",
    name: "Sprint planning 1",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Google Meet",
  },
  {
    id: "54321",
    date: "June 19th, 2023",
    time: "10:00 AM",
    datetime: "2023-06-19T10:00",
    name: "Team Stand-up",
    imageUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    location: "Zoom",
  },
  {
    id: "98765",
    date: "June 22nd, 2023",
    time: "2:30 PM",
    datetime: "2023-06-22T14:30",
    name: "Product Demo",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSebQQ7qVRZJ9F2aNSMHYtqPGlEtEvuK3-O0A&usqp=CAU",
    location: "Microsoft Teams",
  },
  {
    id: "24680",
    date: "June 25th, 2023",
    time: "9:00 AM",
    datetime: "2023-06-25T09:00",
    name: "Client Meeting",
    imageUrl:
      "https://profile-images.xing.com/images/2e10d6106b96a6a7aea85fd5bf4c137c-2/majuraan-kandasamy.256x256.jpg",
    location: "WebEx",
  },
  {
    id: "13579",
    date: "June 28th, 2023",
    time: "4:00 PM",
    datetime: "2023-06-28T16:00",
    name: "Project Review",
    imageUrl:
      "https://storage.googleapis.com/lr-assets/kids/illustrators/1666696008-amanda-quartey-headshot.jpg",
    location: "Google Meet",
  },
];

export default DashboardPage;
