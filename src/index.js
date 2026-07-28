import express from 'express';
const app = express();
import cors from'cors';

import crunchConnect from './config/mongo.config.js';

import userRoutes from "./routes/user.routes.js";
import pedidos from './routes/pedidos.routes.js';
import productsRoutes from "./routes/product.routes.js"
import CategoryRoutes from "./routes/category.routes.js";
import CartRoutes from "./routes/cart.routes.js";
import storeRoutes from './routes/stores.routes.js'
import authRoutes from './routes/auth.routes.js';
import roleRoutes from './routes/role.routes.js'
import statusRoutes from './routes/status.routes.js'
//middlewares

app.use(express.json()) //permite la interpretacion de los datos en formato json 
app.use(cors({
    origin: 'http://localhost:4200'
}))
// base de datos
crunchConnect();


//Endpoints 
app.get('/health', (req, res) => {
    res.json({
        msg: 'Sition funca'
    })
})

// Endpoints agrupados por entidad
app.use('/api/users', userRoutes)
app.use('/api/Category', CategoryRoutes)
app.use('/api/cart', CartRoutes)
app.use('/api/stores', storeRoutes)
app.use('/api/pedidos', pedidos)
app.use('/api/auth', authRoutes)

app.use("/api/products", productsRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/status',statusRoutes)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server runing on http://localhost:3000`)
})