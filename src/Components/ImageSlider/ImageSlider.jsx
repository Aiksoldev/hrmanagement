import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const ImageSlider = ({ productPhotosurl, imageData }) => {
  console.log(productPhotosurl, imageData);
  return (
    <Carousel showIndicators={false} showStatus={false} showArrows={false}>
      {imageData?.map((data, i) => {
        return (
          <div key={i}>
            <img
              src={`${productPhotosurl}${data}`}
              alt={""}
              style={{ width: "100%", maxWidth: "450px", height: "100%" }}
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImageSlider;
