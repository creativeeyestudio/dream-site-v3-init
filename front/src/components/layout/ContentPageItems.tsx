'use client';

import { BlockProps } from "@/interfaces/page"
import Text from "../panels/Text"
import TextIntro from "../panels/TextIntro"
import TextImage from "../panels/TextImage"
import TextDoubleImage from "../panels/TextDoubleImage"
import Parallax from "../panels/Parallax"
import Heroscreen from "../panels/Heroscreen"
import Gallery from "../panels/Gallery"
import HtmlContent from "../panels/HtmlContent"

interface ContentPageItemsProps {
	blocks: BlockProps[]
}

const ContentPageItems: React.FC<ContentPageItemsProps> = ({ blocks }) => {
	if (!blocks || blocks.length === 0) return null;

    return (
		<>
			{blocks.map((block, index) => {
				const isFirst = index === 0

				switch (block.__component) {
					case "page.text":
						return <Text title={block.title} text={block.text} first_block={isFirst} key={index}  />
					case "page.text-intro":
						return <TextIntro title={block.title} text={block.text} first_block={isFirst} key={index} />
					case "page.text-image":
						return <TextImage title={block.title} text={block.text} image={block.image} first_block={isFirst} key={index} />
					case "page.text-double-image":
						return <TextDoubleImage title={block.title} text={block.text} image1={block.image1} image2={block.image2} first_block={isFirst} key={index} />
					case "page.parallax":
						return <Parallax image={block.image} speed={block.speed} key={index} />
					case "page.heroscreen":
						return <Heroscreen images={block.images} key={index} />
					case "common.gallery":
						return <Gallery images={block.images} key={index} />
					case "common.html_content":
						return <HtmlContent content={block.content} key={index} />
					default:
						return null;
				}
			})}
		</>
	)
}

export default ContentPageItems;