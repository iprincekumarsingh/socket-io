// Import necessary modules and utilities
import axios from "axios";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/",
  withCredentials: true,
  timeout: 120000,
});
// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgxZjJlODU3MjEwM2YzZWY4ZWI3YjUiLCJlbWFpbCI6InNleEBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcyMDQzNTI3OSwiZXhwIjoxNzIwNTIxNjc5fQ.wTV6zmRro_2G5tS3AvbvHgUB6_sWRtiC9j0X1Pv7Eno";
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
const getChatMessages = (chatId: string) => {
  return apiClient.get(`/message/${chatId}`);
};
const sendMessage = (chatId: string, content: string, attachments: File[]) => {
  const formData = new FormData();
  if (content) {
    formData.append("content", content);
  }
  attachments?.map((file) => {
    formData.append("attachments", file);
  });
  return apiClient.post(`/chat-app/messages/${chatId}`, formData);
};
