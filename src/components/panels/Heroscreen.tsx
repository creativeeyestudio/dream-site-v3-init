import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { HeroscreenProps } from "@/interfaces/blocks";

const Heroscreen: React.FC<HeroscreenProps> = (content: HeroscreenProps) => {
  return content.hero_image.length > 1 ? (
    <Swiper
      effect="fade"
      centeredSlides={true}
      pagination={{ dynamicBullets: true }}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Pagination, Autoplay]}
      className="heroscreen"
    >
      {content.hero_image.map((image, index) =>
        process.env.NEXT_PUBLIC_API_URL != undefined ? (
          <SwiperSlide key={index} className="heroscreen__container">
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + image.url}
              alt={image.alt ?? ""}
              fill={true}
              objectFit="cover"
              priority={true}
            />
          </SwiperSlide>
        ) : (
          <></>
        ),
      )}
    </Swiper>
  ) : process.env.NEXT_PUBLIC_API_URL != undefined ? (
    <div className="heroscreen__container">
      <Image
        src={process.env.NEXT_PUBLIC_API_URL + content.hero_image[0].url}
        alt={content.hero_image[0].alt ?? "Pas de text alt"}
        fill={true}
        objectFit="cover"
        priority={true}
      />
    </div>
  ) : (
    <></>
  );
};

export default Heroscreen;
