import {
  HeroscreenProps,
  HTMLContentProps,
  ParallaxProps,
  TextDoubleImageProps,
  TextImageProps,
  TextIntroProps,
  TextProps,
} from "./blocks";

export type BlockProps =
  | TextProps
  | TextIntroProps
  | TextImageProps
  | TextDoubleImageProps
  | ParallaxProps
  | HeroscreenProps
  | HTMLContentProps;

export interface PageProps {
  docs: PageDoc[];
}

export interface PageDoc {
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  content: {
    layout: BlockProps[];
  };
  config: {
    homepage: boolean;
  };
  meta: {
    title: string;
    description: string;
  };
}
