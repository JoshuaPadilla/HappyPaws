import { create } from "zustand";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddPetForm, Pet, PetFormData } from "@/types/type";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "@/constants";
import { resizeImage } from "@/lib/utils";

interface PetStoreState {
  pets: Pet[];
  selectedPet: Pet | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isUploadingImage: boolean;
  addPet: (form: AddPetForm) => Promise<void>;
  updatePet: (petId: string, updatedForm: PetFormData) => Promise<void>;
  deletePet: (petId: string) => Promise<void>;
  fetchPets: () => Promise<void>;
  setSelectedPet: (pet: Pet) => void;
}

export const usePetStore = create<PetStoreState>((set) => ({
  pets: [],
  selectedPet: null,
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isUploadingImage: false,

  addPet: async (form: AddPetForm) => {
    try {
      set({ isAdding: true });
      const formData = new FormData();

      formData.append("petAge", form.petAge);
      formData.append("petName", form.petName);
      formData.append("petBreed", form.petBreed);
      formData.append("petGender", form.petGender);
      formData.append("petSpecie", form.petSpecie);

      if (form.petImage) {
        const resizedUri = await resizeImage(form.petImage.uri);
        formData.append("petImage", {
          uri: resizedUri,
          type: "image/jpeg",
          name: form.petImage.fileName || `${Date.now()}.jpg`,
        } as any);
      }

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/pets`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        await usePetStore.getState().fetchPets();
        set({ selectedPet: null });

        Alert.alert("pet Successfully Added");
      } else {
        Alert.alert("Failed to add pet");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error adding pet");
    } finally {
      set({ isAdding: false });
    }
  },

  updatePet: async (petId: string, updatedForm: PetFormData) => {
    try {
      set({ isUpdating: true });

      const { selectedPet } = usePetStore.getState();

      const formData = new FormData();

      formData.append("petAge", updatedForm.petAge);
      formData.append("petName", updatedForm.petName);
      formData.append("petBreed", updatedForm.petBreed);
      formData.append("petGender", updatedForm.petGender);
      formData.append("petSpecie", updatedForm.petSpecie);

      if (
        updatedForm.petImage &&
        updatedForm.petImage !== selectedPet?.petImage
      ) {
        const resizedUri = await resizeImage(updatedForm.petImage.uri);
        formData.append("petImage", {
          uri: resizedUri,
          type: "image/jpeg",
          name: updatedForm.petImage.fileName || `${Date.now()}.jpg`,
        } as any);
      }

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/pets/${petId}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        await usePetStore.getState().fetchPets();
        set({ selectedPet: data.pet });
        Alert.alert("Pet updated successfully");
      } else {
        Alert.alert("Failed to update pet");
      }
    } catch (error) {
      console.log("Pet Update Error: ", error);
      Alert.alert("Error updating pet");
    } finally {
      set({ isUpdating: false });
    }
  },

  deletePet: async (petId: string) => {
    try {
      set({ isDeleting: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/pets/${petId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "failed") {
        throw new Error("Failed to delete pet");
      }

      Alert.alert("Pet deleted successfully");
      await usePetStore.getState().fetchPets();
    } catch (error) {
      console.log(error);
      Alert.alert("Error deleting pet");
    } finally {
      set({ isDeleting: false });
    }
  },

  fetchPets: async () => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/pets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ pets: data.pets });
      } else {
        Alert.alert("Failed to fetch pets");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching pets");
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedPet: (pet: Pet) => {
    set({ selectedPet: pet });
  },
}));
