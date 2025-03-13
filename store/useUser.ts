import { User } from "@/types/type";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { BASE_URL } from "@/constants";

interface UserStoreState {
  user: User | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isUploadingImage: boolean;
  addUser: (user: User) => void;
  updateUser: (form: any) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isUploadingImage: false,
  addUser: (user: User) => {
    set({ user: user });
  },

  updateUser: async (updatedForm: any) => {
    try {
      set({ isUpdating: true });

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedForm),
      });

      const data = await res.json();

      if (data.user) {
        set({ user: data.user });
      }

      Alert.alert("Details Updated");
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUpdating: false });
    }
  },
}));
