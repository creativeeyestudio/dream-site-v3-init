import { ImageDataProps } from "./image";
import PageContentProps from "./page";
import PostProps from "./post";


// CONTENT
// --------------------------------
export interface LinkProps {
    page?: PageContentProps
    post?: PostProps
    external_link?: string
    medias?: ImageDataProps[]
    label?: string
}

// COMMON
// --------------------------------
export interface SeoProps {
    id: number
    meta_title: string
    meta_desc: string
    og_title?: string
    og_desc?: string
    social_image?: ImageDataProps
    twitter_title?: string
    twitter_desc?: string
    twitter_image?: ImageDataProps
}

export interface VideoBlockProps {
    __component?: 'common.block_video'
    video_url: string
}

export interface HTMLContentProps {
    __component?: 'common.html_content'
    content: string
}

export interface GalleryProps {
    __component?: 'common.gallery'
    images: ImageDataProps[]
}

// PAGES
// --------------------------------
export interface TextProps {
    __component?: 'page.text'
    title: string
    text: string
    links?: LinkProps[]
    first_block: boolean
}

export interface TextIntroProps {
    __component?: 'page.text-intro'
    title: string
    text: string
    links?: LinkProps[]
    first_block: boolean
}

export interface TextImageProps {
    __component?: 'page.text-image'
    title: string
    text: string
    links?: LinkProps[]
    image: ImageDataProps
    first_block: boolean
}

export interface TextDoubleImageProps {
    __component?: 'page.text-double-image'
    title: string
    text: string
    links?: LinkProps[]
    image1: ImageDataProps
    image2?: ImageDataProps
    first_block: boolean
}

export interface HeroscreenProps {
    __component?: 'page.heroscreen'
    images: ImageDataProps[]
}

export interface CarouselProps {
    __component?: 'page.carousel'
    images: ImageDataProps[]
}

export interface ParallaxProps {
    __component?: 'page.parallax'
    image: ImageDataProps
    speed: number
}