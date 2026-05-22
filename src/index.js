import express from 'express';

import crunchConnect from './config/mongo.config.js';

import userRoutes from "./routes/user.routes.js";

const app = express();
//middlewares

app.use(express.json()) //permite la interpretacion de los datos en formato json 

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



app.listen(3000, () => {
    console.log(`server runing on http://localhost:3000`)
})