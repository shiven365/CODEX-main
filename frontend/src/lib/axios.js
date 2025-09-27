  import axios from 'axios';
  import { Import } from 'lucide-react';

  // This instance is used for authentication purposes. It sends cookies with requests.
  console.log(import.meta.env.VITE_API_URL);
  export const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7878/api',
    withCredentials: true, // Enable cookies for authentication
  });


  // https://emkc.org/api/v2/piston


