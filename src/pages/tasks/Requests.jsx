import Axios from "axios";
const BASE_URL = "https://momentum.redberryinternship.ge/api/";
const API_TOKEN = "9e7c6a3e-cb02-4875-92c8-ce36da0daf45";

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
export const GetTask = async (taskId) => {
  try {
    const response = await Axios.get(`${BASE_URL}tasks/${taskId}`, {
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

export const GetPriorities = async () => {
  try {
    const response = await Axios.get(`${BASE_URL}priorities`, {
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

export const GetStatuses = async () => {
  try {
    const response = await Axios.get(`${BASE_URL}statuses`, {
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

export const GetTasks = async () => {
  try {
    const response = await Axios.get(`${BASE_URL}tasks`, {
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
export const GetComments = async (taskId) => {
  try {
    const response = await Axios.get(`${BASE_URL}tasks/${taskId}/comments`, {
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
    return response;
  } catch (e) {
    console.error("Error posting employee:", e);
    throw e;
  }
};

export const PostTask = async (data) => {
  try {
    const response = await Axios.post(`${BASE_URL}tasks`, data, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response;
  } catch (e) {
    console.error("Error posting employee:", e);
    throw e;
  }
};

export const PostComment = async (data, taskId) => {
  try {
    const response = await Axios.post(
      `${BASE_URL}tasks/${taskId}/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.error("Error posting employee:", e);
    throw e;
  }
};

export const PutTask = async (taskId, data) => {
  try {
    const response = await Axios.put(`${BASE_URL}tasks/${taskId}`, data, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};
