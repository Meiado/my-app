import axios from "axios";
import { parseCookies } from "nookies";

export default function getAPIClient(ctx?: any) {
  const { 'ssaba-token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000, // Tempo limite da requisição (opcional)
  });


  if (token)
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

  return api;
}