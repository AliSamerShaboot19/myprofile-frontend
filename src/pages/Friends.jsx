import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserFriends,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaGlobe,
  FaCode,
  FaPalette,
  FaServer,
  FaMobileAlt,
  FaGraduationCap,
  FaEnvelope,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiFlutter,
  SiFigma,
  SiAdobe,
} from "react-icons/si";
import { fetchFriends } from "../services/api";

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    try {
      const response = await fetchFriends();
      setFriends(response.data.data);
    } catch (error) {
      console.error("Error loading friends:", error);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      id: "all",
      name: "All Fields",
      icon: <FaUserFriends />,
      count: friends.length,
    },
    {
      id: "frontend",
      name: "Frontend",
      icon: <FaCode />,
      count: friends.filter((f) => f.field.toLowerCase().includes("frontend"))
        .length,
    },
    {
      id: "backend",
      name: "Backend",
      icon: <FaServer />,
      count: friends.filter((f) => f.field.toLowerCase().includes("backend"))
        .length,
    },
    {
      id: "design",
      name: "Design",
      icon: <FaPalette />,
      count: friends.filter((f) => f.field.toLowerCase().includes("design"))
        .length,
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: <FaMobileAlt />,
      count: friends.filter((f) => f.field.toLowerCase().includes("mobile"))
        .length,
    },
  ];

  const filteredFriends = friends.filter((friend) => {
    const matchesSearch =
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesField =
      selectedField === "all" ||
      friend.field.toLowerCase().includes(selectedField);

    return matchesSearch && matchesField;
  });

  const getFieldIcon = (field) => {
    const fieldLower = field.toLowerCase();
    if (fieldLower.includes("frontend"))
      return <SiReact className="text-3xl" />;
    if (fieldLower.includes("backend"))
      return <SiNodedotjs className="text-3xl" />;
    if (fieldLower.includes("design")) return <SiFigma className="text-3xl" />;
    if (fieldLower.includes("mobile"))
      return <SiFlutter className="text-3xl" />;
    if (fieldLower.includes("ai") || fieldLower.includes("data"))
      return <SiPython className="text-3xl" />;
    return <FaCode className="text-3xl" />;
  };

  const getFieldColor = (field) => {
    const fieldLower = field.toLowerCase();
    if (fieldLower.includes("frontend")) return "from-cyan-600 to-blue-600";
    if (fieldLower.includes("backend")) return "from-green-600 to-emerald-600";
    if (fieldLower.includes("design")) return "from-purple-600 to-pink-600";
    if (fieldLower.includes("mobile")) return "from-blue-600 to-cyan-600";
    if (fieldLower.includes("ai") || fieldLower.includes("data"))
      return "from-yellow-600 to-blue-600";
    return "from-gray-600 to-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
              <FaUserFriends className="text-cyan-400" />
              My{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Friends
              </span>
            </h1>
            <p className="text-slate-400">
              Connect with talented professionals across various tech fields
            </p>
          </div>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 mt-4 md:mt-0 
                bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <FaArrowLeft />
              Back to Home
            </motion.button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="col-span-1 md:col-span-3">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search friends by name, field, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 
                    rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-slate-400" />
              <span className="text-sm text-slate-400">Filter by:</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {fields.map((field) => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedField === field.id
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {field.icon}
                {field.name} ({field.count})
              </button>
            ))}
          </div>
        </div>

        {filteredFriends.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-2xl font-bold mb-2">No Friends Found</h3>
            <p className="text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFriends.map((friend, index) => (
              <motion.div
                key={friend._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden 
                  border border-slate-700 hover:border-cyan-500/50 transition-all duration-300
                  hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div
                  className={`relative h-32 bg-gradient-to-r ${getFieldColor(
                    friend.field
                  )}`}
                >
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-50"></div>
                      <img
                        src={
                          friend.avatar ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`
                        }
                        alt={friend.name}
                        className="relative w-24 h-24 rounded-full border-4 border-slate-800 bg-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-16 pb-6 px-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{friend.name}</h3>
                  <p className="text-cyan-400 font-semibold mb-1">
                    {friend.field}
                  </p>
                  <p className="text-sm text-slate-400 mb-4">
                    {friend.specialization}
                  </p>

                  <p className="text-slate-300 text-sm mb-6 line-clamp-3">
                    {friend.bio}
                  </p>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {friend.skills &&
                        friend.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-800/50 text-sm rounded-full border border-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 mb-6">
                    {friend.socialLinks &&
                      friend.socialLinks.map((social, idx) => (
                        <motion.a
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-2 bg-slate-800 hover:bg-slate-700 rounded-lg 
                          border border-slate-700 ${social.color} transition-all`}
                          title={`Visit ${social.platform}`}
                          dangerouslySetInnerHTML={{ __html: social.icon }}
                        />
                      ))}
                  </div>

                  <motion.a
                    href={`#`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 
                      rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    View Profile
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Network Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-cyan-400">
                {friends.length}
              </div>
              <p className="text-slate-400">Total Friends</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-green-400">
                {fields.filter((f) => f.id !== "all").length}
              </div>
              <p className="text-slate-400">Different Fields</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-purple-400">
                {friends.reduce(
                  (acc, friend) => acc + (friend.socialLinks?.length || 0),
                  0
                )}
              </div>
              <p className="text-slate-400">Social Links</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-yellow-400">
                {
                  [
                    ...new Set(
                      friends.flatMap((f) => f.skills || []).filter(Boolean)
                    ),
                  ].length
                }
              </div>
              <p className="text-slate-400">Unique Skills</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 border border-cyan-700/30">
            <h2 className="text-2xl font-bold mb-4">Want to Connect?</h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              I'm always looking to connect with talented developers, designers,
              and tech enthusiasts. If you're working on interesting projects or
              want to collaborate, let's connect!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 
                    rounded-lg font-bold text-lg shadow-lg hover:shadow-cyan-500/25 
                    transition-shadow"
                >
                  Contact Me
                </motion.button>
              </Link>
              <a
                href="mailto:ali.shaboot@example.com?subject=Network Connection"
                className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 
                  rounded-lg font-bold text-lg hover:bg-cyan-500/10 
                  transition-colors inline-block"
              >
                <FaEnvelope className="inline mr-2" />
                Send Introduction
              </a>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-800/50 rounded-xl inline-block">
            <p className="text-sm text-slate-500">
              <span className="text-cyan-400">🤝 Philosophy:</span> "Your
              network is your net worth in the tech industry"
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Friends;
