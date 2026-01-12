import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUserFriends,
  FaProjectDiagram,
  FaCogs,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import Myphoto from "../assets/Myphoto.jpg";

const Header = () => {
  const navItems = [
    { icon: <FaHome />, label: "Home", to: "/" },
    { icon: <FaInfoCircle />, label: "About", to: "/about" },
    { icon: <FaEnvelope />, label: "Contact", to: "/contact" },
    { icon: <FaUserFriends />, label: "Friends", to: "/friends" },
    { icon: <FaProjectDiagram />, label: "Projects", to: "/projects" },
    { icon: <FaCogs />, label: "Skills", to: "/skills" },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-2 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex items-center justify-center lg:justify-start gap-3">
          <img
            src={Myphoto}
            alt="My Personal Avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400 shadow"
          />

          <div className="text-center lg:text-left">
            <h1 className="text-white text-3xl font-bold tracking-wide">
              <span className="text-cyan-400">IT</span>
              <span className="text-white"> Student</span>
            </h1>
            <p className="text-slate-300 text-sm mt-1">Ali Samer Shaboot</p>
          </div>
        </div>

        <div className="lg:hidden w-full">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>

        <nav className="w-full lg:w-auto">
          <ul className="flex justify-around items-center gap-2">
            {navItems.map((item, index) => (
              <Link key={index} to={item.to} className="group relative">
                <li className="flex flex-col items-center p-1 rounded-lg transition-all duration-300 hover:bg-slate-700/50">
                  <div className="text-cyan-300 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="text-xs text-slate-300 mt-1 group-hover:opacity-100 transition-opacity duration-300">
                    {item.label}
                  </span>

                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none lg:hidden">
                    {item.label}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
