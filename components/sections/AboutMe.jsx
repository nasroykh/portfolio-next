import Image from "next/legacy/image";
import Icon from "@/components/assets/Icon";
import classes from "@/styles/sections/AboutMe.module.scss"

import {EffectFade, Autoplay} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

const AboutMe = ({skills}) => {
	return (
		<section id="about-me" className={classes.AboutMeSection}>
			<div className={classes.Main}>
				<div className={classes.MainText} data-aos="fade-right" data-aos-delay="5000">
					<h2>About me</h2>
					<p>My name is <strong>Nasreddine</strong>, though I prefer to go by <strong>Nas</strong>. </p>
					<p>
						With <strong>four years</strong> of dedicated experience as a <strong>Software Engineer</strong>, 
						I&apos;ve cultivated a <strong>passion</strong> for coding and thrive on solving intricate problems.
					</p>
					<p>
						My enthusiasm for <strong>continuous learning</strong> drives me to explore diverse domains, 
						constantly expanding my knowledge base. 
						I am deeply committed to staying at the forefront of <strong>technology trends and advancements</strong>.
					</p>
				</div>
				<div className={classes.MainImageContainer} data-aos="fade-left">
					<Swiper
						loop
						effect={"fade"}
						modules={[EffectFade, Autoplay]}
						autoplay={{
							delay: 4000,
							pauseOnMouseEnter: true,
							disableOnInteraction: false
						}}>
						<SwiperSlide>
							<div className={classes.MainImage}>
								<Image src="/pictures/picture-1.jpg" width={800} height={800} alt="Nas - First Picture" />
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={classes.MainImage}>
								<Image src="/pictures/picture-2.jpg" width={800} height={800} alt="Nas - Second Picture" />
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={classes.MainImage}>
								<Image src="/pictures/picture-3.jpg" width={800} height={800} alt="Nas - Third Picture" />
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={classes.MainImage}>
								<Image src="/pictures/picture-4.jpg" width={800} height={800} alt="Nas - Fourth Picture" />
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={classes.MainImage}>
								<Image src="/pictures/picture-5.jpg" width={800} height={800} alt="Nas - Fifth Picture" />
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={classes.MainImage}>
								<Image src="/pictures/picture-6.jpg" width={800} height={800} alt="Nas - Sixth Picture" />
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>

			<div className={classes.Skills}>
				<div className={classes.SkillsFront} data-aos="fade-right">
					<h3>Front End</h3>
					<ul>
						{
							skills.frontEnd.map(el => (
								<li key={el.id}>
									<div className={classes.SkillCard}>
										<div>
											<Icon id={el.id} width={100} height={100} />
										</div>
									</div>
									<h4>{el.title}</h4>
								</li>
							))
						}
					</ul>
				</div>
				<div className={classes.SkillsBack} data-aos="fade-left">
					<h3>Back End</h3>
					<ul>
						{
							skills.backEnd.map(el => (
								<li key={el.id}>
									<div className={classes.SkillCard}>
										<div>
											<Icon id={el.id} width={100} height={100} />
										</div>
									</div>
									<h4>{el.title}</h4>
								</li>
							))
						}
					</ul>
				</div>
				<div className={classes.SkillsTools} data-aos="fade-up">
					<h3>Tools & Technologies</h3>
					<ul>
						{
							skills.toolsAndTechnologies.map(el => (
								<li key={el.id}>
									<div className={classes.SkillCard}>
										<div>
											<Icon id={el.id} width={100} height={100} />
										</div>
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
