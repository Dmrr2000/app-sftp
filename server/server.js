const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(fileUpload());
app.use('/archivos', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', (req, res) => {
    if (!req.files || !req.files.archivo) {
        return res.status(400).send('No se subió ningún archivo.');
    }

    const archivo = req.files.archivo;
    const rutaDestino = path.join(__dirname, 'uploads', archivo.name);

    archivo.mv(rutaDestino, (err) => {
        if (err) return res.status(500).send('Error al guardar el archivo.');
        res.send(`Archivo "${archivo.name}" subido correctamente. Enlace: /archivos/${archivo.name}`);
    });
});

const puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
});
