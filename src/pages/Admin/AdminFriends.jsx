import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  fetchFriends,
  createFriend,
  updateFriend,
  deleteFriend,
} from "../../services/api";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaUpload,
  FaUser,
  FaLink,
} from "react-icons/fa";
import toast from "react-hot-toast";

const AdminFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    field: "",
    specialization: "",
    bio: "",
    skills: [],
    socialLinks: [],
    icon: "👤",
    color: "from-cyan-600 to-blue-600",
    avatar: null,
  });

  const [skillInput, setSkillInput] = useState("");
  const [socialInput, setSocialInput] = useState({
    platform: "",
    icon: "",
    url: "",
    color: "",
  });

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    try {
      const response = await fetchFriends();
      setFriends(response.data.data);
    } catch (error) {
      toast.error("Failed to load friends");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addSocialLink = () => {
    if (socialInput.platform && socialInput.url) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: [...prev.socialLinks, { ...socialInput }],
      }));
      setSocialInput({ platform: "", icon: "", url: "", color: "" });
    }
  };

  const removeSocialLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const friendFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "skills" || key === "socialLinks") {
          friendFormData.append(key, JSON.stringify(formData[key]));
        } else if (key === "avatar" && formData[key]) {
          friendFormData.append("avatar", formData[key]);
        } else {
          friendFormData.append(key, formData[key]);
        }
      });

      if (editingId) {
        await updateFriend(editingId, friendFormData);
        toast.success("Friend updated successfully");
      } else {
        await createFriend(friendFormData);
        toast.success("Friend added successfully");
      }

      loadFriends();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save friend");
    }
  };

  const handleEdit = (friend) => {
    setFormData({
      name: friend.name,
      field: friend.field,
      specialization: friend.specialization,
      bio: friend.bio,
      skills: friend.skills || [],
      socialLinks: friend.socialLinks || [],
      icon: friend.icon || "👤",
      color: friend.color || "from-cyan-600 to-blue-600",
      avatar: null,
    });
    setAvatarPreview(friend.avatar);
    setEditingId(friend._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this friend?")) {
      try {
        await deleteFriend(id);
        toast.success("Friend deleted successfully");
        loadFriends();
      } catch (error) {
        toast.error("Failed to delete friend");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      field: "",
      specialization: "",
      bio: "",
      skills: [],
      socialLinks: [],
      icon: "👤",
      color: "from-cyan-600 to-blue-600",
      avatar: null,
    });
    setAvatarPreview(null);
    setEditingId(null);
    setShowForm(false);
    setSkillInput("");
    setSocialInput({ platform: "", icon: "", url: "", color: "" });
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
            <h1 className="text-3xl font-bold text-white">Manage Friends</h1>
            <p className="text-slate-400">Add, edit, or delete your network</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 
              rounded-lg text-white font-semibold transition-colors"
          >
            <FaPlus /> Add New Friend
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {friends.map((friend) => (
            <motion.div
              key={friend._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700"
            >
              <div className={`h-32 bg-gradient-to-r ${friend.color}`}></div>

              <div className="p-6 pt-16">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-full bg-slate-700 
                    border-4 border-slate-800 -mt-12 overflow-hidden"
                  >
                    {friend.avatar ? (
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="w-full h-full p-4 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {friend.name}
                    </h3>
                    <p className="text-sm text-cyan-400">{friend.field}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {friend.specialization}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(friend)}
                    className="flex-1 flex items-center justify-center gap-2 
                      py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg 
                      text-white transition-colors"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(friend._id)}
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
                    {editingId ? "Edit Friend" : "Add New Friend"}
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
                          Name *
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
                          Field *
                        </label>
                        <input
                          type="text"
                          name="field"
                          value={formData.field}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                            rounded-lg text-white focus:outline-none focus:border-cyan-500"
                          placeholder="e.g., Frontend Developer"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Specialization *
                        </label>
                        <input
                          type="text"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                            rounded-lg text-white focus:outline-none focus:border-cyan-500"
                          placeholder="e.g., React & Next.js Specialist"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Bio *
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 
                            rounded-lg text-white focus:outline-none focus:border-cyan-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Avatar
                        </label>
                        <div
                          className="border-2 border-dashed border-slate-600 rounded-lg p-6 
                          text-center hover:border-cyan-500 transition-colors cursor-pointer"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                            id="avatar-upload"
                          />
                          <label
                            htmlFor="avatar-upload"
                            className="cursor-pointer"
                          >
                            {avatarPreview ? (
                              <div className="space-y-3">
                                <img
                                  src={avatarPreview}
                                  alt="Preview"
                                  className="w-32 h-32 rounded-full object-cover mx-auto"
                                />
                                <p className="text-sm text-slate-400">
                                  Click to change avatar
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <FaUpload className="text-4xl text-slate-500 mx-auto" />
                                <p className="text-slate-400">
                                  Click to upload avatar
                                </p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Skills
                        </label>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Enter skill"
                              value={skillInput}
                              onChange={(e) => setSkillInput(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), addSkill())
                              }
                              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 
                                rounded text-white text-sm"
                            />
                            <button
                              type="button"
                              onClick={addSkill}
                              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 
                                rounded-lg text-sm transition-colors"
                            >
                              Add
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-1 
                                bg-slate-700/50 rounded-lg"
                              >
                                <span className="text-sm">{skill}</span>
                                <button
                                  type="button"
                                  onClick={() => removeSkill(index)}
                                  className="text-red-400 hover:text-red-300 text-xs"
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
                          Social Links
                        </label>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Platform"
                              value={socialInput.platform}
                              onChange={(e) =>
                                setSocialInput({
                                  ...socialInput,
                                  platform: e.target.value,
                                })
                              }
                              className="px-3 py-2 bg-slate-700 border border-slate-600 
                                rounded text-white text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Icon (react-icons name)"
                              value={socialInput.icon}
                              onChange={(e) =>
                                setSocialInput({
                                  ...socialInput,
                                  icon: e.target.value,
                                })
                              }
                              className="px-3 py-2 bg-slate-700 border border-slate-600 
                                rounded text-white text-sm"
                            />
                            <input
                              type="url"
                              placeholder="URL"
                              value={socialInput.url}
                              onChange={(e) =>
                                setSocialInput({
                                  ...socialInput,
                                  url: e.target.value,
                                })
                              }
                              className="px-3 py-2 bg-slate-700 border border-slate-600 
                                rounded text-white text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Color class"
                              value={socialInput.color}
                              onChange={(e) =>
                                setSocialInput({
                                  ...socialInput,
                                  color: e.target.value,
                                })
                              }
                              className="px-3 py-2 bg-slate-700 border border-slate-600 
                                rounded text-white text-sm"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={addSocialLink}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 
                              rounded-lg text-sm transition-colors"
                          >
                            <FaLink /> Add Social Link
                          </button>

                          <div className="space-y-2">
                            {formData.socialLinks.map((link, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between 
                                px-3 py-2 bg-slate-700/50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <span className={link.color}>
                                    {link.icon}
                                  </span>
                                  <div>
                                    <p className="text-sm font-medium">
                                      {link.platform}
                                    </p>
                                    <p className="text-xs text-slate-400 truncate max-w-xs">
                                      {link.url}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeSocialLink(index)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            ))}
                          </div>
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
                      {editingId ? "Update Friend" : "Add Friend"}
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

export default AdminFriends;
