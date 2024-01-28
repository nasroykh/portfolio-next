import Head from "next/head";
import { Nova_Square } from "next/font/google";
import Image from "next/legacy/image";
import classes from "@/styles/Home.module.scss";
import Typewriter from "typewriter-effect";
import { useEffect, useRef, useState } from "react";

const novaSquare = Nova_Square({subsets: ["latin"], weight: ["400"]});

export default function Home() {

  const audioPlayerRef = useRef();

  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [hasMusicStarted, setHasMusicStarted] = useState(false)
  const [hasMusicEnded, setHasMusicEnded] = useState(false)
  const [isTextFinished, setIsTextFinished] = useState(false)

  useEffect(() => {
    if (isMusicPlaying) {
      if (hasMusicStarted) {
        audioPlayerRef.current.play();
      } else {
        setTimeout(() => {
          setHasMusicStarted(true);
          audioPlayerRef.current.play();
        }, 1000);
      }
    } else {
      audioPlayerRef.current.pause();
    }
  }, [isMusicPlaying])

  useEffect(() => {
    setTimeout(() => {
      setIsTextFinished(true)
    }, 4000);
  }, [])

  return (
    <>
      <Head>
        <title>Nas</title>
        <meta name="description" content="Nas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${classes.Main} ${novaSquare.className} ${hasMusicStarted ? classes.MainSecondBackground : ""} ${hasMusicEnded ? classes.MainPrimaryBackground : ""}`}>

        <div className={`${classes.Logo} ${hasMusicStarted ? classes.LogoVisible : ""} ${hasMusicEnded ? classes.LogoHidden : ""}`}>
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

        {hasMusicEnded ? 
          <h2 className={classes.SecondaryTextContainer}>
            <span>Kept you waiting, huh?</span>
            <div className={classes.SecondaryText}>
              <Typewriter options={{autoStart: hasMusicEnded, delay: 50, strings: "Kept you waiting, huh?", cursor: null}} />
            </div>
            <div className={classes.SecondaryTextShadow}>
              <Typewriter options={{autoStart: hasMusicEnded, delay: 50, strings: "Kept you waiting, huh?", cursor: null}} />
            </div>
          </h2> : ""}

        <button className={`${classes.PlayButton} ${isTextFinished ? classes.PlayButtonVisible : ""} ${hasMusicEnded ? classes.PlayButtonHidden : ""}`} onClick={() => setIsMusicPlaying(prevState => !prevState)}>
          {
            isMusicPlaying ? 
              <Image src="/pause.svg" height={75} width={75} /> :
              <Image src="/play.svg" height={75} width={75} />
          }
        </button>

        <audio src="/snake_eater.mp3" ref={audioPlayerRef} preload="auto" onEnded={() => {setIsMusicPlaying(false); setHasMusicEnded(true);}}  />
      </main>
    </>
  );
}
