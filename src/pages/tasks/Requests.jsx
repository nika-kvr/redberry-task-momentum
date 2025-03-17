import Axios from "axios";

const BASE_URL = "https://momentum.redberryinternship.ge/api/";

const API_TOKEN = "9e6e5fac-3178-46ef-afc2-03951beadd25";

export const GetDepartments = async () => {
  try {
    const response = await Axios.get(`${BASE_URL}departments`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const GetEmployees = async () => {
  try {
    const response = await Axios.get(`${BASE_URL}employees`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const PostEmployee = async (data) => {
  try {
    const response = await Axios.post(`${BASE_URL}employees`, data, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error("Error posting employee:", e);
    throw e;
  }
};
