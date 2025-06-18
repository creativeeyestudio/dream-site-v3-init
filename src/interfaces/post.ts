import {
  TextProps,
  TextIntroProps,
  TextImageProps,
  TextDoubleImageProps,
  HeroscreenProps,
  CarouselProps,
  ParallaxProps,
} from "./blocks";
import { SeoProps } from "./seo";

export default interface PostProps {
  id: number;
  title: string;
  intro: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  documentId: string;
  content: (
    | TextProps
    | TextIntroProps
    | TextImageProps
    | TextDoubleImageProps
    | HeroscreenProps
    | CarouselProps
    | ParallaxProps
  )[];
  seo: SeoProps;
}
