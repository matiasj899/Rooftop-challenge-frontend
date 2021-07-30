import axios from "axios";

const clienteAxios = axios.create({
  baseURL: 'https://rooftop-api-rest-frontend.herokuapp.com/',
});

export default clienteAxios;
