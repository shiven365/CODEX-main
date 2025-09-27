import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignUpModal";

const HomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <>
      <Navbar 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onSignupClick={() => setIsSignupModalOpen(true)} 
      />
      <CodeEditor />

      {isLoginModalOpen && <LoginModal onSignupClick={() => setIsSignupModalOpen(true)} onClose={() => setIsLoginModalOpen(false)} />} 
      {isSignupModalOpen && <SignupModal  onLoginClick={() => setIsLoginModalOpen(true)} onClose={() => setIsSignupModalOpen(false)} />} 
    </>
  );
};

export default HomePage;
