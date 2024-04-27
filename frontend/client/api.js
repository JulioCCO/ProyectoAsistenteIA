// api.js

import axios from 'axios';
import config from '../config.js';

const { apiUrl } = config;

export const getBackendData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/`);
        console.log('response: ', response);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data from the backend: ${error.message}`);
    }
};

/*
export const postTaskData = async (dataTosend) => {
    try {
        console.log(dataTosend)
        const requestData = { data: dataTosend };
        const request = await axios.post(`${apiUrl}/postTask`, requestData);
        console.log('request: ', request);
        return request;
    } catch (error) {
        throw new Error(`Error fetching data from the backend: ${error.message}`);
    }
}
*/

export const sendBlob = async (file) => {
    try {

        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${apiUrl}/audioTask`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como formulario multipart
            }
        });
        console.log('response', response);
        console.log('Audio enviado al backend');
    } catch (error) {
        console.error('Error al enviar el archivo al backend:', error);
        throw new Error(`Error al enviar el archivo al backend: ${error.message}`);
    }
}

