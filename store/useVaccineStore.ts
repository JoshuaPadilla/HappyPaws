import { BASE_URL } from "@/constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vaccine, VaccineForm } from "@/types/type";
import { showToast } from "@/lib/utils";
import { create } from "zustand";

interface VaccineStoreProps {
  vaccines: Vaccine[];
  selectedVaccine: Vaccine | null;
  isLoading: boolean;
  isAdding: boolean;
  action: string;

  setSelectedVaccine: (vaccine: Vaccine | null) => void;
  addVaccine: (form: VaccineForm, petID: string) => Promise<void>;
  updateVaccine: (
    form: VaccineForm,
    petID: string,
    vaccineID: string
  ) => Promise<void>;
  fetchVaccineHistory: (petID: string) => Promise<void>;
  setAction: (action: "add" | "edit") => void;
}

export const useVaccineStore = create<VaccineStoreProps>((set) => ({
  vaccines: [],
  selectedVaccine: null,
  isLoading: false,
  isAdding: false,
  action: "add",

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
      console.log("Fetch Vaccine Pet error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedVaccine: (vaccine) => {
    set({ selectedVaccine: vaccine });
  },

  addVaccine: async (form, petID) => {
    try {
      set({ isAdding: true });
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/vaccine/${petID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.status === "success") {
        showToast("success", "Vaccine Added Successfully");
      } else {
        showToast("error", "Failed Adding Vaccine");
      }
    } catch (error) {
      console.log("Adding Vaccine error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateVaccine: async (form, petID, vaccineID) => {
    try {
      set({ isAdding: true });
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/vaccine/${petID}/${vaccineID}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        set({ selectedVaccine: data.updatedVaccine });
        showToast("success", "Vaccine Added Successfully");
      } else {
        showToast("error", "Failed Adding Vaccine");
      }
    } catch (error) {
      console.log("Adding Vaccine error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setAction: (action) => {
    set({ action: action });
  },
}));
