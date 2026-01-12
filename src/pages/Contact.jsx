import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaArrowLeft,
  FaPaperPlane,
  FaCheckCircle,
  FaUser,
  FaCommentAlt,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);

      setIsSubmitting(false);
      setIsSubmitted(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "ali.shaboot@example.com",
      link: "mailto:ali.shaboot@example.com",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      value: "+963 123 456 789",
      link: "tel:+963123456789",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "Homs, Syria",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com/yourusername",
      color: "hover:text-gray-300",
      bgColor: "bg-gray-900 hover:bg-gray-800",
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-400",
      bgColor: "bg-blue-900/30 hover:bg-blue-900/50",
    },
    {
      icon: <FaTelegram />,
      name: "Telegram",
      url: "https://t.me/yourusername",
      color: "hover:text-cyan-400",
      bgColor: "bg-cyan-900/30 hover:bg-cyan-900/50",
    },
    {
      icon: <FaTwitter />,
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      color: "hover:text-sky-400",
      bgColor: "bg-sky-900/30 hover:bg-sky-900/50",
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
              Get In{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-slate-400">
              Let's discuss your project and build something amazing together
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaCommentAlt className="mr-3 text-cyan-400" />
                Contact Information
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700"
                  >
                    <div
                      className={`p-3 rounded-lg ${info.bgColor} ${info.color}`}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-400">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg 
                        ${social.bgColor} ${social.color} transition-all duration-300
                        border border-slate-700`}
                    >
                      {social.icon}
                      <span className="hidden sm:inline">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl border border-cyan-700/30">
                <h4 className="font-bold text-cyan-300 mb-2">Response Time</h4>
                <p className="text-sm text-slate-400">
                  I typically respond within 24 hours. For urgent matters, feel
                  free to call.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaPaperPlane className="mr-3 text-cyan-400" />
                Send a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as
                    possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 border-2 border-cyan-500 text-cyan-400 
                      rounded-lg font-bold hover:bg-cyan-500/10 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">
                        <FaUser className="inline mr-2" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border 
                          ${errors.name ? "border-red-500" : "border-slate-700"}
                          focus:border-cyan-500 focus:outline-none transition-colors`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-2">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">
                        <FaEnvelope className="inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border 
                          ${
                            errors.email ? "border-red-500" : "border-slate-700"
                          }
                          focus:border-cyan-500 focus:outline-none transition-colors`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-2">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-slate-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700
                        focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium mb-2 text-slate-300">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border 
                        ${
                          errors.message ? "border-red-500" : "border-slate-700"
                        }
                        focus:border-cyan-500 focus:outline-none transition-colors resize-none`}
                      placeholder="Tell me about your project or inquiry..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3
                      ${
                        isSubmitting
                          ? "bg-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-2xl hover:shadow-cyan-500/25"
                      } transition-all duration-300`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}

              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-sm text-slate-500 text-center">
                  Your information is secure and will never be shared with third
                  parties.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-bold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="font-bold text-cyan-300 mb-2">
                    What happens after I send a message?
                  </h4>
                  <p className="text-sm text-slate-400">
                    I'll review your message and respond within 24 hours. We can
                    then schedule a call to discuss your project in detail.
                  </p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="font-bold text-cyan-300 mb-2">
                    Do you work on freelance projects?
                  </h4>
                  <p className="text-sm text-slate-400">
                    Yes! I'm open to freelance opportunities, especially
                    full-stack web applications using the MERN stack.
                  </p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="font-bold text-cyan-300 mb-2">
                    What is your typical response time?
                  </h4>
                  <p className="text-sm text-slate-400">
                    I aim to respond to all inquiries within 24 hours on
                    business days.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 border border-cyan-700/30">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Whether you need a full-stack application, website, or technical
              consultation, I'm here to help bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 
                    rounded-lg font-bold text-lg shadow-lg hover:shadow-cyan-500/25 
                    transition-shadow"
                >
                  View My Projects
                </motion.button>
              </Link>
              <a
                href="mailto:ali.shaboot@example.com"
                className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 
                  rounded-lg font-bold text-lg hover:bg-cyan-500/10 
                  transition-colors inline-block"
              >
                Email Directly
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
