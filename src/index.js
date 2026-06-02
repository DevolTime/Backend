import express, { Router } from 'express';

import crunchConnect from './config/mongo.config.js';

import userRoutes from "./routes/user.routes.js";

import storeRoutes from './routes/stores.routes.js'

const app = express();

app.use( express.json() );   // Habilita la capacidad de la aplicacion de leer JSON

// base de datos
crunchConnect();

//Endpoints 
app.get ('/health', (req, res) => {
    res.json({
        msg: 'Sition funca'
    })
})

// Endpoints agrupados por entidad

app.use('/users',userRoutes )
app.use('/stores',storeRoutes)

app.listen(3000, () => {
    console.log(`server runing on http://localhost:3000`)
})