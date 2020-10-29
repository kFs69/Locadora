import { Router } from 'express';

import CreateMovieService from '../services/CreateMovieService';
import RentMovieService from '../services/RentMovieService';
import ReturnMovieService from '../services/ReturnMovieService';
import MoviesRepository from '../repositories/MoviesRepository';
import authMiddleware from '../middlewares/auth';

const movieRouter = Router();
const movieRepository = new MoviesRepository();

movieRouter.use(authMiddleware);

movieRouter.post('/', async (req, res) => {
  try {
    const { title, director, available } = req.body;
  
    const createMovie = new CreateMovieService();
  
    const movie = await createMovie.execute({ title, director, available });
  
    return res.json(movie);
  } catch (err){
    return res.status(400).json({ err: err.message })
  }
});

movieRouter.get('/', async (req, res) => {
  try {
    const { search, available } = req.query;

    const movie = await movieRepository.all({ search, available });

    return res.json(movie);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

movieRouter.put('/rent/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const rentMovie = new RentMovieService();

    const movie = await rentMovie.execute({ id, user_id });

    return res.json(movie);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
})

movieRouter.put('/return/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const returnMovie = new ReturnMovieService();

    const movie = await returnMovie.execute({ id, user_id });

    return res.json(movie);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
})

export default movieRouter;