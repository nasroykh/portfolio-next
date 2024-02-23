import classes from "@/styles/layout/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.FooterContainer}>
      <div className={classes.Footer}>
        <p>Designed & crafted with passion by me {"😁"}</p>
        <p>© 2024 Nas</p>
      </div>
    </footer>
  )
}

export default Footer;