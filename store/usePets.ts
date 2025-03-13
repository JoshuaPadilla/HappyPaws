import { create } from "zustand";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pet, PetFormData } from "@/types/type";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "@/constants";

interface PetStoreState {
  pets: Pet[];
  selectedPet: Pet | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isUploadingImage: boolean;
  addPet: (form: PetFormData) => Promise<void>;
  updatePet: (petId: string, updates: Partial<Pet>) => Promise<void>;
  deletePet: (petId: string) => Promise<void>;
  fetchPets: () => Promise<void>;
  uploadPetImage: () => Promise<string | null>;
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

  addPet: async (form: PetFormData) => {
    try {
      set({ isAdding: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
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

  updatePet: async (petId: string, updates: Partial<Pet>) => {
    try {
      set({ isUpdating: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/pets/${petId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
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

  /**
   * Handles the selection and upload of a pet image
   * Steps:
   * 1. Request media library permissions
   * 2. Open image picker
   * 3. Process selected image
   * 4. Upload to server
   * @returns Promise<string | null> URL of the uploaded image or null if cancelled
   */
  uploadPetImage: async () => {
    try {
      set({ isUploadingImage: true });

      // Step 1: Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your media library to upload images."
        );
        return null;
      }

      // Step 2: Open image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled) {
        return null;
      }

      // Step 3: Process image
      const localUri = result.assets[0].uri;
      const filename = localUri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image";

      // Create form data
      const formData = new FormData();
      formData.append("image", {
        uri: localUri,
        name: filename,
        type,
      } as any);

      // Step 4: Upload to server
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        return data.imageUrl;
      } else {
        Alert.alert("Upload Failed", "Failed to upload image to server");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image");
      return null;
    } finally {
      set({ isUploadingImage: false });
    }
  },

  setSelectedPet: (pet: Pet) => {
    set({ selectedPet: pet });
  },
}));
