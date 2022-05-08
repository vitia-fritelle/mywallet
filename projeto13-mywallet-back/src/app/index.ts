import express from 'express';
import {json, urlencoded} from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(compression());
app.use(cors());

app.get('/home',(_,res) => {
    res.status(201).send('Você chegou até aqui! Parabéns!')
});

export default app;