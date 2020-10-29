import { Router } from 'express';
const routes = Router();

import UserRoutes from './users.routes';
import SessionRoutes from './session.routes';
import MovieRoutes from './movies.routes';

routes.use('/api/user', UserRoutes);
routes.use('/api/session', SessionRoutes);
routes.use('/api/movies', MovieRoutes);

export default routes;