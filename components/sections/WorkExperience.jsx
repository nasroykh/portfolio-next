import Image from "next/legacy/image";
import Link from "next/link";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import classes from "@/styles/sections/WorkExperience.module.scss";
import { useState } from "react";

const WorkExperience = ({experiences}) => {

	const [selectedImage, setSelectedImage] = useState("");
	const [expandedElement, setExpandedElement] = useState("");

	return (
		<section id="work-experience" className={classes.WorkExperienceSection}>
			<h2>Work Experience</h2>

			{experiences && experiences.length ? experiences.map((el, index) => (
				<div key={el.companyName} className={`${classes.MainSections}`}>
					<div className={classes.CompanyDetails}>
						<h4>{el.companyName}</h4>
						<span>{el.dateRange}</span>
					</div>
					<h3>{el.role}</h3>
					<p>{el.description}</p>
					{el.achievements && el.achievements.length ? <ul className={classes.RolesList}>
						{el.achievements.map((achievement, achIndex) => (
							<li 
								key={achievement.title.split(" ").join("")} 
								className={expandedElement===`collapsible-${index}-${achIndex}` ? classes.Expanded : ""}>
								<button onClick={() => {setExpandedElement(prevState => !prevState||prevState!==`collapsible-${index}-${achIndex}` ? `collapsible-${index}-${achIndex}` : "")}}>{achievement.title}</button>
								<div>
									<p>{achievement.description}</p>
								</div>
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
												<button onClick={() => {setSelectedImage(image)}}>
													<Image src={`/screenshots/${image}`} width={1458} height={945} alt={image} />
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

			
			<div className={`${classes.ImagePreview} ${selectedImage ? classes.ImagePreviewVisible : ""}`}>
				<div onClick={() => {setSelectedImage("")}}></div>
				{selectedImage ? 
					<button>
						<Image src={`/screenshots/${selectedImage}`} width={1458} height={945} alt={selectedImage} />
					</button>
				: <></>}
			</div>

		</section>
	);
};

export default WorkExperience;
