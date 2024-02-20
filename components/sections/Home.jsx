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

const Home = () => {
  return (
    <section className={classes.HomeSection}>
      <div className={classes.MainText}>
        <span>
          Hey, 👋🏻
        </span>
        <span>
          Great to meet you!
        </span>
        <h1>
          <div>
            I&apos;m<strong> Nas </strong>,
          </div>
          <div>
            a seasoned <strong>Software Developer</strong> with the expertise to guide your journey to excellence through elegant and effective lines of code.
          </div>
        </h1>
      </div>

      <div className={classes.SwipeButton}>
        <button onClick={swipeClickHandler}>
          <Icon id="arrow-long" />
        </button>
      </div>

      <div className={classes.BackgroundImage}>
        <Image src="/logo.svg" width={1850} height={1950} alt="Personal Logo" />
      </div>
    </section>
  )
}

export default Home;