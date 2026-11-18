// import express
import express from 'express';

import routes from './routes/index.ts';

// create an express app
const app = express();
app.use(express.json());




app.use('/api', routes);



export default app;
