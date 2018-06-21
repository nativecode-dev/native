import { Path, GET, PathParam } from 'typescript-rest'

@Path('/sonarr')
export class Sonarr {

  @GET
  @Path(':hostname')
  movies(@PathParam(':hostname') hostname: string): string {
    return hostname
  }

}
