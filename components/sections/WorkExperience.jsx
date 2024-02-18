import Image from "next/legacy/image";
import Link from "next/link";

const TECHIVATION_ROLES = [
	{
		title: "Designed and Implemented Robust API & Database",
		description: ""
	},
	{
		title: "Innovative A/B Audio Player Development",
		description: ""
	},
	{
		title: "Developed Intuitive Admin & User Dashboards",
		description: ""
	},
	{
		title: "Active Involvement in Decision-Making",
		description: ""
	},
	{
		title: "Optimized website SEO and Performance",
		description: ""
	},
	{
		title: "Effective Team Management and Leadership",
		description: ""
	},
	{
		title: "Integrated Payment Gateways for Seamless Transactions",
		description: ""
	},
	{
		title: "Contributed to Page Design and Aesthetics",
		description: ""
	},
	{
		title: "Managed VPS and Nginx for Efficient Hosting",
		description: ""
	},
	{
		title: "Integrated Multiple Tracking Solutions",
		description: ""
	}
]

const SOLIDERSOUND_ROLES = [
	{
		title: "Led the Development of an eCommerce Website and System",
		description: ""
	},
	{
		title: "Effectively Managed and Led Development Teams",
		description: ""
	},
	{
		title: "Provided Input in Decision-Making Processes",
		description: ""
	},
	{
		title: "Architected and Implemented API & Database",
		description: ""
	},
	{
		title: "Implemented strategic SEO enhancements and performance optimizations",
		description: ""
	},
	{
		title: "Successfully integrated and configured Stripe and PayPal payment processing",
		description: ""
	},
]

const BRENCO_ROLES = [
	{
		title: "Collaborated with Cross-Functional Teams on Diverse Projects",
		description: ""
	},
	{
		title: "Managed IoT API Infrastructure for Seamless Integration",
		description: ""
	},
	{
		title: "Transformed Websites into React-Based Interactive Platforms",
		description: ""
	},
	{
		title: "Developed and Deployed Server Monitoring Systems",
		description: ""
	},
	{
		title: "Partnered with Incubated Startups to Create Bespoke Websites",
		description: ""
	},
	{
		title: "Contributed to Developers Recruitment and Onboarding",
		description: ""
	},
]

const FREELANCING_ROLES = [
	{
		title: "Contributed to Freelance Projects, Delivering Tailored Solutions",
		description: ""
	},
	{
		title: "Studied and practiced making Shopify themes.",
		description: ""
	},
	{
		title: "Refined Front-End Development skills through personal projects.",
		description: ""
	},
	{
		title: "Architected a React Chat Application",
		description: ""
	},
	{
		title: "Crafted an Employees Management Software as part of Computer Science School Thesis",
		description: ""
	},
	{
		title: "Engineered a Patient Management Software for a Local Medical Center",
		description: ""
	},
]

const WorkExperience = () => {
	return (
		<section>
			<h2>Work Experience</h2>

			<div>
				<div>
					<h4>Techivation Ltd</h4>
					<span>September 2021 - December 2023</span>
				</div>
				<h3>IT Specialist & Lead Developer</h3>
				<p>
					As a Lead Developer, I navigated a challenging and thrilling journey, 
					guiding the creation and perfection of both the website and API for a UK-based 
					company eCommerce platform specializing in the sale of audio software products.
				</p>
				<ul>
					{TECHIVATION_ROLES.map(el => (
						<li key={el.title.split(" ").join("")}>
							<button>{el.title}</button>
							<p>{el.description}</p>
						</li>
					))}
				</ul>
				<ul>
					<li>
						<button>
							<Image src="/screenshots/techivation-1.png" width={1610/2} height={904/2} alt="Screenshot 1" />
						</button>
					</li>
				</ul>
				<div>
					<Link href="/">Visit website</Link>
				</div>
			</div>
			<div>
				<div>
					<h4>SoliderSound Ltd</h4>
					<span>April 2023 - December 2023</span>
				</div>
				<h3>Lead Developer</h3>
				<p>
					Played a key role in the development and administration of 
					an eCommerce website for a company focused on audio plugins development.
				</p>
				<ul>
					{SOLIDERSOUND_ROLES.map(el => (
						<li key={el.title.split(" ").join("")}>
							<button>{el.title}</button>
							<p>{el.description}</p>
						</li>
					))}
				</ul>
				<ul>
					<li>
						<button>
							<Image src="/screenshots/techivation-1.png" width={1610/2} height={904/2} alt="Screenshot 1" />
						</button>
					</li>
				</ul>
				<div>
					<Link href="/">Visit website</Link>
				</div>
			</div>
			<div>
				<div>
					<h4>BRENCO Engineering & Consulting</h4>
					<span>August 2021 - February 2022</span>
				</div>
				<h3>Full Stack Developer</h3>
				<p>
					In my initial role as a Full-time Full Stack Developer within a prominent tech company, 
					I took on the challenge of overseeing multiple projects concurrently, 
					collaborating closely with a skilled team of managers, designers and developers.
				</p>
				<ul>
					{BRENCO_ROLES.map(el => (
						<li key={el.title.split(" ").join("")}>
							<button>{el.title}</button>
							<p>{el.description}</p>
						</li>
					))}
				</ul>
			</div>
			<div>
				<div>
					<h4>Freelancing / Personal Projects</h4>
					<span>Before August 2021</span>
				</div>
				<h3>Freelance Web Developer</h3>
				<p>
					During an intensive 8-month period, I actively applied the range of technologies 
					I had learned to a variety of projects. These included both personal endeavors 
					and freelance work, offering me practical experience in real-world settings
				</p>
				<ul>
					{FREELANCING_ROLES.map(el => (
						<li key={el.title.split(" ").join("")}>
							<button>{el.title}</button>
							<p>{el.description}</p>
						</li>
					))}
				</ul>
				<ul>
					<li>
						<button>
							<Image src="/screenshots/techivation-1.png" width={1610/2} height={904/2} alt="Screenshot 1" />
						</button>
					</li>
				</ul>
				<div>
					<Link href="/">Visit old portfolio</Link>
				</div>
			</div>
		</section>
	);
};

export default WorkExperience;
