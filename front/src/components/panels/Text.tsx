import { TextProps } from "@/interfaces/blocks";
import React from "react";

const Text: React.FC<TextProps> = ({ title, html, firstBlock }) => {
  const TitleTag = firstBlock ? "h1" : "h2";

  return (
    <section className="text">
      <TitleTag className="text__title">{title}</TitleTag>
      <div
        className="text__text"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </section>
  );
};

export default Text;
