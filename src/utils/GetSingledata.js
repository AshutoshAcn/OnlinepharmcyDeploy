// action.jsx
import { API_KEY } from '../Redux/APIKEY/Api';
import fetchWrapper from './fetchWrapper';
import axios from 'axios';
const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));
const token = loggeddata?.token;


export const fetchData = async (id) => {
    try {
      const response = await axios.get(`${API_KEY}/api/auth/supplier/${id}`,
        {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }    
    );
      return response.data; 
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };
  