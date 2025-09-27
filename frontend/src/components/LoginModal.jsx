import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose, onSignupClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { login, authUser } = useAuthStore();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (authUser && authUser.user.username) {
      navigate(`/${authUser.user.username}`);
      window.location.reload();
    }
  }, [authUser, navigate]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal container */}
      <div 
        className={`relative z-10 bg-[#1A1A1A] border-2 border-[#D72638] rounded-xl p-6 w-full max-w-md mx-4 transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        {/* Close button */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-[#FFCCCB] hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* Modal header */}
        <div className="text-center mb-6">
          <div className="logo-container mx-auto mb-2">
            <span className="logo-text">Code</span>
            <span className="logo-x">X</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-[#FFCCCB] mt-1">Sign in to continue</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#FFCCCB] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#2D2D2D] text-white rounded-lg border border-[#5C0000] focus:outline-none focus:ring-2 focus:ring-[#D72638] focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#FFCCCB] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#2D2D2D] text-white rounded-lg border border-[#5C0000] focus:outline-none focus:ring-2 focus:ring-[#D72638] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="button-54 w-full mt-6 py-3 flex items-center justify-center"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[#FFCCCB]">
            Don't have an account?{" "}
            <button 
              onClick={() => { handleClose(); onSignupClick(); }} 
              className="text-[#D72638] font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;