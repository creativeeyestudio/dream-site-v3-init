import { TextIntroProps } from "@/interfaces/blocks";
import React from "react";

const TextIntro: React.FC<TextIntroProps> = ({ title, html, firstBlock }) => {
  const TitleTag = firstBlock ? "h1" : "h2";

  return (
    <section className="text-intro">
      <TitleTag className="text-intro__title">{title}</TitleTag>
      <div
        className="text-intro__text"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </section>
  );
};

export default TextIntro;
