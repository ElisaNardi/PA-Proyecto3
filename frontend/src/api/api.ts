import axios from 'axios';
//Axios es una biblioteca de JavaScript que facilita hacer solicitudes HTTP.
// Es decir, nos permite enviar peticiones desde React al backend.

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
//Creamos una instancia de Axios llamada api.
// baseURL indica la dirección principal del backend.
});
