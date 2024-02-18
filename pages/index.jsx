import Head from "next/head";
import classes from "@/styles/Index.module.scss";
import Home from "@/components/sections/Home";
import AboutMe from "@/components/sections/AboutMe";
import WorkExperience from "@/components/sections/WorkExperience";
import Contact from "@/components/sections/Contact";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";

export default function Index() {

  return (
    <>
      <Head>
        <title>Nas - Software Developer</title>
        <meta name="description" content="I'm Nas, a seasoned Software Developer with the expertise to guide your journey to excellence through elegant and effective lines of code." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>

        <Home />
        <AboutMe />
        <WorkExperience />
        <Contact />

      </Layout>
    </>
  );
}
