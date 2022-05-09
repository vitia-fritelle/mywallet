import express from 'express';
import {json} from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import routes from '../routes';
import { ApiError } from '../utils';
import { errorConverter, errorHandler } from '../middlewares';

const app = express();

app.use(helmet());
app.use(json());
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.use(routes)
app.use((_req, _res, next) => next(new ApiError(404,'Not found')));
app.use(errorConverter);
app.use(errorHandler);
app.set('case sensitive routing',false);
app.set('strict routing',false)
export default app;