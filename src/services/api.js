import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://myprofile-backend-2byw.onrender.com/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = (userData) => API.post("/auth/register", userData);
export const login = (userData) => API.post("/auth/login", userData);
export const getCurrentUser = () => API.get("/auth/me");

export const fetchProjects = () => API.get("/projects");
export const fetchProjectById = (id) => API.get(`/projects/${id}`);
export const fetchProjectsByCategory = (category) =>
  API.get(`/projects/category/${category}`);
export const createProject = (projectData) => {
  return API.post("/projects", projectData);
};
export const updateProject = (id, projectData) => {
  return API.put(`/projects/${id}`, projectData);
};
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const fetchFriends = () => API.get("/friends");
export const fetchFriendById = (id) => API.get(`/friends/${id}`);
export const fetchFriendsByField = (field) =>
  API.get(`/friends/field/${field}`);
export const createFriend = (friendData) => {
  return API.post("/friends", friendData);
};
export const updateFriend = (id, friendData) => {
  return API.put(`/friends/${id}`, friendData);
};
export const deleteFriend = (id) => API.delete(`/friends/${id}`);

export const fetchSkills = () => API.get("/skills");
export const fetchSkillById = (id) => API.get(`/skills/${id}`);
export const fetchSkillsByCategory = (category) =>
  API.get(`/skills/category/${category}`);
export const fetchSkillCategories = () => API.get("/skills/categories");
export const createSkill = (skillData) => API.post("/skills", skillData);
export const updateSkill = (id, skillData) =>
  API.put(`/skills/${id}`, skillData);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);
export const reorderSkills = (skills) =>
  API.post("/skills/reorder", { skills });

export default API;
