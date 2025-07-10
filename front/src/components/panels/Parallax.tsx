import Image from "next/image";
import React from "react";
import Ukiyo from "ukiyojs";
import { ParallaxProps } from "@/interfaces/blocks";

const Parallax: React.FC<ParallaxProps> = ({
  parallaxImage,
  parallaxSpeed,
}) => {
  new Ukiyo(".parallax_image", {
    speed: parallaxSpeed,
  });

  return process.env.NEXT_PUBLIC_API_URL ? (
    <>
      <figure className="parallax">
        <Image
          className="parallax_image"
          src={process.env.NEXT_PUBLIC_API_URL + parallaxImage.url}
          alt={parallaxImage.alt ?? ""}
          fill={true}
        />
      </figure>
    </>
  ) : (
    <></>
  );
};

export default Parallax;
