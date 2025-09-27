import { create } from 'zustand'
import { AxiosInstance } from '../lib/axios'

import toast from 'react-hot-toast'
export const useAuthStore = create((set) => ({

  authUser: null,
  isCheckingAuth: false,
  isLoggingIn: false,
  isSigningIn: false,
  key:0,

  checkAuth: async () => {  
    try {
      set({ isCheckingAuth: true })
      console.log("In checkAuth")
      console.log("Cookies received:");
      console.log(document.cookie); // Log the cookies to see if they are being sent
      const response = await AxiosInstance.get('/auth/check-auth');
      console.log("Response from checkAuth",response.data)
      set({ authUser: response.data })

    } catch (error) {
      console.log("Error in useAuthStore.js checking Auth", error.message)
      set({ authUser: null })

    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {

    set({ isSigningIn: true })

    try {
      const userData = await AxiosInstance.post('/auth/signup', data);

      console.log("Logging frm useAuthStore.js",userData.data)
      
      set((state) => ({ ...state, authUser: userData.data }))
      toast.success("Account Created Successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningIn: false })
    }

  },

  // logout: async () => {
  //   try {
  //     await AxiosInstance.post('/auth/logout');
  //     set({ authUser: null })
  //     toast.success("Logged out Successfully")
  //   } catch (error) {
  //     toast.error(error.response.data.message)
  //   }
  // },

  logout: async () => {
    try {
      await AxiosInstance.post('/auth/logout');
      set({ authUser: null, key: Math.random() }); // Ensure UI re-renders
      toast.success("Logged out Successfully");
      window.location.href = "/"; // Ensure navigation happens cleanly
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  
  login: async (data) => {
    set({ isLoggingIn: true })
    try {
      const userData = await AxiosInstance.post('/auth/login', data);
      set((state) => ({ ...state, authUser: userData.data }))
      toast.success("Logged in Successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false })
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true })
    try {
      const userData = await AxiosInstance.put('/auth/update-profile', data);
      set({ authUser: userData.data })
      toast.success("Profile Updated Successfully")
    } catch (error) {
      toast.error("File Too large (Max limit 10mb)")
    } finally {
      set({ isUpdatingProfile: false })
    }
  },



}))


  