import { create } from "zustand";

import { BASE_URL } from "@/constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MedicalRecord } from "@/types/type";
import { showToast } from "@/lib/utils";

interface MedicalRecordStoreProps {
  medicalRecords: MedicalRecord[];
  selectedMedicalRecord: MedicalRecord | null;
  isLoading: boolean;

  setSelectedMedicalRecord: (MedicalRecord: MedicalRecord) => void;
  fetchMedicalRecord: (petID: string) => Promise<void>;
}

export const useMedicalRecordStore = create<MedicalRecordStoreProps>((set) => ({
  medicalRecords: [],
  selectedMedicalRecord: null,
  isLoading: false,

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

  setSelectedMedicalRecord: (medicalRecord) => {
    set({ selectedMedicalRecord: medicalRecord });
  },
}));
