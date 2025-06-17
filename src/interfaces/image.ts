export interface ImageDataProps {
  createdAt: string | Date;
  updatedAt: string | Date;
  filename: string;
  mimeType: string;
  filesize: string;
  width: number;
  height: number;
  id: number;
  url: string;
  thumbnailURL: string | null;
  alt: string | null;
}
