import axios from "axios";

const API_BASE_URL = "http://localhost:5000/user";

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    console.log(response.data);
    if (response.data.token && response.data.user) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
    }
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    console.log(userId, userData);
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_BASE_URL}/update?id=${userId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || {
        message: "Error updating user",
        error: "Unknown error occurred",
      },
    };
  }
};

// Delete user function
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_BASE_URL}/delete?id=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Clear local storage if user deletes their own account
    if (userId === localStorage.getItem("userId")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || {
        message: "Error deleting user",
        error: "Unknown error occurred",
      },
    };
  }
};

export async function getUserDataById(id) {
  try {
    console.log(id);
    const response = await axios.get(`${API_BASE_URL}/getDetails?id=${id}`, {
      params: { id },
    });
    console.log("Fetched user data:", response.data);
    return response.data; // Return the fetched user data
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data?.message || error.message
    );
    throw error; // Rethrow the error for further handling
  }
}
