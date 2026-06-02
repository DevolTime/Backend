import express from 'express';
const app = express();

import crunchConnect from './config/mongo.config.js';

import userRoutes from "./routes/user.routes.js";

import CartRoutes from "./routes/cart.routes.js";


// base de datos
crunchConnect();

// Middlewares

app.use(express.json()); // Habilita leer objetos Json

//Endpoints 
app.get('/health', (req, res) => {
    res.json({
        msg: 'Sition funca'
    })
})

// Endpoints agrupados por entidad

app.use('/users', userRoutes)

app.use('/cart', CartRoutes)

app.listen(3000, () => {
    console.log(`server runing on http://localhost:3000`)
})