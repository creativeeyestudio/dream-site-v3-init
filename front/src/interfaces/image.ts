export interface ImageDataProps {
  alternativeText: string;
  mime: string;
  url: string | URL;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      width: number;
      height: number;
    };
    small: {
      width: number;
      height: number;
    };
    medium: {
      width: number;
      height: number;
    };
    large: {
      width: number;
      height: number;
    };
  };
}