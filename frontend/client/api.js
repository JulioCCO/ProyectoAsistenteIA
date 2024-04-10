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


