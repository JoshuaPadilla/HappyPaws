import { signinForm, signupForm, User } from "@/types/type";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { usePetStore } from "./usePets";
import { useUserStore } from "./useUser";
import { BASE_URL } from "@/constants";
import { useAppointmentsStore } from "./useAppointments";
import { router } from "expo-router";
import { useAftercareStore } from "./useAftercare";
import { showToast } from "@/lib/utils";

interface StoreState {
  authUser: User | null;
  isSigningIn: boolean;
  isSigningUp: boolean;
  isLoggingOut: boolean;
  isCheckingAuth: boolean;
  signup: (formData: signupForm) => void;
  signin: (formData: signinForm) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<StoreState>((set) => ({
  authUser: null,
  isSigningIn: false,
  isSigningUp: false,
  isLoggingOut: false,
  isCheckingAuth: false,
  isUpdating: false,

  signup: async (form: signupForm) => {
    try {
      set({ isSigningUp: true });
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ authUser: data.user });
        await AsyncStorage.setItem("token", data.token);

        const { addUser } = useUserStore.getState();
        addUser(data.user);

        router.push("/(tabs)/home");
        showToast("success", `welcome ${data.user.firstName}`);
      } else {
        showToast("error", `Failed to register`);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Signup Error");
    } finally {
      set({ isSigningUp: false });
    }
  },

  signin: async (form: signinForm) => {
    try {
      set({ isSigningIn: true });
      const res = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        // Set the user data and token in storage
        set({ authUser: data.user });
        await AsyncStorage.setItem("token", data.token);

        // get the user from the auth store
        const { addUser } = useUserStore.getState();

        addUser(data.user);

        // Import usePetStore at the top of the file and use it here
        // to fetch pets after successful signin

        const { fetchPets } = usePetStore.getState();
        const { fetchAppointments } = useAppointmentsStore.getState();

        await fetchPets();
        await fetchAppointments();
      } else {
        Alert.alert("Login Failed");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Login Error");
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true });
      await AsyncStorage.removeItem("token");
      set({ authUser: null });
    } catch (error) {
      Alert.alert("Error logging out");
      console.log(error);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/auth/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.user) {
        set({ authUser: data.user });
        // get the user from the auth store
        const { addUser } = useUserStore.getState();

        // Import usePetStore at the top of the file and use it here
        // to fetch pets after successful signin

        const { fetchPets } = usePetStore.getState();
        const { fetchAllAftercare } = useAftercareStore.getState();
        const { fetchAppointments } = useAppointmentsStore.getState();

        await fetchPets();
        await fetchAppointments();
        await fetchAllAftercare();

        addUser(data.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
