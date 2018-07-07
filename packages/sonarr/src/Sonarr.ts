import { HTTP } from '@nofrills/http'
import { URL } from 'url'
import { Episode, QualityProfile, ReleaseInfo, Series } from './models'
import { Logger } from './Logger'

export class Sonarr extends HTTP {
  private readonly endpoint: URL

  private readonly logger = Logger.extend('sonarr')

  constructor(private readonly baseUrl: URL) {
    super()
    this.endpoint = new URL('api', `${baseUrl.protocol}//${baseUrl.hostname}${baseUrl.pathname}`)
    this.logger.debug('basurl', baseUrl.toString())
    this.logger.debug('endpoint', this.endpoint.toString())
  }

  public async episodes(seriesId?: number): Promise<Episode[]> {
    if (seriesId) {
      return this.get<Episode[]>(`${this.endpoint.toString()}/episode?seriesId=${seriesId}`)
    }
    return this.get<Episode[]>(`${this.endpoint.toString()}/episode`)
  }

  public async release(release: ReleaseInfo): Promise<void> {
    return this.post<ReleaseInfo, void>(`${this.endpoint.toString()}/release/push`, release)
  }

  public async toggleMonitor(seriesId: number, toggle: boolean): Promise<void> {
    const series = await this.show(seriesId)
    series.monitored = toggle
    await this.update(series)
    this.logger.info(`turned ${this.onoff(toggle)} monitoring for: "${series.title}" (${series.year})`)
  }

  public async toggleSeasonMonitor(seriesId: number, seasonNumber: number, toggle: boolean): Promise<void> {
    const series = await this.show(seriesId)
    const season = series.seasons.find(s => s.seasonNumber === seasonNumber)

    if (season) {
      season.monitored = toggle
      await this.update(series)
      this.logger.info(`turned ${this.onoff(toggle)} monitoring for: "${series.title}" (${series.year}), season: ${seasonNumber}`)
      return
    }

    throw new Error(`season ${seasonNumber} not found for ${seriesId}`)
  }

  public async profiles(): Promise<QualityProfile[]> {
    return this.get<QualityProfile[]>(`${this.endpoint.toString()}/profile`)
  }

  public async show(seriesId: number): Promise<Series> {
    return this.get<Series>(`${this.endpoint.toString()}/series/${seriesId}`)
  }

  public async shows(): Promise<Series[]> {
    const series = await this.get<Series[]>(`${this.endpoint.toString()}/series`)
    return series.sort((a, b) => a.sortTitle < b.sortTitle ? -1 : 1)
  }

  public async update(series: Series): Promise<void> {
    return this.put<Series, void>(`${this.endpoint.toString()}/series`, series)
  }

  protected get name(): string {
    return 'sonarr'
  }

  protected async request<T>(body?: T): Promise<RequestInit> {
    return {
      body: JSON.stringify(body),
      headers: {
        'accept': 'application/json,text/json',
        'content-type': 'application/json',
        'x-api-key': this.baseUrl.password,
      },
    }
  }

  private onoff(value: boolean): string {
    return value ? 'on' : 'off'
  }
}
