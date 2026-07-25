import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'; // 1. Importamos dotenv

// 2. Importamos la función de conexión que acabas de compartir
import crunchConnect from './db.js'; // Ajusta la ruta a tu archivo de
import CategoryModel from './models/CategoryModel.js'; // Ajusta la ruta de tu modelo

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());




// Servir la carpeta 'uploads' para que las imágenes sean accesibles públicamente
// Ejemplo: http://localhost:3000/uploads/archivo-12345.png
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Configuración de la carpeta uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `cat-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ storage: storage });

// RUTA: Crear Categoría (POST)
app.post('/category', upload.single('archivo'), async (req, res) => {
    try {
        const { name, status } = req.body;
        
        // Si se subió un archivo, construimos su URL/Ruta. Si no, queda en null.
        let urlImage = null;
        if (req.file) {
            urlImage = `http://localhost:3000/uploads/${req.file.filename}`;
        }

        const newCategory = new CategoryModel({
            name,
            status: status === 'true' || status === true, // Convertir string de FormData a Booleano
            urlImage
        });

        await newCategory.save();

        res.status(201).json({
            message: 'Categoría creada con éxito',
            data: newCategory
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría', detail: error.message });
    }
});

// RUTA: Actualizar Categoría (PATCH)
app.patch('/category/:id', upload.single('archivo'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const updateData = {
            name,
            status: status === 'true' || status === true
        };

        // Si el usuario subió una nueva imagen, actualizamos urlImage
        if (req.file) {
            updateData.urlImage = `http://localhost:3000/uploads/${req.file.filename}`;
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar categoría', detail: error.message });
    }
});

// 3. Conectamos a la base de datos Y LUEGO levantamos el servidor
const PORT = process.env.PORT || 3000;


async function startServer() {
    // Primero aseguramos la conexión a Mongo
    await crunchConnect(); 
    
    // Una vez conectados, escuchamos en el puerto
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}

startServer();