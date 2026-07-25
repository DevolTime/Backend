import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// 🔹 1. Importación corregida de la base de datos (con su nombre real mongo.config.js)
import crunchConnect from './src/config/mongo.config.js';

// 🔹 2. Rutas de categorías
import categoryRoutes from './src/routes/category.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 3. Servir carpeta estática de imágenes (Desde la raíz donde está server.js hacia uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas API
app.use('/api/category', categoryRoutes);

// 🔹 4. Conexión a DB e inicio del servidor
const PORT = process.env.PORT || 3000;

async function startServer() {
    await crunchConnect(); // Conecta a MongoDB
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
}

startServer();