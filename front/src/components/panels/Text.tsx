import { TextProps } from "@/interfaces/blocks";

const Text: React.FC<TextProps> = ({ title, html, first_block }) => {
  const TitleTag = first_block ? "h1" : "h2";

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
