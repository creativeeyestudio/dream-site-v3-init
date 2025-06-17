"use client";

import { BlockProps } from "@/interfaces/page";
import Text from "../panels/Text";
import TextIntro from "../panels/TextIntro";
import TextImage from "../panels/TextImage";
import TextDoubleImage from "../panels/TextDoubleImage";
import Parallax from "../panels/Parallax";
import Heroscreen from "../panels/Heroscreen";
import HtmlContent from "../panels/HtmlContent";

interface ContentPageItemsProps {
  blocks: BlockProps[];
}

const ContentPageItems: React.FC<ContentPageItemsProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const isFirst = index === 0;

        switch (block.blockType) {
          case "text":
            return (
              <Text
                title={block.title}
                html={block.html}
                first_block={isFirst}
                key={index}
              />
            );
          case "text-intro":
            return (
              <TextIntro
                title={block.title}
                html={block.html}
                first_block={isFirst}
                key={index}
              />
            );
          case "text-image":
            return (
              <TextImage
                title={block.title}
                html={block.html}
                image={block.image}
                first_block={isFirst}
                key={index}
              />
            );
          case "text-double-image":
            return (
              <TextDoubleImage
                title={block.title}
                html={block.html}
                image1={block.image1}
                image2={block.image2}
                first_block={isFirst}
                key={index}
              />
            );
          case "parallax":
            return (
              <Parallax
                parallax_image={block.parallax_image}
                parallax_speed={block.parallax_speed}
                key={index}
              />
            );
          case "heroscreen":
            return <Heroscreen hero_image={block.hero_image} key={index} />;
          case "html-content":
            return <HtmlContent content={block.content} key={index} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default ContentPageItems;
