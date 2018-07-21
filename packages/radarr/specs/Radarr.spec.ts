import 'mocha'

import { expect } from 'chai'
import { URL } from 'url'

import { Radarr, Status } from '../src/index'

const TIMEOUT = 5000

describe('when using the Radarr client', () => {
  const url = new URL(process.env.URL_RADARR || 'http://localhost:7878')
  const radarr = new Radarr(url)

  it('should get server status', async () => {
    const status: Status = await radarr.status()
    expect(status.isMono).to.equal(true)
  }).timeout(TIMEOUT)

})
