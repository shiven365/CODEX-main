import express from "express";
import axios from "axios"; // Use axios directly in the backend
const router = express.Router();
import { LANGUAGE_VERSIONS } from "../constants.js";


const executeCode = async (language, code, userInput = "") => {
  try {
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", { // Make sure this hits the correct backend URL
      language,
      version: "*",
      files: [{ content: code }],
      stdin: userInput,
      args: userInput ? userInput.split(" ") : [],
    });
    return response.data;
  } catch (error) {
    console.error("Execution Error:", error);
    return { run: { stdout: "", stderr: "Error executing code" } };
  }
};



router.post("/code", async (req, res) => {

  try {
    const { language, code , userInput} = req.body;
    
    if (!language || !code) {
      return res.status(400).json({ error: "Language and code are required" });
    }

    // Send the code to the Piston API for execution
    const response = await executeCode(language, code, userInput);

    // Return the output from the API
    res.json({
      output: response.run.stdout,
      error: response.run.stderr || null,
    });
  } catch (err) {
    // console.error("Error:", err);
    res.status(500).json({ error: "error aa gayi bhai Internal Server Error" });
  }
});

export default router;


