import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaKey,
  FaServer,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaBootstrap,
  FaSass,
  FaArrowLeft,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiRedux,
  SiNextdotjs,
  SiTypescript,
  SiGraphql,
  SiFirebase,
  SiPostman,
  SiVite,
  SiJest,
} from "react-icons/si";
import { fetchSkills, fetchSkillCategories } from "../services/api";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const [skillsResponse, categoriesResponse] = await Promise.all([
        fetchSkills(),
        fetchSkillCategories(),
      ]);
      setSkills(skillsResponse.data.data);
      setCategories(categoriesResponse.data.data);
    } catch (error) {
      console.error("Error loading skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSkillsToDisplay = () => {
    if (activeTab === "all") return skills;
    return skills.filter((skill) => skill.category === activeTab);
  };

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "advanced":
        return "bg-green-500";
      case "intermediate":
        return "bg-yellow-500";
      case "beginner":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getIconComponent = (iconString) => {
    // This is a simple mapping - in a real app, you might want to parse the icon string
    // or store icon names instead of full HTML
    return <div dangerouslySetInnerHTML={{ __html: iconString }} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const frontendCount = skills.filter((s) => s.category === "frontend").length;
  const backendCount = skills.filter((s) => s.category === "backend").length;
  const toolsCount = skills.filter((s) => s.category === "tools").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              My Skills & Technologies
            </h1>
            <p className="text-slate-400">
              Full-stack development expertise across multiple technologies
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 rounded-2xl p-6 border border-cyan-700/30">
            <h3 className="text-2xl font-bold mb-2">Frontend</h3>
            <p className="text-4xl font-bold text-cyan-400">{frontendCount}+</p>
            <p className="text-slate-400 mt-2">Technologies mastered</p>
          </div>
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-2xl p-6 border border-green-700/30">
            <h3 className="text-2xl font-bold mb-2">Backend</h3>
            <p className="text-4xl font-bold text-green-400">{backendCount}+</p>
            <p className="text-slate-400 mt-2">Server-side technologies</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl p-6 border border-purple-700/30">
            <h3 className="text-2xl font-bold mb-2">Tools</h3>
            <p className="text-4xl font-bold text-purple-400">{toolsCount}+</p>
            <p className="text-slate-400 mt-2">Development tools</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "all"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            All Skills ({skills.length})
          </button>
          {categories.map((cat) => {
            const count = skills.filter((s) => s.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === cat
                    ? cat === "frontend"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                      : cat === "backend"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600"
                      : "bg-gradient-to-r from-purple-600 to-pink-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getSkillsToDisplay().map((skill, index) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 
                backdrop-blur-sm rounded-xl p-5 border border-slate-700 
                hover:border-cyan-500/30 transition-all duration-300 
                hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-4xl ${skill.color}`}>
                  {getIconComponent(skill.icon)}
                </div>
                <span
                  className={`${getLevelColor(
                    skill.level
                  )} text-xs px-2 py-1 rounded-full font-semibold`}
                >
                  {skill.level}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{skill.description}</p>
              <span className="inline-block px-3 py-1 bg-slate-900/50 text-xs rounded-full border border-slate-700">
                {skill.category}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-bold mb-4">Proficiency Levels</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span>Advanced - Extensive experience</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span>Intermediate - Comfortable & productive</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span>Beginner - Learning & building</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-slate-300 mb-6">
            Interested in working together or want to know more about my
            technical expertise?
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
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 
                  rounded-lg font-bold text-lg hover:bg-cyan-500/10 
                  transition-colors"
              >
                View Projects
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;
