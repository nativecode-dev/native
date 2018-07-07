import { HTTP } from '@nofrills/http'
import { URL } from 'url'
import { Movie, MovieQuality, ReleaseInfo } from './models'
import { Logger } from './Logger'

export class Radarr extends HTTP {
  private readonly endpoint: URL

  private readonly logger = Logger.extend('radarr')

  constructor(private readonly baseUrl: URL) {
    super()
    this.endpoint = new URL('api', `${baseUrl.protocol}//${baseUrl.hostname}${baseUrl.pathname}`)
    this.logger.debug('basurl', baseUrl.toString())
    this.logger.debug('endpoint', this.endpoint.toString())
  }

  public async movie(movieId: number): Promise<Movie> {
    return this.get<Movie>(`${this.endpoint.toString()}/movie/${movieId}`)
  }

  public async movies(): Promise<Movie[]> {
    return this.get<Movie[]>(`${this.endpoint.toString()}/movie`)
  }

  public async page(pageSize: number, start: number = 1): Promise<Movie[]> {
    return this.get<Movie[]>(`${this.endpoint.toString()}/movie?page=${start}&pageSize=${pageSize}`)
  }

  public async profiles(): Promise<MovieQuality[]> {
    return this.get<MovieQuality[]>(`${this.endpoint.toString()}/profile`)
  }

  public async release(release: ReleaseInfo): Promise<void> {
    return this.post<ReleaseInfo, void>(`${this.endpoint.toString()}/release/push`, release)
  }

  public async toggleMonitor(movieId: number, toggle: boolean): Promise<void> {
    const movie = await this.movie(movieId)
    movie.monitored = toggle
    await this.update(movie)
    this.logger.info(`turned ${this.onoff(toggle)} monitoring for: "${movie.title}" (${movie.year})`)
  }

  public async update(movie: Movie): Promise<Movie> {
    return this.put<Movie, Movie>(`${this.endpoint.toString()}/movie`, movie)
  }

  protected get name(): string {
    return 'radarr'
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
