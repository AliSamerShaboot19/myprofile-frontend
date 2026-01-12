import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser, FaSignInAlt } from "react-icons/fa";
import { login } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(credentials);

      if (response.data.success) {
        authLogin(response.data.user, response.data.token);
        toast.success("Welcome back!");
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-slate-700"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mb-4">
            <FaLock className="text-2xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 
                  rounded-lg text-white focus:outline-none focus:border-cyan-500 
                  placeholder:text-slate-500"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 
                  rounded-lg text-white focus:outline-none focus:border-cyan-500 
                  placeholder:text-slate-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 
              hover:from-cyan-700 hover:to-blue-700 rounded-lg text-white font-semibold 
              flex items-center justify-center gap-3 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Signing in...
              </>
            ) : (
              <>
                <FaSignInAlt /> Sign In
              </>
            )}
          </button>

          <div className="text-center pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-500">
              Contact the administrator if you don't have access
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
