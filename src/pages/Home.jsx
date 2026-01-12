import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaCode,
  FaDatabase,
  FaServer,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss } from "react-icons/si";
import Myphoto from "../assets/Myphoto.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const techStack = [
    { icon: <FaReact />, name: "React.js", color: "text-cyan-400" },
    { icon: <FaNodeJs />, name: "Node.js", color: "text-green-500" },
    { icon: <SiMongodb />, name: "MongoDB", color: "text-green-600" },
    { icon: <SiExpress />, name: "Express.js", color: "text-gray-300" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50"></div>
            <img
              src={Myphoto}
              alt="Ali Samer Shaboot"
              className="relative w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-cyan-400 shadow-2xl"
            />
          </motion.div>

          <div className="lg:w-2/3 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Ali Samer Shaboot
              </span>
            </motion.h1>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.p
                variants={itemVariants}
                className="text-xl text-slate-300"
              >
                <FaGraduationCap className="inline mr-2 text-cyan-400" />
                <span className="font-semibold">IT Student</span> at Homs
                University
              </motion.p>

              <motion.p variants={itemVariants} className="text-2xl font-bold">
                <FaCode className="inline mr-2 text-green-400" />
                Full-Stack MERN Developer
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg text-slate-300"
              >
                Passionate about building modern, responsive web applications
                with cutting-edge technologies
              </motion.p>
            </motion.div>
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="border-b-4 border-cyan-500 pb-2">
              My Tech Stack
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center 
                         border border-slate-700 hover:border-cyan-500/50 
                         transition-all duration-300 "
              >
                <div className={`text-4xl mb-3 ${tech.color}`}>{tech.icon}</div>
                <p className="font-semibold">{tech.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-center"
          >
            <Link to="/skills">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 
                       rounded-lg font-bold text-lg shadow-lg 
                       hover:shadow-cyan-500/25 transition-shadow"
              >
                View More Skills
              </motion.button>
            </Link>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          <div
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 
                        border border-slate-700 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FaCode className="mr-3 text-cyan-400" />
              About My Journey
            </h3>
            <p className="text-slate-300 leading-relaxed">
              I'm a dedicated Information Technology student at Homs University
              with a strong focus on full-stack web development. My journey in
              programming started with curiosity and has evolved into a passion
              for creating efficient, scalable, and user-friendly applications.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                Specialized in MERN Stack development
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                Experienced in building RESTful APIs
              </li>
            </ul>
          </div>

          <div
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 
                        border border-slate-700 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FaGraduationCap className="mr-3 text-green-400" />
              Education & Goals
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Currently pursuing my degree in Information Technology, I'm
              constantly expanding my knowledge and skills in web development.
              My academic journey complements my practical experience, providing
              a solid foundation in computer science fundamentals.
            </p>
            <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
              <h4 className="font-bold text-cyan-300 mb-2">Current Focus:</h4>
              <p className="text-sm text-slate-300">
                • Mastering advanced React patterns & TypeScript
                <br />• Building real-world projects to solve problems
              </p>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 
                       rounded-lg font-bold text-lg shadow-lg 
                       hover:shadow-cyan-500/25 transition-shadow"
              >
                View My Projects
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 
                       rounded-lg font-bold text-lg hover:bg-cyan-500/10 
                       transition-colors"
              >
                Contact Me
              </motion.button>
            </Link>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-8 text-slate-400 text-sm"
          >
            🚀 Always learning, always building, always improving
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
