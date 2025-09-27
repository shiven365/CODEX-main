import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const ProfileModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { authUser } = useAuthStore();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const [username, setUsername] = useState(authUser?.username || "");
  const [email, setEmail] = useState(authUser?.email || "");

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically save the changes to your backend
    // For now, we'll just close the modal
    handleClose();
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
          <h2 className="text-2xl font-bold text-white">Profile</h2>
          <p className="text-[#FFCCCB] mt-1">See your account details</p>
        </div>

        {/* Profile form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#FFCCCB] mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              disabled
              className="w-full px-4 py-2 bg-[#2D2D2D] text-white rounded-lg border border-[#5C0000] focus:outline-none focus:ring-2 focus:ring-[#D72638] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#FFCCCB] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 bg-[#2D2D2D] text-white rounded-lg border border-[#5C0000] focus:outline-none focus:ring-2 focus:ring-[#D72638] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="button-54 w-full mt-6 py-3 flex items-center justify-center"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;