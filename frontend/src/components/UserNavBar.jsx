import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import { FaPython, FaJsSquare, FaJava } from "react-icons/fa";
import { SiC, SiCplusplus } from "react-icons/si";
import { codeStore } from "../store/codeStore";

const UserNavBar = ({ onProfileClick }) => {
  const { logout, authUser } = useAuthStore();
  const { selectedLanguage, setLanguage } = codeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const languages = [
    { name: "cpp", icon: <SiCplusplus className="text-xl" /> },
    { name: "c", icon: <SiC className="text-xl" /> },
    { name: "java", icon: <FaJava className="text-xl" /> },
    { name: "python", icon: <FaPython className="text-xl" /> },
    { name: "javascript", icon: <FaJsSquare className="text-xl" /> },
  ];

  return (
    <nav className="nav-container">
      <div className="nav-content">
        {/* Logo */}
        <div className="logo-container">
          <span className="logo-text">Code</span>
          <span className="logo-x">X</span>
        </div>

        {/* Mobile Language Dropdown - Only shown in mobile view */}
        {isMobile && (
          <div className="relative mr-2">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex items-center gap-1 px-3 py-2 rounded-md bg-[#5C0000] hover:bg-[#7A0000] transition-colors"
            >
              <span className="text-white">
                {languages.find(lang => lang.name === selectedLanguage)?.icon}
              </span>
              {languageDropdownOpen ? (
                <IoChevronUpSharp className="text-white" />
              ) : (
                <IoChevronDownSharp className="text-white" />
              )}
            </button>
            
            {languageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#5C0000] border border-[#D72638] rounded-md shadow-lg z-50">
                {languages.map((language) => (
                  <button
                    key={language.name}
                    onClick={() => {
                      setLanguage(language.name);
                      setLanguageDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm ${
                      selectedLanguage === language.name
                        ? "bg-[#D72638] text-white"
                        : "text-[#FFCCCB] hover:bg-[#7A0000] hover:text-white"
                    }`}
                  >
                    {language.icon}
                    <span>{language.name.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Area */}
        <div className="auth-buttons">
          <button
            onClick={onProfileClick}
            className="button-54 profile-button"
          >
            {authUser.username}
          </button>
          <button
            onClick={logout}
            className="button-54"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="mobile-menu-button"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="mobile-menu">
          <li>
            <button onClick={onProfileClick} className="button-54 mobile-button">
              Profile
            </button>
          </li>
          <li>
            <button onClick={logout} className="button-54 mobile-button logout-button">
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default UserNavBar;