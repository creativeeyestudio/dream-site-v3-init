import Image from "next/image";
import React from "react";
import { TextDoubleImageProps } from "@/interfaces/blocks";

const TextDoubleImage: React.FC<TextDoubleImageProps> = ({
  title,
  html,
  image1,
  image2,
  first_block,
}) => {
  const TitleTag = first_block ? "h1" : "h2";

  return process.env.NEXT_PUBLIC_API_URL != undefined ? (
    <section className="text-double-img">
      <div className="text-double-img__content">
        <TitleTag className="text-double-img__title">{title}</TitleTag>
        <div
          className="text-double-img__text"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>

      <figure className="text-double-img__image--1">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + image1.url}
          width={image1.width}
          height={image1.height}
          alt={image1.alt ?? ""}
        />
      </figure>

      {image2 != undefined ? (
        <figure className="text-double-img__image--2">
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + image2.url}
            width={image2.width}
            height={image2.height}
            alt={image2.alt ?? ""}
          />
        </figure>
      ) : (
        <></>
      )}
    </section>
  ) : (
    <></>
  );
};

export default TextDoubleImage;
