import { BASE_URL } from "@/constants";
import { dismiss } from "@/lib/routerFunctions";
import { resizeImage, showToast } from "@/lib/utils";
import { Pet, signupForm, User, userFormData } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface AdminPetStoreState {
  selectedPet: Pet | null;

  setSelectedPet: (pet: Pet | null) => void;
}

export const useAdminPets = create<AdminPetStoreState>((set) => ({
  selectedPet: null,

  setSelectedPet: (pet) => set({ selectedPet: pet }),
}));
