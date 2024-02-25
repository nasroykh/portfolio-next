import Image from "next/legacy/image";
import Link from "next/link";

import classes from "@/styles/layout/Header.module.scss";
import { useEffect, useState } from "react";

const scrollToSpecificPosition = (id) => {
  let bodyRect = document.body.getBoundingClientRect();

  let elementRect = document.querySelector(`#${id}`).getBoundingClientRect();

  let scrollPosition = elementRect.top - bodyRect.top - 120;

  scroll({top: scrollPosition})
}

const Header = (props) => {

  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window) {
      window.addEventListener("scroll", () => {
        setIsHeaderShrunk(window.scrollY > 150)
      })
    }
  }, [])

  const navbarToggleHandler = (e) => {
    e.preventDefault();

    props.setIsNavbarOpened(!props.isNavbarOpened);
  }

  const headerLinkClickHandler = (e) => {
    let {name} = e.target;

    if (!name) {
      props.setIsNavbarOpened(false);
      return;
    }

    e.preventDefault();

    scrollToSpecificPosition(name)
    
    props.setIsNavbarOpened(false);
  }

  return (
    <header className={`${classes.HeaderContainer} ${isHeaderShrunk ? classes.HeaderContainerShrunk : ""}`}>
      <div className={classes.HeaderBackdrop}></div>
      <div className={classes.Header}>
        <Link href="/" className={classes.Logo}>
          <Image src="/logo.png" width={185} height={195} alt="Personal Logo" />
        </Link>
        <nav className={`${classes.Navbar} ${props.isNavbarOpened ? classes.NavbarOpened : ""}`}>
          <Link onClick={headerLinkClickHandler} name="about-me" href="#about-me">About</Link>
          <Link onClick={headerLinkClickHandler} name="work-experience" href="#work-experience">Work</Link>
          <Link onClick={headerLinkClickHandler} name="contact" href="#contact">Contact</Link>
          <Link onClick={headerLinkClickHandler} href="#">Resume</Link>
        </nav>
        <button onClick={navbarToggleHandler} className={`${classes.MenuButton} ${props.isNavbarOpened ? classes.MenuButtonOpened : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header;