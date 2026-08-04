import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Conexión DB
import crunchConnect from './src/config/mongo.config.js';

// Rutas
import userRoutes from "./src/routes/user.routes.js";
import pedidos from './src/routes/pedidos.routes.js';
import productsRoutes from "./src/routes/product.routes.js";
import CategoryRoutes from "./src/routes/category.routes.js";
import CartRoutes from "./src/routes/cart.routes.js";
import storeRoutes from './src/routes/stores.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import roleRoutes from './src/routes/role.routes.js';
import statusRoutes from './src/routes/status.routes.js';

// Reconstrucción de __dirname (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares Globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servidor de Archivos Estáticos (para acceder a /uploads/products/imagen.png)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta de Healthcheck
app.get('/health', (req, res) => {
    res.json({ msg: 'Servidor activo' });
});

// Rutas API (ÚNICAS Y DECLARADAS UNA SOLA VEZ)
app.use('/api/users', userRoutes);
app.use('/api/category', CategoryRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/pedidos', pedidos);
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/status', statusRoutes);

// Arranque del Servidor
const PORT = process.env.PORT || 3000;

async function startServer() {
    await crunchConnect();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}

startServer();