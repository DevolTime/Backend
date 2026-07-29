import express from 'express';

import userRoutes from "./src/routes/user.routes.js";
import pedidos from './src/routes/pedidos.routes.js';
import productsRoutes from "./src/routes/product.routes.js"
import CategoryRoutes from "./src/routes/category.routes.js";
import CartRoutes from "./src/routes/cart.routes.js";
import storeRoutes from './src/routes/stores.routes.js'
import authRoutes from './src/routes/auth.routes.js';
import roleRoutes from './src/routes/role.routes.js'
import statusRoutes from './src/routes/status.routes.js'
//middlewares





import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url'; // Función para convertir la URL del módulo a una ruta de archivo del sistema

// 2. CONFIGURACIÓN Y RUTAS

import crunchConnect from './src/config/mongo.config.js'; // establece la conexión con MongoDB



// 3. RECONSTRUCCIÓN DE VARIABLES DE ENTORNO
const __filename = fileURLToPath(import.meta.url); // Obtiene la ruta del archivo actual (server.js)
const __dirname = path.dirname(__filename); // Obtiene la ruta del directorio que contiene este archivo

// 4. INICIALIZACIÓN DE LA APLICACIÓN
const app = express(); // Instancia principal de la aplicación de Express

// 5. MIDDLEWARES GLOBALES
app.use(cors()); // evitar bloqueos por políticas del navegador cuando Angular consulte la API
app.use(express.json()); // leer y procesar peticiones en formato JSON (req.body)
app.use(express.urlencoded({ extended: true })); // Permite procesar datos enviados desde formularios codificados en URL
app.use("/products", productsRoutes)


// 6. SERVIDOR DE ARCHIVOS ESTÁTICOS

// Expone la carpeta 'uploads' como pública para poder acceder a las imágenes mediante URL (ej: /uploads/imagen.jpg)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 7. DEFINICIÓN DE RUTAS API
// Asigna el prefijo '/api/category' a todas las rutas definidas dentro del archivo categoryRoutes
app.get('/health', (req, res) => {
    res.json({
        msg: 'Sition '
    })
})

// Endpoints agrupados por entidad
app.use('/api/users', userRoutes)
app.use('/api/category', CategoryRoutes)
app.use('/api/cart', CartRoutes)
app.use('/api/stores', storeRoutes)
app.use('/api/pedidos', pedidos)
app.use('/api/auth', authRoutes)


app.use("/api/products", productsRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/status',statusRoutes)

app.use('/api/roles', roleRoutes)
app.use("/products", productsRoutes)
app.use('/auth', authRoutes)
app.use("/api/products", productsRoutes)




// 8. CONFIGURACIÓN Y ARRANQUE DEL SERVIDOR
const PORT = process.env.PORT || 3000; // Usa el puerto asignado por el servidor

async function startServer() {
    await crunchConnect(); // Conecta a la base de datos MongoDB y espera a que la conexión sea exitosa

    app.listen(PORT, () => { // Pone a escuchar la aplicación de Express en el puerto especificado
        console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
}

startServer();