import { TextIntroProps } from "@/interfaces/blocks";

const TextIntro: React.FC<TextIntroProps> = ({ title, html, first_block }) => {
  const TitleTag = first_block ? "h1" : "h2";

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
