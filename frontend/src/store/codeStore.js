import { create } from 'zustand';
import toast from 'react-hot-toast';

export const codeStore = create((set) => ({
  selectedLanguage: "cpp",

  setLanguage: (lang) => {
    try {
      set({ selectedLanguage: lang });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  
}));


