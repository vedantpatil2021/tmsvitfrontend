import axios from "axios";

export default axios.create({
    baseURL: "http://tmsvitflaskapi.eastus.cloudapp.azure.com:5000/",
    withCredentials: true,
})
