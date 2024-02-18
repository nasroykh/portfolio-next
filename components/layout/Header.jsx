import Image from "next/legacy/image";
import Link from "next/link";

import classes from "@/styles/layout/Header.module.scss";

const Header = (props) => {

  const navbarToggleHandler = (e) => {
    e.preventDefault();

    props.setIsNavbarOpened(!props.isNavbarOpened);
  }

  return (
    <header className={classes.HeaderContainer}>
      <div className={classes.HeaderBackdrop}></div>
      <div className={classes.Header}>
        <Link href="/" className={classes.Logo}>
          <Image src="/logo.svg" width={185} height={195} alt="Personal Logo" />
        </Link>
        <nav className={`${classes.Navbar} ${props.isNavbarOpened ? classes.NavbarOpened : ""}`}>
          <Link href="#">About</Link>
          <Link href="#">Work</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Resume</Link>
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