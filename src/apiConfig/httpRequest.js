import axios from "axios"
import { baseUrl } from "./Auth";
const axiosInstance = axios.create({
    baseURL: baseUrl, 
    timeout: 10000,
  });

  export const makeApiCall = async ({
    method,
    endUrl,
    body = null,
    config = {}, 
  }) => {
    try {
      let response;
  
      switch (method.toLowerCase()) {
        case 'get':
          response = await axiosInstance.get(endUrl, config);
          break;
  
        case 'post':
          response = await axiosInstance.post(endUrl, body, config);
          break;
  
        case 'put':
          response = await axiosInstance.put(endUrl, body, config);
          break;
  
        case 'delete':
          response = await axiosInstance.delete(endUrl, config);
          break;
  
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error?.response?.data || error;
    }
  };