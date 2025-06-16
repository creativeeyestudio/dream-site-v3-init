import { ImageDataProps } from "./image";

export interface SeoProps {
  meta_title: string;
  meta_desc: string;
  og_title?: string;
  og_desc?: string;
  social_image?: ImageDataProps;
  twitter_title?: string;
  twitter_desc?: string;
  twitter_image?: ImageDataProps;
}
