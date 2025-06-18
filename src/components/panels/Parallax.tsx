import Image from "next/image";
import React from "react";
import Ukiyo from "ukiyojs";
import { ParallaxProps } from "@/interfaces/blocks";

const Parallax: React.FC<ParallaxProps> = ({
  parallax_image,
  parallax_speed,
}) => {
  new Ukiyo(".parallax_image", {
    speed: parallax_speed,
  });

  return process.env.NEXT_PUBLIC_API_URL ? (
    <>
      <figure className="parallax">
        <Image
          className="parallax_image"
          src={process.env.NEXT_PUBLIC_API_URL + parallax_image.url}
          alt={parallax_image.alt ?? ""}
          fill={true}
        />
      </figure>
    </>
  ) : (
    <></>
  );
};

export default Parallax;
