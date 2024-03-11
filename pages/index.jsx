import Head from "next/head";
import Home from "@/components/sections/Home";
import AboutMe from "@/components/sections/AboutMe";
import WorkExperience from "@/components/sections/WorkExperience";
import Contact from "@/components/sections/Contact";
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import AOS from "aos";
import Script from "next/script";

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
        <title>Nas - Software Engineer</title>
        <meta name="description" content="I'm Nas, a seasoned Software Engineer with the expertise to guide your journey to excellence through elegant and effective lines of code." />
        <link rel="canonical" href="https://nas.codes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Nas - Software Engineer" />
        <meta property="og:description" content="I'm Nas, a seasoned Software Engineer with the expertise to guide your journey to excellence through elegant and effective lines of code." />
        <meta name="twitter:title" content="Nas - Software Engineer" />
        <meta name="twitter:description" content="I'm Nas, a seasoned Software Engineer with the expertise to guide your journey to excellence through elegant and effective lines of code." />
      </Head>

      <Script id="item-jsonld-general" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: `{"@context" : "http://schema.org",
                  "@type" : "Organization",  
                  "name" : "Nas",
                  "url" : "https://nas.codes", 
                  "logo": "https://nas.codes/logo-square.png"}`}}>
      </Script>

      <Layout >

        <Home isPageReady={isPageReady} />
        <AboutMe skills={skills} />
        <WorkExperience experiences={experiences} />
        <Contact />

      </Layout>
    </>
  );
}
