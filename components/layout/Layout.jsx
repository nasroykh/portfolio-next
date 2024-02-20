import { useEffect, useState } from "react"
import { Nova_Square, League_Spartan } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import classes from "@/styles/layout/Layout.module.scss";

const novaSquare = Nova_Square({subsets: ["latin"], weight: ["400"], variable: "--font-nova"});
const leagueSpartan = League_Spartan({subsets: ["latin"], variable: "--font-league"});

const Layout = (props) => {

  const [isNavbarOpened, setIsNavbarOpened] = useState(false);

  return (
    <div className={`${classes.Layout} ${novaSquare.variable} ${leagueSpartan.variable}`}>
      <div onClick={() => setIsNavbarOpened(false)} className={`${classes.Backdrop} ${isNavbarOpened ? classes.BackdropVisible : ""}`}></div>

      <Header isNavbarOpened={isNavbarOpened} setIsNavbarOpened={setIsNavbarOpened} />

      <main className={classes.Main}>
        {props.children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout