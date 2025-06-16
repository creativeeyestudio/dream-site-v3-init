import { HTMLContentProps } from "@/interfaces/blocks";
import React from "react";

const HtmlContent: React.FC<HTMLContentProps> = (block: HTMLContentProps) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: block.content }}></div>
    </>
  );
};

export default HtmlContent;
