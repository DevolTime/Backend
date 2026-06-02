import express from 'express';
const app = express();

import crunchConnect from './config/mongo.config.js';

import userRoutes from "./routes/user.routes.js";
import pedidos from './routes/pedidos.routes.js';
import productsRoutes from "./routes/product.routes.js"
import CategoryRoutes from "./routes/category.routes.js";
import CartRoutes from "./routes/cart.routes.js";
import storeRoutes from './routes/stores.routes.js'


//middlewares

app.use(express.json()) //permite la interpretacion de los datos en formato json 

// base de datos
crunchConnect();


//Endpoints 
app.get('/health', (req, res) => {
    res.json({
        msg: 'Sition funca'
    })
})

// Endpoints agrupados por entidad
app.use('/users',userRoutes )
app.use('/Category', CategoryRoutes)
app.use('/cart', CartRoutes)
app.use('/stores',storeRoutes)

app.use ('/pedidos', pedidos)

app.use("/products", productsRoutes)



app.listen(3000, () => {
    console.log(`server runing on http://localhost:3000`)
})