import Icon from "@/components/assets/Icon";
import classes from "@/styles/sections/Home.module.scss";
import Image from "next/legacy/image";

const swipeClickHandler = (e) => {
  e.preventDefault();

  let bodyRect = document.body.getBoundingClientRect();

  let elementRect = document.querySelector(`#about-me`).getBoundingClientRect();

  let scrollPosition = elementRect.top - bodyRect.top - 100;

  scroll({top: scrollPosition}) 
}

const Home = ({isPageReady}) => {
  return (
    <section className={classes.HomeSection}>
      <div className={classes.MainText} data-aos="fade" data-aos-delay={5000}>
        <span>
          Hey, 👋🏻
        </span>
        <span>
          Great to meet you!
        </span>
        <h1>
          <div>
            I&apos;m<strong> Nas</strong>,
          </div>
          <div>
            a seasoned <strong>Software Developer</strong> with the expertise to guide your journey to excellence through elegant and effective lines of code.
          </div>
        </h1>
      </div>

      <div className={classes.SwipeButton}>
        <button onClick={swipeClickHandler} aria-label="Swipe down">
          <Icon id="arrow-long" />
        </button>
      </div>

      <div className={`${isPageReady ? classes.BackgroundImage : classes.LoadingBackgroundImage}`}>
        <div>
          <Image src="/logo.png" width={2000} height={2105} alt="Personal Logo" />
        </div>
      </div>
    </section>
  )
}

export default Home;