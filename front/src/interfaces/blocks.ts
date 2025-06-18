import { ImageDataProps } from "./image";

// CONTENT
// --------------------------------
export interface HTMLContentProps {
  blockType?: "html-content";
  content: string;
}

// PAGES
// --------------------------------
export interface TextProps {
  blockType?: "text";
  title: string;
  html: string;
  first_block: boolean;
}

export interface TextIntroProps {
  blockType?: "text-intro";
  title: string;
  html: string;
  first_block: boolean;
}

export interface TextImageProps {
  blockType?: "text-image";
  title: string;
  html: string;
  image: ImageDataProps;
  first_block: boolean;
}

export interface TextDoubleImageProps {
  blockType?: "text-double-image";
  title: string;
  html: string;
  image1: ImageDataProps;
  image2?: ImageDataProps;
  first_block: boolean;
}

export interface HeroscreenProps {
  blockType?: "heroscreen";
  hero_image: ImageDataProps[];
}

export interface ParallaxProps {
  blockType?: "parallax";
  parallax_image: ImageDataProps;
  parallax_speed: number;
}
