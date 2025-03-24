import { BASE_URL } from "@/constants";
import { AppointmentForm } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface WeeklyInsights {
  numberOfWeeklyAppointment: number | 0;
  thisWeeksCountsByDay: { date: string; count: number }[] | null;
  thisWeekServicePopularity: { serviceType: string; count: number }[] | null;
  thisWeekStatusCount: { status: string; count: number }[] | null;
  averageAppointmentsPerWeek: number;
  totalUsers: number;
  newUserCount: number;
}

interface InsightsStoreProps {
  thisWeekInsights: WeeklyInsights | null;
  lastWeekInsights: WeeklyInsights | null;
  isLoading: boolean;
  getWeeklyInsights: () => void;
}

export const useInsightsStore = create<InsightsStoreProps>((set) => ({
  thisWeekInsights: null,
  lastWeekInsights: null,
  isLoading: false,

  getWeeklyInsights: async () => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/insights/weekly`, {
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
}));
