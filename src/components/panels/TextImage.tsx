import { TextImageProps } from '@/interfaces/blocks';
import Image from 'next/image';

const TextImage: React.FC<TextImageProps> = ({ title, text, image, first_block }) => {
	const TitleTag = first_block ? 'h1' : 'h2';

	return (
        process.env.NEXT_PUBLIC_API_URL ? <section className='text-img'>
            <div className='text-img__content'>
                <TitleTag className="text-img__title">{ title }</TitleTag>
                <div className="text-img__text" dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
            
            <figure className="text-img__image">
                <Image
                    src={process.env.NEXT_PUBLIC_API_URL + image.url}
                    width={image.width}
                    height={image.height}
                    alt={image.alternativeText ?? ""} />
            </figure>
        </section> : <></>
    );
}

export default TextImage;