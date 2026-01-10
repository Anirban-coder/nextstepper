const BASE_URL = "http://localhost:5000/api";

// Helper to get token
const getToken = () => localStorage.getItem("token");

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

// REGISTER
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
};

// GET DASHBOARD
export const getDashboardData = async () => {
  const res = await fetch(`${BASE_URL}/users/dashboard`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
};

// GET CAREERS
export const getCareers = async () => {
  const res = await fetch(`${BASE_URL}/careers`);

  if (!res.ok) throw new Error("Failed to fetch careers");
  return res.json();
};

// SELECT CAREER
export const selectCareer = async (careerId) => {
  const res = await fetch(`${BASE_URL}/users/select-career`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ careerId }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message === "Career already added") {
      return data;
    }
    throw new Error(data.message || "Failed to select career");
  }

  return data;
};

// UPDATE SKILL PROGRESS 
export const updateSkillProgress = async (careerId, skillId, status) => {
  const res = await fetch(`${BASE_URL}/users/skill-progress`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      careerId,
      skillId,
      status,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update skill");
  }

  return data;
};
// GET PROFILE
export const getProfile = async () => {
  const res = await fetch(`${BASE_URL}/profile/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

// UPDATE PROFILE
export const updateProfile = async (profileData) => {
  const res = await fetch(`${BASE_URL}/profile/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
};
// GET RESUME
export const getResume = async () => {
  const res = await fetch(`${BASE_URL}/resume`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch resume");
  return res.json();
};

// UPDATE RESUME
export const updateResume = async (data) => {
  const res = await fetch(`${BASE_URL}/resume`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update resume");
  return res.json();
};
