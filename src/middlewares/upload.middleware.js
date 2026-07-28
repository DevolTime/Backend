import multer from 'multer'; // Librería para procesar 'multipart/form-data' (archivos/imágenes)
import path from 'path';     // resolver rutas de archivos multiplataforma
import fs from 'fs';         // Módulo nativo para interactuar con el sistema de archivos (crear carpetas, etc.)

// 2. CONFIGURACIÓN DE LA CARPETA DE DESTINO

// process.cwd() obtiene la ruta raíz del proyecto ('Backend/'). 
// Unimos esa ruta para indicar que las imágenes se guardarán en 'uploads/categories'
const uploadDir = path.join(process.cwd(), 'uploads/categories');

// Verifica si la carpeta existe; si no, la crea de forma recursiva (crea también subcarpetas si no existen)
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 3. ESTRATEGIA DE ALMACENAMIENTO EN DISCO
const storage = multer.diskStorage({
    // Define el directorio donde se almacenarán las imágenes
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    // Define el nombre con el que se guardará el archivo en el disco
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Genera una marca de tiempo e id aleatorio
        const ext = path.extname(file.originalname);                              // Extrae la extensión (.png, .jpg, etc.)
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);                     // Resultado ej: "urlImage-1721950000000-84729103.png"
    }
});

// 4. FILTRO DE FORMATOS PERMITIDOS
const fileFilter = (req, file, cb) => {
    // Array con los tipos MIME de imagen permitidos
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Permite la subida del archivo
    } else {
        // Rechaza el archivo devolviendo un error
        cb(new Error('Formato de archivo no válido. Solo se permiten imágenes (JPG, PNG, WEBP).'), false);
    }
};

// 5. INICIALIZACIÓN DEL MIDDLEWARE Y LÍMITES
const upload = multer({
    storage: storage,                      // Aplica la configuración de disco
    fileFilter: fileFilter,                // Aplica la validación de formato
    limits: { fileSize: 5 * 1024 * 1024 }  // Establece el límite máximo a 5 MegaBytes
});

export default upload;