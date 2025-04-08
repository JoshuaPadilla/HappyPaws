import { Reminder, User, userFormData } from "@/types/type";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { BASE_URL } from "@/constants";
import { resizeImage, showToast } from "@/lib/utils";

interface UseRemindersStore {
  reminders: Reminder[];
  isLoading: boolean;

  fetchReminders: () => void;
}

export const userReminders = create<UseRemindersStore>((set) => ({
  reminders: [],
  isLoading: false,

  fetchReminders: async () => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/reminders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ reminders: data.reminders });
      } else {
        Alert.alert("Failed to fetch reminders");
      }
    } catch (error) {
      console.log("Error in fetch reminders: ", error);
      Alert.alert("error fetching reminders");
    } finally {
      set({ isLoading: false });
    }
  },
}));
