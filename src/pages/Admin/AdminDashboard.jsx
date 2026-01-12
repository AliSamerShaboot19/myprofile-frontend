import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaProjectDiagram,
  FaUserFriends,
  FaCode,
  FaChartBar,
  FaSignOutAlt,
  FaHome,
  FaCog,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { fetchProjects, fetchFriends, fetchSkills } from "../../services/api";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const { data: friendsData } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  const { data: skillsData } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  const stats = [
    {
      title: "Total Projects",
      value: projectsData?.data.count || 0,
      icon: <FaProjectDiagram className="text-3xl" />,
      color: "from-cyan-600 to-blue-600",
      link: "/admin/projects",
    },
    {
      title: "Friends Network",
      value: friendsData?.data.count || 0,
      icon: <FaUserFriends className="text-3xl" />,
      color: "from-green-600 to-emerald-600",
      link: "/admin/friends",
    },
    {
      title: "Skills",
      value: skillsData?.data.count || 0,
      icon: <FaCode className="text-3xl" />,
      color: "from-purple-600 to-pink-600",
      link: "/admin/skills",
    },
    {
      title: "Categories",
      value: "6",
      icon: <FaChartBar className="text-3xl" />,
      color: "from-orange-600 to-red-600",
      link: "/admin",
    },
  ];

  const quickActions = [
    {
      icon: <FaProjectDiagram />,
      label: "Add Project",
      link: "/admin/projects",
      color: "bg-cyan-600",
    },
    {
      icon: <FaUserFriends />,
      label: "Add Friend",
      link: "/admin/friends",
      color: "bg-green-600",
    },
    {
      icon: <FaCode />,
      label: "Add Skill",
      link: "/admin/skills",
      color: "bg-purple-600",
    },
    {
      icon: <FaCog />,
      label: "Settings",
      link: "/admin/settings",
      color: "bg-slate-600",
    },
  ];

  const recentProjects = projectsData?.data.data.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">Welcome back, {user?.username}!</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 
                hover:bg-slate-700 rounded-lg transition-colors text-white"
              >
                <FaHome /> View Site
              </button>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 
                hover:bg-red-700 rounded-lg transition-colors text-white"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link to={stat.link} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 
                  cursor-pointer hover:shadow-xl transition-all`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-300 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-white/80">{stat.icon}</div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link to={action.link} key={index}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`${action.color} p-6 rounded-xl text-center 
                        hover:shadow-lg transition-all cursor-pointer`}
                    >
                      <div className="text-white text-2xl mb-3">
                        {action.icon}
                      </div>
                      <p className="text-white font-semibold">{action.label}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Recent Projects
                </h2>
                <Link
                  to="/admin/projects"
                  className="text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center gap-4 p-4 
                    bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                      <span className="text-lg">{project.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {project.category}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        project.category === "frontend"
                          ? "bg-blue-500/20 text-blue-400"
                          : project.category === "backend"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-6">
                System Status
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Database</p>
                    <p className="text-sm text-slate-400">MongoDB Connection</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">API Server</p>
                    <p className="text-sm text-slate-400">Express.js Running</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Storage</p>
                    <p className="text-sm text-slate-400">File Uploads</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Authentication</p>
                    <p className="text-sm text-slate-400">JWT Active</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg">
                <h3 className="font-bold text-cyan-300 mb-2">Quick Tips</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Keep project images under 1MB</li>
                  <li>• Use SVG icons for skills</li>
                  <li>• Organize friends by field</li>
                  <li>• Update skills regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
