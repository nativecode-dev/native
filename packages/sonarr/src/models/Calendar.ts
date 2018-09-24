import { Series } from './Series'

export interface Calendar {
  seriesId: number
  episodeFileId: number
  seasonNumber: number
  episodeNumber: number
  title: string
  airDate: Date
  airDateUtc: Date
  overview: string
  hasFile: boolean
  monitored: boolean
  sceneEpisodeNumber: number
  sceneSeasonNumber: number
  tvDbEpisodeId: number
  series: Series
  downloading: boolean
  id: number
}
