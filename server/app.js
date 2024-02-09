import express from 'express';
import cors from 'cors';
import constant from './const.js';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schemaGraphQL/index.js';

const app = express();

const corsOptions = {
  origin: `http://localhost:${constant.UI_PORT}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.static('public'));

app.use(cors(corsOptions));

app.all('/graphql', createHandler({ schema }));

export default app;
