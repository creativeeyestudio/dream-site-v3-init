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

export interface PageContent {
  layout: BlockProps[];
}

export interface PageContentProps {
  readonly createdAt: string | Date;
  readonly updatedAt: string | Date;
  readonly title: string;
  readonly slug: string;
  readonly content: PageContent;
  readonly config: {
    /** 0 = Brouillon, 1 = A relire, 2 = Publié */
    published: 0 | 1 | 2;
    homepage: boolean;
  };
  readonly meta: {
    title: string;
    description: string;
  };
  readonly id: string;
}
