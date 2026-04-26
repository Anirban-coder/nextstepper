import axios from "axios";

// 1. Create Axios Instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 2. Add Token Automatically to EVERY request
// This replaces the need to manually add headers in every function
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// ================= AUTH =================
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  // Axios automatically handles FormData for file uploads
  // Do not manually set Content-Type here, let Axios do it
  const response = await api.post("/auth/register", data);
  return response.data;
};

// ================= USER & DASHBOARD =================
export const getDashboardData = async () => {
  const response = await api.get("/users/dashboard");
  return response.data;
};

export const selectCareer = async (careerId) => {
  const response = await api.post("/users/select-career", { careerId });
  return response.data;
};

export const updateSkillProgress = async (careerId, skillId, status) => {
  const response = await api.put("/users/skill-progress", {
    careerId,
    skillId,
    status,
  });
  return response.data;
};

// ================= PROFILE & RESUME =================
export const getProfile = async () => {
  const response = await api.get("/profile/me");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put("/profile/me", profileData);
  return response.data;
};

export const getResume = async () => {
  const response = await api.get("/resume");
  return response.data;
};

export const updateResume = async (data) => {
  const response = await api.put("/resume", data);
  return response.data;
};

// ================= AI INSIGHTS =================
export const getAIInsights = async () => {
  const response = await api.post("/ai/insights");
  return response.data;
};

// ================= TEACHER: CREATE COURSE =================
export const createCareer = async (careerData) => {
  const response = await api.post("/careers", careerData);
  return response.data;
};

export const createSkill = async (skillData) => {
  const response = await api.post("/skills", skillData);
  return response.data;
};

// ================= GENERAL =================
export const getCareers = async () => {
  const response = await api.get("/careers");
  return response.data;
};

export default api;
