import { EntityRepository, Repository, getRepository, MoreThanOrEqual, Like } from 'typeorm';

import Movie from '../models/Movie';

interface IQuery {
  search?: any;
  available?: any;
}

@EntityRepository(Movie)
class MoviesRepository extends Repository<Movie> {
  public async all({ search='', available='false' }: IQuery): Promise<Movie[]> {
    const movieRepository = getRepository(Movie);

    if(available == 'true') {
      let movie = await movieRepository.find({
        available: MoreThanOrEqual(1),
        title: search !== '' ? Like(`%${search}%`) : Like(`%%`)
      });

      return movie;
    } else {
      let movie = await movieRepository.find({
        title: search !== '' ? Like(`%${search}%`) : Like(`%%`)
      });

      return movie;
    }
  }
}

export default MoviesRepository;