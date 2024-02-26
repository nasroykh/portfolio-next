import Image from "next/legacy/image";
import Link from "next/link";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import classes from "@/styles/sections/WorkExperience.module.scss";
import { useEffect, useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Icon from "../assets/Icon";

const WorkExperience = ({experiences}) => {

	const [selectedImage, setSelectedImage] = useState("");
	const [expandedElement, setExpandedElement] = useState("");
	const [expandedElementSibling, setExpandedElementSibling] = useState("");
	const { screenWidth } = useWindowDimensions();

	const handleRolesExpand = (e, index, achIndex) => {
		let isEvenElement = achIndex % 2 === 0;
		
		setExpandedElement(prevState => 
			!prevState||prevState!==`collapsible-${index}-${achIndex}` ? 
				`collapsible-${index}-${achIndex}` : "");
			
		setExpandedElementSibling(prevState => 
			!prevState||prevState!==`collapsible-s-${index}-${isEvenElement ? achIndex+1 : achIndex-1}` ? 
				`collapsible-s-${index}-${isEvenElement ? achIndex+1 : achIndex-1}` : "");
	}
	
	return (
		<section id="work-experience" className={classes.WorkExperienceSection}>
			<h2 data-aos="fade">Work Experience</h2>

			{experiences && experiences.length ? experiences.map((el, index) => (
				<div key={el.companyName} className={`${classes.MainSections}`} data-aos={`fade-${index%2===0 ? "left" : "right"}`}>
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
								className={expandedElement===`collapsible-${index}-${achIndex}` ? classes.Expanded : expandedElementSibling===`collapsible-s-${index}-${achIndex}` ? classes.ExpandedSibling : ""}>
								<button onClick={(e) => {handleRolesExpand(e, index, achIndex)}}>
									{achievement.title}
									<span>
										<Icon id="chevron" />
									</span>
								</button>
								<div>
									<p>{achievement.description}</p>
								</div>
							</li>
						))}
					</ul> : <></>}

					{el.images && el.images.length ? 
						<Swiper
							slidesPerView={screenWidth < 576 ? 1 : screenWidth < 768 ? 2 : screenWidth < 1024 ? 3 : 4}
							spaceBetween={screenWidth < 576 ? 5 : screenWidth < 768 ? 10 : 20}
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
					<span>
						<Image src={`/screenshots/${selectedImage}`} width={1458} height={945} alt={selectedImage} />
					</span>
				: <></>}
			</div>

		</section>
	);
};

export default WorkExperience;
