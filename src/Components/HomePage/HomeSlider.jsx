import Image from "next/image";
import React, { useRef } from "react";
import Carousel from "react-elastic-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dynamic from "next/dynamic";
const Test = dynamic(() => import("../Test/Test"), { ssr: false });

const HomeSlider = (props) => {
  const itemsPerPage = 1;
  const carouselRef = useRef(null);
  const totalPages = Math.ceil(props?.HomePageSlider?.length / itemsPerPage);
  let resetTimeout;

  return (
    <>
      <Test />
      <section className="slider-section">
        <Carousel
          key={12}
          onNextEnd={({ index }) => {
            clearTimeout(resetTimeout);
            if (index + 1 === totalPages) {
              resetTimeout = setTimeout(() => {
                carouselRef?.current?.goTo(0);
              }, 3000); // same time
            }
          }}
          showArrows={false}
          ref={carouselRef}
          enableAutoPlay={true}
          enableSwipe={false}
          enableMouseSwipe={false}
          duration={3000}
          autoPlaySpeed={5000}
          itemsToShow={itemsPerPage}
          style={{ padding: 0, margin: 0 }}
        >
          {props?.HomePageSlider?.map((item, index) => (
            <Image
              key={index}
              src={item.slider_image}
              alt={item.slider_image}
              height={400}
              width={800}
              quality={100}
              style={{ width: "100%", height: "auto" }}
            />
          ))}
        </Carousel>
      </section>
    </>
  );
};

export default HomeSlider;
