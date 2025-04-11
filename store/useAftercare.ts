import { Aftercare, AftercareForm } from "@/types/type";
import { create } from "zustand";

import { BASE_URL } from "@/constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { showToast } from "@/lib/utils";

interface AftercareStoreState {
  petAftercares: Aftercare[];
  allAftercares: Aftercare[];
  selectedAftercare: Aftercare | null;
  isLoading: boolean;
  isAdding: boolean;
  action: string;

  setAction: (action: string) => void;
  setSelectedAftercare: (aftercare: Aftercare | null) => void;
  fecthPetAftercare: (petID: string) => void;
  fetchAllAftercare: (signal: any) => void;
  updateAftercare: (form: AftercareForm, aftercareID: string) => void;
  addAftercare: (
    aftercareData: AftercareForm,
    petID: string,
    userID: string
  ) => void;
}

export const useAftercareStore = create<AftercareStoreState>((set) => ({
  petAftercares: [],
  allAftercares: [],
  isLoading: false,
  isAdding: false,
  selectedAftercare: null,
  action: "add",

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

  setSelectedAftercare: (aftercare) => {
    set({ selectedAftercare: aftercare });
  },

  addAftercare: async (aftercareData, petID, userID) => {
    try {
      set({ isAdding: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/aftercare/${petID}/${userID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aftercareData),
      });

      const data = await res.json();

      if (data.status === "success") {
        showToast(
          "success",
          "✅ Aftercare added",
          "Successfully added aftercare"
        );
      } else {
        showToast("error", "❌ Aftercare adding fails", "Try again");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "error to add appointment");
    } finally {
      set({ isAdding: false });
    }
  },

  updateAftercare: async (form, aftercareID) => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/aftercare/${aftercareID}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ selectedAftercare: data.updatedAftercare });
        showToast("success", "✅ Aftercare edited successfully");
      } else {
        showToast("error", "❌ Aftercare editing fails", "Try again");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "error to edit appointment");
    } finally {
      set({ isLoading: false });
    }
  },

  setAction: (action) => {
    set({ action: action });
  },
}));
