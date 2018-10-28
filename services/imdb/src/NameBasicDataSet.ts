import { Subject } from 'rxjs'
import { DataSetStreamer } from './DataSetStreamer'

export interface NameBasic {
  nconst: string
  primaryName: string
  birthYear: number
  deathYear?: number
  primaryProfession: string
  knownForTitles: string[]
}

export class NameBasicDataSet extends DataSetStreamer<NameBasic> {
  protected parse(subject: Subject<NameBasic>, line: string): void {
    const values = line.split('\t')
    subject.next({
      nconst: values[0],
      primaryName: values[1],
      birthYear: parseInt(values[2]),
      deathYear: values[3] === '\N' ? undefined : parseInt(values[3]),
      primaryProfession: values[4],
      knownForTitles: values[5] ? values[5].split(',') : [],
    })
  }
}
