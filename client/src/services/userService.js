import api from "./api";

export const getDashboard = async () => {
  const res = await api.get("/users/dashboard");
  return res.data;
};

export const updateSkillProgress = async (skillId, status) => {
  const res = await api.put("/users/skill-progress", {
    skillId,
    status,
  });
  return res.data;
};
