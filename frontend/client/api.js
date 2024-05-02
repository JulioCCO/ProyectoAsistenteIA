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
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.transcription
    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }
}

export const sendImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(`${apiUrl}/uploadImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('response.data.image_path', response.data.image_path)
        return response.data.image_path;
    } catch (error) {
        console.error('Error al enviar la imagen al backend:', error);
        throw new Error(`Error al enviar la imagen al backend: ${error.message}`);
    }
}

export const avocadoPredict = async (formData) => {
    try {

        console.log('formData', formData);
        const response = await axios.post(`${apiUrl}/avocado`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.prediction

    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }
}
export const winePredict = async (formData) => {
    try {

        console.log('formData', formData);
        const response = await axios.post(`${apiUrl}/wine`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.prediction

    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }
}
export const strokePredict = async (formData) => {
    try {

        console.log('formData', formData);
        const response = await axios.post(`${apiUrl}/stroke`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.prediction

    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }
}
export const heartPredict = async (formData) => {
    try {

        console.log('formData', formData);
        const response = await axios.post(`${apiUrl}/heart`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.prediction

    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }
}
export const recruitmentPredict = async (formData) => {
    try {

        console.log('formData', formData);
        const response = await axios.post(`${apiUrl}/recruitment`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.prediction

    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }
}

export const bankPredict = async (formData) => {
    try {

        console.log('formData', formData);
        const response = await axios.post(`${apiUrl}/bank`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.prediction

    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }

}

export const flightPredict = async (formData) => {
    try {

        console.log('formData', formData);
        const response = await axios.post(`${apiUrl}/flight`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.prediction

    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }

}

export const moodPredict = async (formData) => {
    try {

        console.log('formData', formData);
        const response = await axios.post(`${apiUrl}/mood`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.prediction

    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }

}

export const salaryPredict = async (formData) => {
    try {

        console.log('formData', formData);
        const response = await axios.post(`${apiUrl}/salary`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.prediction

    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }

}

export const titanicPredict = async (formData) => {
    try {

        console.log('formData', formData);
        const response = await axios.post(`${apiUrl}/titanic`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        return response.data.prediction

    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }

}

