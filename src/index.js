import express from 'express';

import crunchConnect from './config/mongo.config.js';

import userRoutes from "./routes/user.routes.js";
import pedidos from './routes/pedidos.routes.js';

import productsRoutes from "./routes/product.routes.js"



const app = express();

// base de datos
crunchConnect();

//MIddlewares
app.use (express.json()); // habilitamos la interpretacion de objetos JSON

//Endpoints 
app.get ('/health', (req, res) => {
    res.json({
        msg: 'Sition funca'
    })
})

// Endpoints agrupados por entidad

app.use('/users',userRoutes )

app.use ('/pedidos', pedidos)

app.use("/products", productsRoutes)



app.listen(3000, () => {
    console.log(`server runing on http://localhost:3000`)
})