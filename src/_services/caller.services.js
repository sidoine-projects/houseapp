import axios from "axios";



const baseURL = process.env.NODE_ENV === 'production' ? 'https://api-medpay.akasigroup.net/api' : 'http://localhost:8000/api';

const Axios = axios.create({
  baseURL: baseURL
});
// const Axios = axios.create({
//         // baseURL: 'https://api-medpay.akasigroup.net/api'
//   baseURL: "http://localhost:8000/api",
// });

Axios.defaults.headers.common["Content-Type"] = "application/json";

Axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // if token expire logout user
    if (error.response && error.response.status == "401") {
      if (error.response.data.message == "Unauthenticated.") {
        localStorage.clear();
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
