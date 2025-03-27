import { BASE_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface InsightsStoreProps {
  thisWeekInsights: WeeklyInsights | null;
  prevWeekInsights: WeeklyInsights | null;
  isLoading: boolean;
  getThisWeekInsights: () => void;
  getPrevWeekInsights: () => void;
}

export const useInsightsStore = create<InsightsStoreProps>((set) => ({
  thisWeekInsights: null,
  prevWeekInsights: null,
  isLoading: false,

  getThisWeekInsights: async () => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/insights/currWeek`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      set({ thisWeekInsights: data.insights });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  getPrevWeekInsights: async () => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/insights/prevWeek`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      set({ prevWeekInsights: data.insights });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
