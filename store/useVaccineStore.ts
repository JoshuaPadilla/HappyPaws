import { BASE_URL } from "@/constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vaccine } from "@/types/type";
import { showToast } from "@/lib/utils";
import { create } from "zustand";

interface VaccineStoreProps {
  vaccines: Vaccine[];
  selectedVaccine: Vaccine | null;
  isLoading: boolean;

  setSelectedVaccine: (vaccine: Vaccine) => void;
  fetchVaccineHistory: (petID: string) => Promise<void>;
}

export const useVaccineStore = create<VaccineStoreProps>((set) => ({
  vaccines: [],
  selectedVaccine: null,
  isLoading: false,

  fetchVaccineHistory: async (petID) => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/vaccine/${petID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.status === "success") {
        set({ vaccines: data.vaccineHistory });
      } else {
        showToast("error", "error fetching you medical record");
      }
    } catch (error) {
      console.log("Fetch pet aftercare error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedVaccine: (vaccine) => {
    set({ selectedVaccine: vaccine });
  },
}));
