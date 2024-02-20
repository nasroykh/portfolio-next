import Image from "next/legacy/image";
import Icon from "@/components/assets/Icon";
import classes from "@/styles/sections/AboutMe.module.scss"

import {EffectFade, Autoplay} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

const FRONT_END_SKILLS = [
	{
		id: "html",
		title: "HTML"
	},
	{
		id: "css",
		title: "CSS"
	},
	{
		id: "javascript",
		title: "JavaScript"
	},
	{
		id: "sass",
		title: "SASS / SCSS"
	},
	{
		id: "react",
		title: "React"
	},
	{
		id: "redux",
		title: "Redux"
	},
	{
		id: "nextjs",
		title: "Next.js"
	},
	{
		id: "tailwindcss",
		title: "Tailwind CSS"
	}
]

const BACK_END_SKILLS = [
	{
		id: "django",
		title: "Django"
	},
	{
		id: "express",
		title: "Express"
	},
	{
		id: "nodejs",
		title: "Node.js"
	},
	{
		id: "prisma",
		title: "Prisma"
	},
	{
		id: "mongodb",
		title: "MongoDB"
	},
	{
		id: "postgresql",
		title: "PostgreSQL"
	}
]

const TOOLS_SKILLS = [
	{
		id: "typescript",
		title: "TypeScript"
	},
	{
		id: "docker",
		title: "Docker"
	},
	{
		id: "github",
		title: "Github"
	},
	{
		id: "linux",
		title: "Linux"
	},
	{
		id: "stripe",
		title: "Stripe"
	},
	{
		id: "electron",
		title: "Electron"
	},
	{
		id: "figma",
		title: "Figma"
	},
	{
		id: "python",
		title: "Python"
	},
	{
		id: "cpp",
		title: "C++"
	},
	{
		id: "jest",
		title: "Jest"
	},
	{
		id: "nginx",
		title: "NGINX"
	},
	{
		id: "paypal",
		title: "PayPal"
	},
	{
		id: "graphql",
		title: "GraphQL"
	},
	{
		id: "aws",
		title: "AWS"
	}
]

const AboutMe = () => {
	return (
		<section id="about-me" className={classes.AboutMeSection}>
			<div className={classes.Main}>
				<div className={classes.MainText}>
					<h2>About me</h2>
					<p>My name is <strong>Nasreddine</strong>, though I prefer to go by <strong>Nas</strong>. </p>
					<p>
						With <strong>four years</strong> of dedicated experience as a <strong>Software Developer</strong>, 
						I&apos;ve cultivated a <strong>passion</strong> for coding and thrive on solving intricate problems.
					</p>
					<p>
						My enthusiasm for <strong>continuous learning</strong> drives me to explore diverse domains, 
						constantly expanding my knowledge base. 
						I am deeply committed to staying at the forefront of <strong>technology trends and advancements</strong>.
					</p>
					<p>
						I am excited about the prospect of contributing my <strong>expertise</strong> to innovative projects, 
						eager to further hone my <strong>skills</strong> in this dynamic and ever-evolving field.
					</p>
				</div>
				<div className={classes.MainImage}>
					<Swiper
						loop
						effect={"fade"}
						modules={[EffectFade, Autoplay]}
						autoplay={{
							delay: 5000,
							pauseOnMouseEnter: true,
							disableOnInteraction: false
						}}>
						<SwiperSlide>
							<Image src="/pictures/picture-1.jpg" width={500} height={500} alt="Nas - First Picture" />
						</SwiperSlide>
						<SwiperSlide>
							<Image src="/pictures/picture-2.jpg" width={500} height={500} alt="Nas - Second Picture" />
						</SwiperSlide>
						<SwiperSlide>
							<Image src="/pictures/picture-3.jpg" width={500} height={500} alt="Nas - Third Picture" />
						</SwiperSlide>
						<SwiperSlide>
							<Image src="/pictures/picture-4.jpg" width={500} height={500} alt="Nas - Fourth Picture" />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>

			<div className={classes.Skills}>
				<div className={classes.SkillsFront}>
					<h3>Front End</h3>
					<ul>
						{
							FRONT_END_SKILLS.map(el => (
								<li key={el.id}>
									<div>
										<Icon id={el.id} width={50} height={50} />
									</div>
									<h4>{el.title}</h4>
								</li>
							))
						}
					</ul>
				</div>
				<div className={classes.SkillsBack}>
					<h3>Back End</h3>
					<ul>
						{
							BACK_END_SKILLS.map(el => (
								<li key={el.id}>
									<div>
										<Icon id={el.id} width={50} height={50} />
									</div>
									<h4>{el.title}</h4>
								</li>
							))
						}
					</ul>
				</div>
				<div className={classes.SkillsTools}>
					<h3>Tools & Technologies</h3>
					<ul>
						{
							TOOLS_SKILLS.map(el => (
								<li key={el.id}>
									<div>
										<Icon id={el.id} width={50} height={50} />
									</div>
									<h4>{el.title}</h4>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default AboutMe;
