import { type NextPage } from "next";
import Head from "next/head";
import { Features } from "~/components/Features";
import { Footer } from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { Stats } from "~/components/Stats";
import { Hero } from "~/components/Hero";

const LandingPage: NextPage = () => {
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
      <nav>
        <Navbar />
      </nav>
      <main className="bg-gradient-radial from-slate-900 to-indigo-950">
        <Hero />
        <Features />
        <Stats />
        <Footer />
      </main>
    </>
  );
};

export default LandingPage;
