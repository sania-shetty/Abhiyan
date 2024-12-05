import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Adjust this if the FastAPI server is deployed elsewhere

export const updateVectors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/update-vectors`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.detail : error.message;
  }
};

export const getChatResponse = async (query) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, { query });
    return response.data.response;
  } catch (error) {
    throw error.response ? error.response.data.detail : error.message;
  }
};
