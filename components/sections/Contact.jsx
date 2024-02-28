import classes from "@/styles/sections/Contact.module.scss";
import Link from "next/link";
import Icon from "../assets/Icon";

const Contact = () => {
	return (
		<section id="contact" className={classes.ContactSection}>
			<h2 data-aos="fade">Contact</h2>

			<div className={classes.Main} data-aos="fade-up">
				<p>
					Thank you for exploring my portfolio! If you&apos;re interested in collaborating on a project, 
					discussing the latest tech trends, or exploring opportunities, I&apos;d love to hear from you.
				</p>
				<p>
					Feel free to drop me an email or connect with me on LinkedIn for a more interactive experience.
				</p>
				<p>
					Eager to create excellence alongside you!
				</p>

				<div className={classes.Buttons}>
					<Link href="mailto:nascodes@protonmail.com">
						<div>
							<Icon id="email" width={100} height={100} />
						</div>
						<span>Send an email</span>
					</Link>

				<ul>
					<li>
						<Link target="_blank" href="https://www.linkedin.com/in/nasreddine-yakhou/">
							<div>
								<Icon id="linkedin" width={100} height={100} />
							</div>
						</Link>
					</li>
					<li>
						<Link target="_blank" href="https://github.com/nasroykh">
							<div>
								<Icon id="github" width={100} height={100} />
							</div>
						</Link>
					</li>
					<li>
						<Link target="_blank" href="https://drive.google.com/file/d/1POCOdDZNcvyBkBKWWUaOyuBff8nD6FbV/view">
							<div>
								<Icon id="resume" width={100} height={100} />
							</div>
						</Link>
					</li>
					<li>
						<Link target="_blank" href="https://www.instagram.com/nascodes/">
							<div>
								<Icon id="instagram" width={100} height={100} />
							</div>
						</Link>
					</li>
					<li>
						<Link target="_blank" href="https://www.facebook.com/nascodes/">
							<div>
								<Icon id="facebook" width={100} height={100} />
							</div>
						</Link>
					</li>
				</ul>

				</div>

			</div>
		</section>
	);
};

export default Contact;
