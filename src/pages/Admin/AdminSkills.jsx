import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
} from "../../services/api";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaGripVertical,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    color: "text-cyan-400",
    level: "Intermediate",
    description: "",
    category: "frontend",
    order: 0,
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await fetchSkills();
      const sortedSkills = response.data.data.sort((a, b) => a.order - b.order);
      setSkills(sortedSkills);
    } catch (error) {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateSkill(editingId, formData);
        toast.success("Skill updated successfully");
      } else {
        const newOrder =
          skills.length > 0 ? Math.max(...skills.map((s) => s.order)) + 1 : 0;
        await createSkill({ ...formData, order: newOrder });
        toast.success("Skill created successfully");
      }

      loadSkills();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save skill");
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      icon: skill.icon,
      color: skill.color,
      level: skill.level,
      description: skill.description,
      category: skill.category,
      order: skill.order,
    });
    setEditingId(skill._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill(id);
        toast.success("Skill deleted successfully");
        loadSkills();
      } catch (error) {
        toast.error("Failed to delete skill");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      icon: "",
      color: "text-cyan-400",
      level: "Intermediate",
      description: "",
      category: "frontend",
      order: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const moveSkill = async (id, direction) => {
    const index = skills.findIndex((s) => s._id === id);
    if (index === -1) return;

    const newSkills = [...skills];

    if (direction === "up" && index > 0) {
      [newSkills[index], newSkills[index - 1]] = [
        newSkills[index - 1],
        newSkills[index],
      ];
    } else if (direction === "down" && index < newSkills.length - 1) {
      [newSkills[index], newSkills[index + 1]] = [
        newSkills[index + 1],
        newSkills[index],
      ];
    } else {
      return;
    }

    newSkills.forEach((skill, idx) => {
      skill.order = idx;
    });

    setSkills(newSkills);

    try {
      await reorderSkills(newSkills);
      toast.success("Skills reordered");
    } catch (error) {
      toast.error("Failed to reorder skills");
      loadSkills();
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(skills);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    items.forEach((item, index) => {
      item.order = index;
    });

    setSkills(items);

    try {
      await reorderSkills(items);
      toast.success("Skills reordered");
    } catch (error) {
      toast.error("Failed to reorder skills");
      loadSkills();
    }
  };

  const filteredSkills =
    activeTab === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeTab);

  const categories = [
    { id: "all", name: "All", count: skills.length },
    {
      id: "frontend",
      name: "Frontend",
      count: skills.filter((s) => s.category === "frontend").length,
    },
    {
      id: "backend",
      name: "Backend",
      count: skills.filter((s) => s.category === "backend").length,
    },
    {
      id: "tools",
      name: "Tools",
      count: skills.filter((s) => s.category === "tools").length,
    },
    {
      id: "database",
      name: "Database",
      count: skills.filter((s) => s.category === "database").length,
    },
    {
      id: "design",
      name: "Design",
      count: skills.filter((s) => s.category === "design").length,
    },
  ];

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
            <h1 className="text-3xl font-bold text-white">Manage Skills</h1>
            <p className="text-slate-400">Add, edit, or reorder your skills</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 
              rounded-lg text-white font-semibold transition-colors"
          >
            <FaPlus /> Add New Skill
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === cat.id
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="skills">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {filteredSkills.map((skill, index) => (
                  <Draggable
                    key={skill._id}
                    draggableId={skill._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: snapshot.isDragging ? 1.05 : 1,
                        }}
                        className={`flex items-center gap-4 p-4 bg-slate-800 
                          rounded-xl border border-slate-700 ${
                            snapshot.isDragging
                              ? "shadow-2xl shadow-cyan-500/20"
                              : ""
                          }`}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-move"
                        >
                          <FaGripVertical className="text-slate-500 text-xl" />
                        </div>

                        <div className={`text-3xl ${skill.color}`}>
                          <div
                            dangerouslySetInnerHTML={{ __html: skill.icon }}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-1">
                            <h3 className="text-lg font-bold text-white">
                              {skill.name}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                skill.level === "Advanced"
                                  ? "bg-green-500/20 text-green-400"
                                  : skill.level === "Intermediate"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {skill.level}
                            </span>
                            <span className="px-2 py-1 text-xs bg-slate-700 rounded-full">
                              {skill.category}
                            </span>
                          </div>
                          <p className="text-slate-400 text-sm">
                            {skill.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => moveSkill(skill._id, "up")}
                            disabled={index === 0}
                            className={`p-2 rounded-lg ${
                              index === 0
                                ? "text-slate-700 cursor-not-allowed"
                                : "text-slate-400 hover:text-white hover:bg-slate-700"
                            }`}
                          >
                            <FaArrowUp />
                          </button>
                          <button
                            onClick={() => moveSkill(skill._id, "down")}
                            disabled={index === filteredSkills.length - 1}
                            className={`p-2 rounded-lg ${
                              index === filteredSkills.length - 1
                                ? "text-slate-700 cursor-not-allowed"
                                : "text-slate-400 hover:text-white hover:bg-slate-700"
                            }`}
                          >
                            <FaArrowDown />
                          </button>
                          <button
                            onClick={() => handleEdit(skill)}
                            className="p-2 text-yellow-400 hover:text-yellow-300 
                              hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(skill._id)}
                            className="p-2 text-red-400 hover:text-red-300 
                              hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {showForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-2xl w-full max-w-lg"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingId ? "Edit Skill" : "Add New Skill"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Skill Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                        rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Icon (HTML/SVG) *
                    </label>
                    <textarea
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                        rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., <FaReact /> or SVG code"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Color Class *
                      </label>
                      <select
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                          rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="text-cyan-400">
                          Cyan (text-cyan-400)
                        </option>
                        <option value="text-green-500">
                          Green (text-green-500)
                        </option>
                        <option value="text-blue-500">
                          Blue (text-blue-500)
                        </option>
                        <option value="text-yellow-500">
                          Yellow (text-yellow-500)
                        </option>
                        <option value="text-purple-500">
                          Purple (text-purple-500)
                        </option>
                        <option value="text-red-500">Red (text-red-500)</option>
                        <option value="text-pink-500">
                          Pink (text-pink-500)
                        </option>
                        <option value="text-orange-500">
                          Orange (text-orange-500)
                        </option>
                        <option value="text-white">White (text-white)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Level *
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                          rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
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
                      <option value="tools">Tools</option>
                      <option value="database">Database</option>
                      <option value="design">Design</option>
                      <option value="devops">DevOps</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                        rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., Building modern UIs with React hooks"
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-slate-700">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 
                        rounded-lg text-white font-semibold transition-colors"
                    >
                      {editingId ? "Update Skill" : "Create Skill"}
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

export default AdminSkills;
