import express from 'express';
import routes from './routes/index.ts';
import path from 'node:path';


const app = express();

// config app
app.use(express.json());



app.use('/uploads', express.static('./uploads'))

app.use('/api', routes);


export default app; 
