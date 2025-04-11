import { create } from "zustand";

import { BASE_URL } from "@/constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MedicalRecord, MedicalRecordForm } from "@/types/type";
import { showToast } from "@/lib/utils";

interface MedicalRecordStoreProps {
  medicalRecords: MedicalRecord[];
  selectedMedicalRecord: MedicalRecord | null;
  isLoading: boolean;
  isAdding: boolean;
  action: string;

  setSelectedMedicalRecord: (MedicalRecord: MedicalRecord | null) => void;
  addMedicalRecord: (form: MedicalRecordForm, petID: string) => void;
  fetchMedicalRecord: (petID: string) => void;
  setAction: (action: "add" | "edit") => void;
  updateMedicalRecord: (
    form: MedicalRecordForm,
    petID: string,
    medicalID: string
  ) => void;
}

export const useMedicalRecordStore = create<MedicalRecordStoreProps>((set) => ({
  medicalRecords: [],
  selectedMedicalRecord: null,
  isLoading: false,
  isAdding: false,
  action: "add",

  fetchMedicalRecord: async (petID) => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/medical/${petID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.status === "success") {
        set({ medicalRecords: data.medicalRecords });
      } else {
        showToast("error", "error fetching you medical record");
      }
    } catch (error) {
      console.log("Fetch pet aftercare error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addMedicalRecord: async (form, petID) => {
    try {
      set({ isAdding: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/medical/${petID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
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

  setSelectedMedicalRecord: (medicalRecord) => {
    set({ selectedMedicalRecord: medicalRecord });
  },

  updateMedicalRecord: async (form, petID, medicalID) => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/medical/${petID}/${medicalID}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ selectedMedicalRecord: data.updatedMedicalRecord });
        showToast("success", "✅ Medical record edited successfully");
      } else {
        showToast("error", "❌ Medical record editing fails", "Try again");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "error to edit medical record");
    } finally {
      set({ isLoading: false });
    }
  },

  setAction: (action) => {
    set({ action: action });
  },
}));
