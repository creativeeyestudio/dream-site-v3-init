import { GalleryProps } from '@/interfaces/blocks';
import Image from 'next/image';

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    return (
        <div className="gallery">
            {images.map((image, index: number) => (
                process.env.NEXT_PUBLIC_API_TOKEN != undefined 
                ? <figure key={index} className="gallery_thumb">
                    <Image 
                        src={process.env.NEXT_PUBLIC_API_TOKEN + image.url } 
                        alt={image.alternativeText ?? `Galerie Image ${index + 1}`}
                        fill={true}
                        style={{objectFit: 'cover', objectPosition: 'center'}}
                    />
                </figure> : <></>
                
            ))}
        </div>
    )
}

export default Gallery