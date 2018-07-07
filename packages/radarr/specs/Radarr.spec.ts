import 'mocha'

import { expect } from 'chai'
import { URL } from 'url'

import { Radarr } from '../src/index'

const TIMEOUT = 10000

describe('when using the Radarr client', () => {
  const url = new URL(process.env.URL_RADARR || 'http://localhost:7878')
  const radarr = new Radarr(url)

  it.skip('should get list of movies', async () => {
    const movies = await radarr.movies()
    expect(movies.length).gt(0)
  }).timeout(TIMEOUT)

})
