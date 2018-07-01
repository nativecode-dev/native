import { MediaInfo, Quality } from './index'

export interface MovieFile {
  dateAdded: Date
  id: number
  mediaInfo: MediaInfo
  movieId: number
  quality: Quality
  relativePath: string
  size: number
}
