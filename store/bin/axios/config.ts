/* Axios configuration */
import axios from "axios";



const host =  process.env.HOST || 'https://passwordstore.azurewebsites.net';
const BASE_URL = host;

/* instance for normal json request */
const axiosInstance =  axios.create({
    baseURL:BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
});


export default axiosInstance;