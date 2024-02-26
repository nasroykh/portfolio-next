import Head from "next/head";
import Home from "@/components/sections/Home";
import AboutMe from "@/components/sections/AboutMe";
import WorkExperience from "@/components/sections/WorkExperience";
import Contact from "@/components/sections/Contact";
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import AOS from "aos";

export const getStaticProps = async (ctx) => {
	const experiences = require("@/public/json/experiences.json");
	const skills = require("@/public/json/skills.json");

	return {
		props: {
			experiences,
      skills
		}
	}
}

export default function Index({experiences, skills}) {

  const [isPageReady, setIsPageReady] = useState(false)
  
  useEffect(() => {
    if (!isPageReady) {
      document.querySelector("html").style.overflowY = "hidden"
      document.querySelector("body").style.overflowY = "hidden"
      
      setTimeout(() => {
        document.querySelector("html").style.overflowY = "auto"
        document.querySelector("body").style.overflowY = "auto"

        AOS.init({
          duration: 1000,
          once: true
        });
  
        setIsPageReady(true);
      }, 3000);
    }
  }, [isPageReady])
  
  return (
    <>
      <Head>
        <title>Nas - Software Developer</title>
        <meta name="description" content="I'm Nas, a seasoned Software Developer with the expertise to guide your journey to excellence through elegant and effective lines of code." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout >

        <Home isPageReady={isPageReady} />
        <AboutMe skills={skills} />
        <WorkExperience experiences={experiences} />
        <Contact />

      </Layout>
    </>
  );
}
