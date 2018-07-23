export { Lincoln } from '@nofrills/lincoln-debug'

import { CreateLogger, CreateOptions, Lincoln, Options } from '@nofrills/lincoln-debug'
import { ScrubsInterceptor } from '@nofrills/scrubs'

const options: Options = CreateOptions('native:sonarr', [], [['scrubs-interceptor', ScrubsInterceptor]])
export const Logger: Lincoln = CreateLogger(options)
