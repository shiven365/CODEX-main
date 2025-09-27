import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { toast } from "react-hot-toast";
import { Play, Trash2, Settings, Menu, X } from "lucide-react";
import { FaPython, FaJsSquare, FaJava } from "react-icons/fa";
import { SiC, SiCplusplus } from "react-icons/si";
import { AxiosInstance } from "../lib/axios";
import { codeStore } from "../store/codeStore";

const CodeEditor = ({ onCodeEditorSettingsClick }) => {
  const { selectedLanguage, setLanguage } = codeStore();
  const [code, setCode] = useState("// Write your code here...");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRunCode = async () => {
    try {
      const response = await AxiosInstance.post('/execute/code', { 
        language: selectedLanguage, 
        code, 
        userInput 
      });
      
      if (response.data.output.trim()) {
        setOutput(response.data.output);
        setError(false);
        toast.success("Code executed successfully!", { duration: 2000 });
      } else {
        setOutput(response.data.error);
        setError(true);
        toast.error("Execution error!", { duration: 2000 });
      }
    } catch (err) {
      setOutput("Error executing code");
      setError(true);
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    monaco.editor.defineTheme("carmine-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "FF5A5F", fontStyle: "italic" },
        { token: "keyword", foreground: "D72638", fontStyle: "bold" },
        { token: "string", foreground: "CE9178" },
      ],
      colors: {
        "editor.background": "#18181b",
        "editor.foreground": "#ffffff",
        "editor.lineHighlightBackground": "#333333",
        "editor.selectionBackground": "#264f78",
        "editorCursor.foreground": "#ffffff",
      },
    });

    monaco.editor.setTheme("carmine-theme");
    editor.updateOptions({
      fontSize: 13,
      minimap: { enabled: false },
      wordWrap: "on",
      automaticLayout: true,
      lineNumbers: "on",
    });
  };

  const languages = [
    { name: "cpp", icon: <SiCplusplus className="text-2xl" /> },
    { name: "c", icon: <SiC className="text-2xl" /> },
    { name: "java", icon: <FaJava className="text-2xl" /> },
    { name: "python", icon: <FaPython className="text-2xl" /> },
    { name: "javascript", icon: <FaJsSquare className="text-2xl" /> },
  ];

  return (
    <div className="font-raleway h-screen w-full bg-zinc-900 text-white flex flex-col md:flex-row overflow-hidden">

      {/* Sidebar */}
      {/* <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-16 transform' : 'flex'} 
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative md:w-auto transition-transform duration-300 ease-in-out `}>
        <div className="h-full ml-2 mt-[4rem] flex flex-col items-center space-y-4 p-2 bg-[#18191A] md:bg-[#0000000] rounded-r-lg md:rounded-lg overflow-y-auto  ">
          {languages.map((language) => (
            <button
              key={language.name}
              onClick={() => {
                setLanguage(language.name);
                if (isMobile) setIsMobileSidebarOpen(false);
              }}
              className={`relative group w-12 h-12 flex z-20 items-center justify-center rounded-lg border-2 transition-all
                ${selectedLanguage === language.name 
                  ? "border-[#D72638] bg-[#7A0000] text-white shadow-lg z-20" 
                  : "border-[#5C0000] bg-[#990000] text-[#FFCCCB] hover:bg-[#7A0000] hover:text-white z-20"}
              `}
            >
              {language.icon}
              <div className="absolute left-full ml-2 px-2 py-1 text-xs font-medium text-white bg-[#D72638] rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                {language.name}
              </div>
            </button>
          ))}
        </div>
      </div> */}
      <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-[100] w-20' : 'flex z-[100]'} 
    ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0 md:relative md:w-auto transition-transform duration-300 ease-in-out`}
>
    <div className="h-full ml-2 mt-[4rem] flex flex-col items-center space-y-4 p-2 bg-[#18191A] md:bg-[#0000000] rounded-r-lg md:rounded-lg overflow-visible">
        {languages.map((language) => (
            <div key={language.name} className="relative group" style={{ zIndex: 100 }}>
                <button
                    onClick={() => {
                        setLanguage(language.name);
                        if (isMobile) setIsMobileSidebarOpen(false);
                    }}
                    className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all
                        ${selectedLanguage === language.name 
                            ? "border-[#D72638] bg-[#7A0000] text-white shadow-lg" 
                            : "border-[#5C0000] bg-[#990000] text-[#FFCCCB] hover:bg-[#7A0000] hover:text-white"}
                    `}
                >
                    {language.icon}
                </button>
                {/* Tooltip with guaranteed visibility */}
                <div className="absolute left-full ml-3 px-3 py-1
                               text-xs font-medium text-white bg-[#D72638] 
                               rounded-md shadow-lg opacity-0 group-hover:opacity-100 
                               transition-opacity duration-200 whitespace-nowrap 
                               z-[9999] pointer-events-none"
                     style={{
                         transform: 'translateY(-50%)',
                         filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                         minWidth: 'max-content'
                     }}>
                    {language.name}
                    {/* Tooltip arrow */}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2
                                  w-0 h-0 border-t-[6px] border-t-transparent 
                                  border-b-[6px] border-b-transparent border-r-[6px] border-r-[#D72638]">
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
      





      {/* Overlay for mobile sidebar */}
      {/* {isMobileSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )} */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-2 md:p-4 overflow-hidden">
        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <div className="flex gap-2">
              <button
                onClick={handleRunCode}
                className="button-54 flex items-center gap-2"
              >
                <Play size={16} /> Run
              </button>
            </div>
            
            <div className="flex-1 mt-2 border-2 border-zinc-600 rounded-lg overflow-hidden">
              <MonacoEditor
                height="100%"
                language={selectedLanguage}
                value={code}
                onChange={(newValue) => setCode(newValue)}
                theme="carmine-theme"
                onMount={handleEditorDidMount}
                options={{
                  fontSize: 13,
                  minimap: { enabled: false },
                  wordWrap: "on",
                  automaticLayout: true,
                  lineNumbers: "on",
                }}
              />
            </div>
          </div>

          {/* Input/Output Section */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            <div className="flex gap-2">
              <button
                onClick={onCodeEditorSettingsClick}
                className="button-54 flex items-center gap-2"
              >
                <Settings size={16} /> Settings
              </button>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-auto">
              {/* Input */}
              <div className="flex-1 flex flex-col border-2 border-zinc-600 rounded-lg overflow-hidden bg-zinc-800">
                <div className="p-2 bg-zinc-700 border-b border-zinc-600">
                  <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                    Input: <span className="text-xs text-zinc-400">(optional)</span>
                  </h2>
                </div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 w-full p-3 bg-transparent text-white outline-none resize-none"
                  placeholder="Enter your runtime input here..."
                />
              </div>

              {/* Output */}
              <div className="flex-1 flex flex-col border-2 border-zinc-600 rounded-lg overflow-hidden bg-zinc-800">
                <div className="p-2 bg-zinc-700 border-b border-zinc-600 flex justify-between items-center">
                  <h2 className="text-sm font-semibold text-white">Output:</h2>
                  <button
                    onClick={() => {
                      setOutput("");
                      toast.success("Terminal cleared!", { duration: 2000 });
                    }}
                    className="button-54 flex items-center gap-2 text-xs px-2 py-1"
                    >
                    <Trash2 size={14} /> Clear
                  </button>
                </div>
                <pre
                  className={`flex-1 p-3 overflow-auto font-mono text-sm whitespace-pre-wrap break-words ${
                    error ? "bg-red-900/50 text-red-100" : "bg-cyan-900/20 text-white"
                  }`}
                >
                  {output || "No output yet..."}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;