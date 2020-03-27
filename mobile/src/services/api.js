import axios from 'axios';

const api = axios.create({
    baseURL: 'http://100.78.32.212:3333'
});

export default api;