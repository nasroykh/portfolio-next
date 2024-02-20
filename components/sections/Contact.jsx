import classes from "@/styles/sections/Contact.module.scss";
import Link from "next/link";
import Icon from "../assets/Icon";

const Contact = () => {
	return (
		<section id="contact" className={classes.ContactSection}>
			<h2>Contact</h2>

			<div className={classes.Main}>
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
						<Icon id="email" width={30} height={30} />
						<span>Send an email</span>
					</Link>

				<ul>
					<li>
						<Link target="_blank" href="https://www.linkedin.com/in/nasreddine-yakhou-4b619a157/">
							<div>
								<Icon id="linkedin" width={40} height={40} />
							</div>
						</Link>
					</li>
					<li>
						<Link target="_blank" href="https://github.com/nasroykh">
							<div>
								<Icon id="github" width={40} height={40} />
							</div>
						</Link>
					</li>
					<li>
						<Link target="_blank" href="#">
							<div>
								<Icon id="resume" width={40} height={40} />
							</div>
						</Link>
					</li>
					<li>
						<Link target="_blank" href="https://www.instagram.com/nascodes/">
							<div>
								<Icon id="instagram" width={40} height={40} />
							</div>
						</Link>
					</li>
					<li>
						<Link target="_blank" href="https://www.facebook.com/nascodes/">
							<div>
								<Icon id="facebook" width={40} height={40} />
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
