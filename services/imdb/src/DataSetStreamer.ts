import * as fs from 'fs'
import * as zlib from 'zlib'

import { Observable, Subject } from 'rxjs'

export abstract class DataSetStreamer<T> {
  data(filename: string): Observable<T> {
    const subject = new Subject<T>()

    fs.createReadStream(filename)
      .pipe(zlib.createGunzip())
      .on('error', (error: any) => subject.error(error))
      .on('end', () => subject.complete())
      .on('data', (data: Buffer) => data.toString().split('\n').forEach(line => this.parse(subject, line)))

    return subject
  }

  protected abstract parse(subject: Subject<T>, line: string): void
}
