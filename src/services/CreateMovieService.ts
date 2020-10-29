import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Movie from '../models/Movie';

import AppError from '../errors/AppError';

interface Request {
  title: string;
  director: string;
  available: number;
}

class CreateUserService {
  public async execute({ title, director, available }: Request): Promise<Movie> {
    const movieRepository = getRepository(Movie);

    if(!title || !director ||!available) {
      throw new AppError('Fill all the fields');
    }

    const movieExists = await movieRepository.findOne({
      where: { title }
    });

    if(movieExists) {
      throw new AppError('Movie already registered');
    }

    const movie = movieRepository.create({
      title, 
      director,
      available
    })

    await movieRepository.save(movie);

    return movie;
  }
}

export default CreateUserService;