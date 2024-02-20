import Image from "next/legacy/image";
import Link from "next/link";

import classes from "@/styles/layout/Header.module.scss";

const Header = (props) => {

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

    let bodyRect = document.body.getBoundingClientRect();

    let elementRect = document.querySelector(`#${name}`).getBoundingClientRect();

    let scrollPosition = elementRect.top - bodyRect.top - 120;

    scroll({top: scrollPosition})
    
    props.setIsNavbarOpened(false);
  }

  return (
    <header className={classes.HeaderContainer}>
      <div className={classes.HeaderBackdrop}></div>
      <div className={classes.Header}>
        <Link href="/" className={classes.Logo}>
          <Image src="/logo.svg" width={185} height={195} alt="Personal Logo" />
        </Link>
        <nav className={`${classes.Navbar} ${props.isNavbarOpened ? classes.NavbarOpened : ""}`}>
          <Link onClick={headerLinkClickHandler} name="about-me" href="#">About</Link>
          <Link onClick={headerLinkClickHandler} name="work-experience" href="#">Work</Link>
          <Link onClick={headerLinkClickHandler} name="contact" href="#">Contact</Link>
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