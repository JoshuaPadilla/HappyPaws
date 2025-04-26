import { BASE_URL } from "@/constants";
import { showMarkCompletedBtn, showToast } from "@/lib/utils";
import { Appointment, AppointmentForm, Message } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";

interface StoreState {
  messages: Message[];
  isResponding: boolean;

  sendMessage: (message: Message) => void;
  resetMessage: () => void;
}

export const useMessageStore = create<StoreState>((set) => ({
  messages: [],
  isResponding: false,

  sendMessage: async (message) => {
    try {
      set({ isResponding: true });
      set((state) => ({ messages: [...state.messages, message] }));
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/ask`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ message: message.content }),
      });

      const data = await res.json();
      if (data.status === "success") {
        const newMessage: Message = {
          sender: "ai",
          content: data.responseMessage,
        };

        set((state) => ({ messages: [...state.messages, newMessage] }));
      } else {
        const newMessage: Message = {
          sender: "ai",
          content: data.responseMessage,
        };

        set((state) => ({ messages: [...state.messages, newMessage] }));
      }
    } catch (error) {
      console.log(error);
      Alert.alert("error in ai response");
    } finally {
      set({ isResponding: false });
    }
  },

  resetMessage: () => {
    set({ messages: [] });
  },
}));
