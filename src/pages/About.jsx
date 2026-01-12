import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaCode,
  FaLightbulb,
  FaRocket,
  FaHeart,
  FaUsers,
  FaArrowLeft,
  FaGlobe,
  FaCalendarAlt,
  FaUniversity,
  FaAward,
  FaBook,
  FaBrain,
} from "react-icons/fa";
import { SiReact, SiNodedotjs, SiMongodb, SiExpress } from "react-icons/si";

const About = () => {
  const timeline = [
    {
      year: "2026",
      title: "MERN Stack Mastery",
      description:
        "Deep dive into full-stack development with focus on advanced React patterns and scalable backend architecture",
      icon: <FaCode />,
      color: "border-cyan-500",
    },
    {
      year: "2025",
      title: "University Journey",
      description:
        "Started 3rd year in Information Technology at Homs University, focusing on software engineering principles",
      icon: <FaGraduationCap />,
      color: "border-green-500",
    },
    {
      year: "2024",
      title: "First Web Projects",
      description:
        "Built and deployed multiple web applications, learning frontend and backend technologies",
      icon: <FaRocket />,
      color: "border-purple-500",
    },
    {
      year: "2023",
      title: "Programming Foundations",
      description:
        "Started learning programming fundamentals with JavaScript and web technologies",
      icon: <FaBook />,
      color: "border-yellow-500",
    },
  ];

  const values = [
    {
      icon: <FaCode />,
      title: "Clean Code",
      description:
        "Writing maintainable, readable, and efficient code that stands the test of time",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description:
        "Constantly exploring new technologies and approaches to solve problems creatively",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: <FaUsers />,
      title: "Collaboration",
      description:
        "Believing that great products are built through teamwork and shared knowledge",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: <FaHeart />,
      title: "Passion",
      description:
        "Driven by genuine interest and love for creating impactful digital experiences",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
  ];

  const technologies = [
    {
      category: "Frontend",
      stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
      icon: <SiReact className="text-4xl" />,
      color: "from-cyan-600 to-blue-600",
    },
    {
      category: "Backend",
      stack: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth"],
      icon: <SiNodedotjs className="text-4xl" />,
      color: "from-green-600 to-emerald-600",
    },
    {
      category: "Tools",
      stack: ["Git & GitHub", "VS Code", "Postman", "Figma", "Vite"],
      icon: <FaCode className="text-4xl" />,
      color: "from-purple-600 to-pink-600",
    },
  ];

  const funFacts = [
    {
      icon: <FaGlobe />,
      fact: "Building web applications since 2022",
      detail: "Started with simple HTML/CSS websites",
    },
    {
      icon: <FaCalendarAlt />,
      fact: "Spend 4+ hours daily coding",
      detail: "Continuous learning and practice",
    },
    {
      icon: <FaUniversity />,
      fact: "IT Student at Homs University",
      detail: "Expected graduation: 2025",
    },
    {
      icon: <FaAward />,
      fact: "Self-taught developer",
      detail: "Passionate about learning new technologies",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              About{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Me
              </span>
            </h1>
            <p className="text-slate-400">
              Get to know my journey, values, and what drives me as a developer
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-12 border border-slate-700"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <FaBrain className="mr-3 text-cyan-400" />
                My Story
              </h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                I'm{" "}
                <span className="font-bold text-cyan-400">
                  Ali Samer Shaboot
                </span>
                , a passionate Information Technology student at Homs University
                with a deep love for full-stack web development. My journey
                began with curiosity about how websites work, and has evolved
                into a mission to build applications that solve real-world
                problems.
              </p>
              <p className="text-slate-400 leading-relaxed">
                As a MERN stack developer, I enjoy the entire process of
                bringing ideas to life - from designing intuitive user
                interfaces to building robust server-side architectures. I
                believe in continuous learning and staying updated with the
                latest technologies to deliver modern, efficient solutions.
              </p>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl p-6 border border-cyan-700/30">
                <h3 className="text-xl font-bold mb-4 text-cyan-300">
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  {funFacts.map((fact, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-cyan-400 mt-1">{fact.icon}</div>
                      <div>
                        <p className="font-semibold">{fact.fact}</p>
                        <p className="text-sm text-slate-400">{fact.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            My <span className="text-cyan-400">Development</span> Journey
          </h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-500"></div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border-4 border-cyan-500 z-10"></div>

                  <div
                    className={`ml-12 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border ${item.color} shadow-lg`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-cyan-400">{item.icon}</div>
                        <span className="text-xl font-bold">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            My <span className="text-cyan-400">Core</span> Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${value.bgColor} border border-slate-700 rounded-2xl p-6 
                  hover:border-cyan-500/50 transition-all duration-300`}
              >
                <div className={`${value.color} text-4xl mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Technical <span className="text-cyan-400">Expertise</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">{tech.category}</h3>
                  <div
                    className={`bg-gradient-to-r ${tech.color} p-3 rounded-lg`}
                  >
                    {tech.icon}
                  </div>
                </div>
                <ul className="space-y-3">
                  {tech.stack.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 border border-cyan-700/30 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            My <span className="text-cyan-300">Development</span> Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">
                Approach to Problems
              </h3>
              <p className="text-slate-300 leading-relaxed">
                I believe in understanding the problem thoroughly before jumping
                into code. Whether it's a complex business logic or a simple UI
                improvement, I break it down into manageable pieces and tackle
                each with precision and creativity.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">
                Learning Mindset
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Technology evolves rapidly, and so do I. Every project is an
                opportunity to learn something new. I stay curious, experiment
                with emerging technologies, and continuously refine my skills to
                stay at the forefront of web development.
              </p>
            </div>
          </div>
        </motion.div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Future <span className="text-cyan-400">Goals</span> & Aspirations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
              <div className="text-cyan-400 text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Short-term Goals</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Master advanced React patterns</li>
                <li>• Contribute to open-source projects</li>
                <li>• Build 3 more full-stack applications</li>
                <li>• Learn GraphQL in depth</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
              <div className="text-green-400 text-3xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-3">Academic Goals</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Graduate with distinction</li>
                <li>• Complete final year project in AI/ML</li>
                <li>• Publish research paper</li>
                <li>• Attend tech conferences</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
              <div className="text-purple-400 text-3xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-3">Career Aspirations</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Work on impactful tech projects</li>
                <li>• Lead development teams</li>
                <li>• Mentor aspiring developers</li>
                <li>• Start tech entrepreneurship journey</li>
              </ul>
            </div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4">
              Let's Connect & Collaborate
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Whether you're looking for a developer, want to collaborate on a
              project, or just want to talk tech, I'm always open to new
              opportunities and conversations.
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
                  Get In Touch
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
                  View My Work
                </motion.button>
              </Link>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-800/50 rounded-xl inline-block">
            <p className="text-sm text-slate-500">
              <span className="text-cyan-400">💡 Philosophy:</span> "Code is
              poetry, and every project is a story waiting to be told"
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
