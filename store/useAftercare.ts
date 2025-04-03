import { Aftercare } from "@/types/type";
import { create } from "zustand";

import { BASE_URL } from "@/constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface AftercareStoreState {
  petAftercares: Aftercare[];
  allAftercares: Aftercare[];
  selectedAftercare: Aftercare | null;
  isLoading: boolean;
  isAdding: boolean;

  setSelectedAftercare: (aftercare: Aftercare) => void;
  fecthPetAftercare: (petID: string) => Promise<void>;
  fetchAllAftercare: (signal: any) => Promise<void>;
}

export const useAftercareStore = create<AftercareStoreState>((set) => ({
  petAftercares: [],
  allAftercares: [],
  isLoading: false,
  isAdding: false,
  selectedAftercare: null,

  fecthPetAftercare: async (petID: string) => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/aftercare/${petID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      set({ petAftercares: data.aftercares, isLoading: false });
    } catch (error) {
      console.log("Fetch pet aftercare error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAllAftercare: async () => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/aftercare`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      set({ allAftercares: data.aftercares, isLoading: false });
    } catch (error) {
      console.log("Fetch all aftercare error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedAftercare: (aftercare: Aftercare) => {
    set({ selectedAftercare: aftercare });
  },
}));
