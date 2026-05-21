import express from 'express';

import crunchConnect from './config/mongo.config.js';

import userRoutes from "./routes/user.routes.js";

import productsRoutes from "./routes/product.routes.js"



const app = express();

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
app.use("/products", productsRoutes)


app.listen(3000, () => {
    console.log(`server runing on http://localhost:3000`)
})