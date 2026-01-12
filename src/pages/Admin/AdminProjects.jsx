import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/api";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaUpload,
  FaImage,
} from "react-icons/fa";
import toast from "react-hot-toast";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "frontend",
    technologies: [],
    features: [],
    github: "",
    live: "",
    icon: "🚀",
    image: null,
  });

  const [techInput, setTechInput] = useState({ name: "", icon: "", color: "" });
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetchProjects();
      setProjects(response.data.data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addTechnology = () => {
    if (techInput.name && techInput.icon && techInput.color) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, { ...techInput }],
      }));
      setTechInput({ name: "", icon: "", color: "" });
    }
  };

  const removeTechnology = (index) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const projectFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "technologies" || key === "features") {
          projectFormData.append(key, JSON.stringify(formData[key]));
        } else if (key === "image" && formData[key]) {
          projectFormData.append("image", formData[key]);
        } else {
          projectFormData.append(key, formData[key]);
        }
      });

      if (editingId) {
        await updateProject(editingId, projectFormData);
        toast.success("Project updated successfully");
      } else {
        await createProject(projectFormData);
        toast.success("Project created successfully");
      }

      loadProjects();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save project");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies || [],
      features: project.features || [],
      github: project.github || "",
      live: project.live || "",
      icon: project.icon || "🚀",
      image: null,
    });
    setImagePreview(project.image);
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        toast.success("Project deleted successfully");
        loadProjects();
      } catch (error) {
        toast.error("Failed to delete project");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "frontend",
      technologies: [],
      features: [],
      github: "",
      live: "",
      icon: "🚀",
      image: null,
    });
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
    setTechInput({ name: "", icon: "", color: "" });
    setFeatureInput("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
            <p className="text-slate-400">Add, edit, or delete your projects</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 
              rounded-lg text-white font-semibold transition-colors"
          >
            <FaPlus /> Add New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700"
            >
              <div
                className="h-48 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 
                  flex items-center justify-center"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaImage className="text-6xl text-slate-600" />
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">
                    {project.category}
                  </span>
                </div>

                <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 flex items-center justify-center gap-2 
                      py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg 
                      text-white transition-colors"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex-1 flex items-center justify-center gap-2 
                      py-2 bg-red-600 hover:bg-red-700 rounded-lg 
                      text-white transition-colors"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingId ? "Edit Project" : "Add New Project"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                            rounded-lg text-white focus:outline-none focus:border-cyan-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                            rounded-lg text-white focus:outline-none focus:border-cyan-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                            rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        >
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="fullstack">Full Stack</option>
                          <option value="mobile">Mobile</option>
                          <option value="design">Design</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Image
                        </label>
                        <div
                          className="border-2 border-dashed border-slate-600 rounded-lg p-6 
                          text-center hover:border-cyan-500 transition-colors cursor-pointer"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            {imagePreview ? (
                              <div className="space-y-3">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="w-full h-48 object-cover rounded-lg"
                                />
                                <p className="text-sm text-slate-400">
                                  Click to change image
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <FaUpload className="text-4xl text-slate-500 mx-auto" />
                                <p className="text-slate-400">
                                  Click to upload project image
                                </p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Technologies
                        </label>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="text"
                              placeholder="Name"
                              value={techInput.name}
                              onChange={(e) =>
                                setTechInput({
                                  ...techInput,
                                  name: e.target.value,
                                })
                              }
                              className="px-3 py-2 bg-slate-700 border border-slate-600 
                                rounded text-white text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Icon"
                              value={techInput.icon}
                              onChange={(e) =>
                                setTechInput({
                                  ...techInput,
                                  icon: e.target.value,
                                })
                              }
                              className="px-3 py-2 bg-slate-700 border border-slate-600 
                                rounded text-white text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Color"
                              value={techInput.color}
                              onChange={(e) =>
                                setTechInput({
                                  ...techInput,
                                  color: e.target.value,
                                })
                              }
                              className="px-3 py-2 bg-slate-700 border border-slate-600 
                                rounded text-white text-sm"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={addTechnology}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 
                              rounded-lg text-sm transition-colors"
                          >
                            Add Technology
                          </button>

                          <div className="space-y-2">
                            {formData.technologies.map((tech, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between 
                                px-3 py-2 bg-slate-700/50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <span className={tech.color}>
                                    {tech.icon}
                                  </span>
                                  <span className="text-sm">{tech.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeTechnology(index)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Features
                        </label>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Enter feature"
                              value={featureInput}
                              onChange={(e) => setFeatureInput(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), addFeature())
                              }
                              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 
                                rounded text-white text-sm"
                            />
                            <button
                              type="button"
                              onClick={addFeature}
                              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 
                                rounded-lg text-sm transition-colors"
                            >
                              Add
                            </button>
                          </div>

                          <div className="space-y-2">
                            {formData.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between 
                                px-3 py-2 bg-slate-700/50 rounded-lg"
                              >
                                <span className="text-sm">{feature}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFeature(index)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            name="github"
                            value={formData.github}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 
                              rounded-lg text-white focus:outline-none focus:border-cyan-500"
                            placeholder="https://github.com/username/project"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Live Demo URL
                          </label>
                          <input
                            type="url"
                            name="live"
                            value={formData.live}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 
                              rounded-lg text-white focus:outline-none focus:border-cyan-500"
                            placeholder="https://project-demo.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 pt-6 border-t border-slate-700">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 
                        rounded-lg text-white font-semibold transition-colors"
                    >
                      {editingId ? "Update Project" : "Create Project"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 
                        rounded-lg text-white font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
