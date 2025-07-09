import { TextImageProps } from "@/interfaces/blocks";
import Image from "next/image";
import React from "react";

const TextImage: React.FC<TextImageProps> = ({
  title,
  html,
  image,
  firstBlock,
}) => {
  const TitleTag = firstBlock ? "h1" : "h2";

  return process.env.NEXT_PUBLIC_API_URL ? (
    <section className="text-img">
      <div className="text-img__content">
        <TitleTag className="text-img__title">{title}</TitleTag>
        <div
          className="text-img__text"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>

      <figure className="text-img__image">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + image.url}
          width={image.width}
          height={image.height}
          alt={image.alt ?? ""}
        />
      </figure>
    </section>
  ) : (
    <></>
  );
};

export default TextImage;
