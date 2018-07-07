import 'mocha'

import { expect } from 'chai'
import { URL } from 'url'

import { Sonarr } from '../src/index'

const TIMEOUT = 10000

describe('when using the Sonarr client', () => {
  const url = new URL(process.env.URL_SONARR || 'http://localhost:8989')
  const sonarr = new Sonarr(url)

  it.skip('should get list of shows', async () => {
    const shows = await sonarr.shows()
    expect(shows.length).gt(0)
  }).timeout(TIMEOUT)

})
