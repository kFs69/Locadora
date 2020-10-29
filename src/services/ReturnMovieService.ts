import { getRepository, MoreThanOrEqual } from 'typeorm';

import Movie from '../models/Movie';
import Rent from '../models/Rent';

import AppError from '../errors/AppError';

class ReturnMovieService {
  public async execute({ id, user_id }: any): Promise<Movie> {
    const movieRepository = getRepository(Movie);
    const rentRepository = getRepository(Rent);

    if(!id) {
      throw new AppError('Movie not found');
    }

    const movie = await movieRepository.findOne({
      where: { id, available: MoreThanOrEqual(1) }
    });

    if(!movie) {
      throw new AppError('Movie not found or not available');
    }
    
    const movieAlreadyRented = await rentRepository.findOne({
      where: { user_id, movie_id: id },
      order: { created_at: 'DESC' },
    });
 
    if(!movieAlreadyRented || movieAlreadyRented.status == 'return') {
      throw new AppError("This movie isn't available for return!");
    }

    const rent = await rentRepository.create({
      status: 'return',
      user_id,
      movie_id: id
    })

    await rentRepository.save(rent);

    movie.available++;

    await movieRepository.save(movie);

    return movie;
  }
}

export default ReturnMovieService;