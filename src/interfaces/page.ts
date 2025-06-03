import { GalleryProps, HeroscreenProps, HTMLContentProps, ParallaxProps, SeoProps, TextDoubleImageProps, TextImageProps, TextIntroProps, TextProps } from "./blocks"

export type BlockProps =
  TextProps
  | TextIntroProps
  | TextImageProps
  | TextDoubleImageProps
  | ParallaxProps
  | HeroscreenProps
  | GalleryProps
  | HTMLContentProps

export interface PageContentProps {
  id: number
  title: string
  slug: string
  homepage: boolean
  secondary_page: boolean
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  documentId: string
  content_page: BlockProps[]
  seo: SeoProps
  error: string;
}

export default interface PageWebProps {
  page: PageContentProps;
  error: string;
}