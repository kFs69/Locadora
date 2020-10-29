import { getRepository, MoreThanOrEqual } from 'typeorm';

import Movie from '../models/Movie';
import Rent from '../models/Rent';

import AppError from '../errors/AppError';

class RentMovieService {
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
 
    if(movieAlreadyRented && movieAlreadyRented.status == 'rent') {
      throw new AppError('This movie is already rented!');
    }

    const rent = await rentRepository.create({
      status: 'rent',
      user_id,
      movie_id: id
    })

    await rentRepository.save(rent);

    movie.available--;

    await movieRepository.save(movie);

    return movie;
  }
}

export default RentMovieService;