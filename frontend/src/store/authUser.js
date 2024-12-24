import axios from "axios";
import {create} from "zustand";
import toast from "react-hot-toast"

export const useAuthStore = create((set)=>({
    user: null,
    isSigningUp: false,
    isCheckingAuh: true,
    isLogingOut:false,
    isLoggingIn: false,
 
    signup: async(credentials)=>{
        set({isSigningUp:true})
        try {
            const response = await axios.post("/api/v1/auth/signup",credentials);
            set({user:response.data.user, isSigningUp:false});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
            set({isSigningUp:false, user:null})
        }
    },
    login: async(credentials)=>{
     set({isLoggingIn: false})
     try {
          const response = await axios.post("/api/v1/auth/login", credentials)
          set({user:response.data.user, isLoggingIn: false})
        
     } catch (error) {
        set({isLoggingIn:false, user:null})
        toast.error(error.response.data.message || "Login failed")
        
     }
    },

    logout: async()=>{
        set({isLogingOut:true})
        try {
            await axios.post("/api/v1/auth/logout")
            set({user:null, isLogingOut:false})
            toast.success("Logged out successfully")

        } catch (error) {
            set({isLogingOut:false})
            toast.error(error.response.data.message || "Logout failed")
        }
    },
    authCheck: async()=>{
        set({isCheckingAuh: true});
        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            set({user: response.data.user, isCheckingAuh:false})
        } catch (error) {
            set({isCheckingAuh: false, user:null});
             // toast.error(error.response.data.message || "An error occured")
        }
    },
}))