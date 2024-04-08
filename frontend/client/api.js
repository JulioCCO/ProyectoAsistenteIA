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


