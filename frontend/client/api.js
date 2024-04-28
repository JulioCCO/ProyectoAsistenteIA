// api.js

import axios from 'axios';
import config from '../config.js';

const { apiUrl } = config;

export const sendBlob = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${apiUrl}/audioTask`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.transcription
    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }
}

