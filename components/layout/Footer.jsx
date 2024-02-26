import classes from "@/styles/layout/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.FooterContainer}>
      <div className={classes.Footer}>
        <p>Designed & Crafted with Passion by Nas {"😁"}</p>
        <p>© 2024 Nas</p>
      </div>
    </footer>
  )
}

export default Footer;