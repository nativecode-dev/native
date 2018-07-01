import * as path from 'path'
import { NameBasicDataSet } from './NameBasicDataSet'

const filename = path.join(process.cwd(), './data/name.basics.tsv.gz')
const streamer = new NameBasicDataSet()

streamer.data(filename).subscribe(value => console.log(value))
