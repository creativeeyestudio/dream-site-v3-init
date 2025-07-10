export interface ImageDataProps {
  createdAt: string | Date
  updatedAt: string | Date
  filename: string
  mimeType: string
  filesize: string
  width: number
  height: number
  alt: string | null
  thumbnailURL: string | null
  url: string
  id: number
}
