import axios from 'axios';

// const BackendURL = 'http://localhost:8000/api/v1';

const BackendURL = 'https://olx-backend-wvvi.onrender.com/api/v1';

const api = axios.create({baseURL : BackendURL})

export default api