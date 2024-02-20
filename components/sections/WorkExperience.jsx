import Image from "next/legacy/image";
import Link from "next/link";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import classes from "@/styles/sections/WorkExperience.module.scss";

const WorkExperience = ({experiences}) => {
	return (
		<section id="work-experience" className={classes.WorkExperienceSection}>
			<h2>Work Experience</h2>

			{experiences && experiences.length ? experiences.map(el => (
				<div key={el.companyName} className={`${classes.MainSections}`}>
					<div className={classes.CompanyDetails}>
						<h4>{el.companyName}</h4>
						<span>{el.dateRange}</span>
					</div>
					<h3>{el.role}</h3>
					<p>{el.description}</p>
					{el.achievements && el.achievements.length ? <ul className={classes.RolesList}>
						{el.achievements.map(achievement => (
							<li key={achievement.title.split(" ").join("")}>
								<button>{achievement.title}</button>
								<p>{achievement.description}</p>
							</li>
						))}
					</ul> : <></>}

					{el.images && el.images.length ? 
						<Swiper
							className={classes.RoleImages}
							loop
							modules={[Autoplay, Pagination]}
							pagination={{dynamicBullets: true, el: `.${el.id}-pagination`}}
							autoplay={{
								delay: 5000,
								pauseOnMouseEnter: true,
								disableOnInteraction: false
							}}>
								{
									el.images.map(image => (
										<SwiperSlide key={image}>
											<div>
												<button>
													<Image src={`/screenshots/${image}`} width={486} height={315} alt={image} />
												</button>
											</div>
										</SwiperSlide>
									))
								}
						</Swiper>
						: <></>}

					<div className={classes.RolesImagesPagination}>
						<div className={`${el.id}-pagination`}></div>	
					</div>

					{el.buttons && el.buttons.length ? <div className={classes.RoleButtons}>
						{
							el.buttons.map(button => (
								<Link target="_blank" key={button.link} href={button.link}>{button.label}</Link>
							))
						}
					</div> : <></>}
				</div>
			))  : <></>}


		</section>
	);
};

export default WorkExperience;
