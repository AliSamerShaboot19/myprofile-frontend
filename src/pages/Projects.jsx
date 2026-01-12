import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaShoppingCart,
  FaUserLock,
  FaCheckCircle,
  FaCloudSun,
  FaUserCircle,
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaJs,
  FaKey,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiRedux,
  SiFirebase,
} from "react-icons/si";
import { fetchProjects } from "../services/api";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetchProjects();
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "All Projects", count: projects.length },
    {
      id: "fullstack",
      name: "Full Stack",
      count: projects.filter((p) => p.category === "fullstack").length,
    },
    {
      id: "frontend",
      name: "Frontend",
      count: projects.filter((p) => p.category === "frontend").length,
    },
    {
      id: "backend",
      name: "Backend",
      count: projects.filter((p) => p.category === "backend").length,
    },
    {
      id: "mobile",
      name: "Mobile",
      count: projects.filter((p) => p.category === "mobile").length,
    },
    {
      id: "design",
      name: "Design",
      count: projects.filter((p) => p.category === "design").length,
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "fullstack":
        return <FaShoppingCart className="text-3xl" />;
      case "backend":
        return <FaUserLock className="text-3xl" />;
      case "frontend":
        return <FaCheckCircle className="text-3xl" />;
      case "mobile":
        return <FaCloudSun className="text-3xl" />;
      case "design":
        return <FaUserCircle className="text-3xl" />;
      default:
        return <FaReact className="text-3xl" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "fullstack":
        return "from-cyan-600 to-blue-600";
      case "frontend":
        return "from-green-600 to-emerald-600";
      case "backend":
        return "from-purple-600 to-pink-600";
      case "mobile":
        return "from-orange-600 to-red-600";
      case "design":
        return "from-pink-600 to-rose-600";
      default:
        return "from-gray-600 to-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500"></div>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              My{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-slate-400">
              Explore my latest work and personal projects
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.slice(0, 4).map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                filter === cat.id
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 bg-slate-800/50"
              }`}
              onClick={() => setFilter(cat.id)}
            >
              <h3 className="text-xl font-bold">{cat.name}</h3>
              <p className="text-3xl font-bold mt-2">{cat.count}</p>
              <p className="text-slate-400 text-sm">Projects</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === cat.id
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold mb-2">No Projects Found</h3>
            <p className="text-slate-400">
              {filter === "all"
                ? "No projects added yet"
                : `No ${filter} projects found`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 
                  backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700
                  hover:border-cyan-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-blue-900/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">
                      {getCategoryIcon(project.category)}
                    </div>
                  </div>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryColor(
                        project.category
                      )}`}
                    >
                      {project.category === "fullstack"
                        ? "Full Stack"
                        : project.category === "frontend"
                        ? "Frontend"
                        : project.category === "backend"
                        ? "Backend"
                        : project.category === "mobile"
                        ? "Mobile"
                        : "Design"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-slate-400 mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-cyan-300">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features &&
                        project.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-900/50 rounded-lg text-sm border border-slate-700"
                          >
                            {feature}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-cyan-300">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies &&
                        project.technologies.map((tech, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 rounded-lg border border-slate-700"
                          >
                            <div
                              className={tech.color || "text-cyan-400"}
                              dangerouslySetInnerHTML={{ __html: tech.icon }}
                            />
                            <span className="text-sm">{tech.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                          bg-slate-900 hover:bg-slate-800 rounded-lg font-semibold 
                          border border-slate-700 transition-colors"
                      >
                        <FaGithub />
                        View Code
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                          bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 
                          rounded-lg font-semibold transition-all"
                      >
                        <FaExternalLinkAlt />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting
              projects. Whether you need a full-stack application or a modern
              frontend, let's create something amazing together.
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
                  Let's Work Together
                </motion.button>
              </Link>
              <Link to="/skills">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 
                    rounded-lg font-bold text-lg hover:bg-cyan-500/10 
                    transition-colors"
                >
                  View My Skills
                </motion.button>
              </Link>
            </div>
          </div>

          <p className="mt-8 text-slate-500">
            💡 Each project represents a unique challenge and learning
            opportunity
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;
