import { type NextPage } from "next";
import Head from "next/head";
import { MainFeatureSection } from "~/components/MainFeatureSection";
import { Footer } from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { Stats } from "~/components/Stats";
import { Hero } from "~/components/Hero";
// import { FeatureSection1 } from "~/components/FeatureSection1";
import { Newsletter } from "~/components/Newsletter";
import { FAQ } from "~/components/FAQ";
import { Integrations } from "~/components/Integrations";

const LandingPage: NextPage = () => {
  return (
    <div className="bg-gradient-radial from-slate-900 to-indigo-950">
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
      <main>
        <Hero />
        <MainFeatureSection />
        <Stats />
        {/* <FeatureSection1 /> */}
        <Newsletter />
        <Integrations />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
