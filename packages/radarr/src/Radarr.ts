import { HTTP } from '@nofrills/http'
import { URL } from 'url'
import { Movie, MovieQuality, ReleaseInfo } from './models'

export class Radarr extends HTTP {
  constructor(private readonly baseUrl: URL) {
    super()
  }

  public async movie(movieId: number): Promise<Movie> {
    return this.get<Movie>(`${this.baseUrl.toString()}/movie/${movieId}`)
  }

  public async movies(): Promise<Movie[]> {
    return this.get<Movie[]>(`${this.baseUrl.toString()}/movie`)
  }

  public async page(pageSize: number, start: number = 1): Promise<Movie[]> {
    return this.get<Movie[]>(`${this.baseUrl.toString()}/movie?page=${start}&pageSize=${pageSize}`)
  }

  public async profiles(): Promise<MovieQuality[]> {
    return this.get<MovieQuality[]>(`${this.baseUrl.toString()}/profile`)
  }

  public async release(release: ReleaseInfo): Promise<void> {
    return this.post<ReleaseInfo, void>(`${this.baseUrl.toString()}/release/push`, release)
  }

  public async toggleMonitor(movieId: number, toggle: boolean): Promise<void> {
    const movie = await this.movie(movieId)
    movie.monitored = toggle
    await this.update(movie)
    this.log.info(`turned ${this.onoff(toggle)} monitoring for: "${movie.title}" (${movie.year})`)
  }

  public async update(movie: Movie): Promise<Movie> {
    return this.put<Movie, Movie>(`${this.baseUrl.toString()}/movie`, movie)
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
