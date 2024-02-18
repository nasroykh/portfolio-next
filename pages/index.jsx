import Head from "next/head";
import { Nova_Square } from "next/font/google";
import classes from "@/styles/Home.module.scss";
import Typewriter from "typewriter-effect";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";

const novaSquare = Nova_Square({subsets: ["latin"], weight: ["400"]});

export default function Home() {

  const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLogoVisible(true)
    }, 2500);
  }, [])

  return (
    <>
      <Head>
        <title>Nas</title>
        <meta name="description" content="Nas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${classes.Main} ${novaSquare.className}`}>

        <div className={`${classes.Logo} ${isLogoVisible ? classes.LogoVisible : ""}`}>
          <Image src="/logo.svg" height={195} width={185} />
        </div>

        <h1>
          <span>Coming soon...</span>
          <div className={classes.MainText}>
            <Typewriter options={{ autoStart: true, delay: 200, strings: "Coming soon...", cursor: null}} />
          </div>
          <div className={classes.MainTextShadow}>
            <Typewriter options={{autoStart: true, delay: 200, strings: "Coming soon...", cursor: null}} />
          </div>
        </h1>

      </main>
    </>
  );
}
