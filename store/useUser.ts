import { User, userFormData } from "@/types/type";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { BASE_URL } from "@/constants";
import { resizeImage } from "@/lib/utils";

interface UserStoreState {
  user: User | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isUploadingImage: boolean;
  addUser: (user: User) => void;
  updateUser: (form: any) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isUploadingImage: false,
  addUser: (user: User) => {
    set({ user: user });
  },

  updateUser: async (updatedForm: any) => {
    try {
      set({ isUpdating: true });

      const { user } = useUserStore.getState();
      const formData = new FormData();

      formData.append("firstName", updatedForm.firstName);
      formData.append("lastName", updatedForm.lastName);
      formData.append("address", updatedForm.address);
      formData.append("phone", updatedForm.phone);
      formData.append("birthday", JSON.stringify(updatedForm.birthday));

      // Append the profile picture file
      if (
        updatedForm.profilePicture &&
        updatedForm.profilePicture !== user?.profilePicture
      ) {
        const resizedUri = await resizeImage(updatedForm.profilePicture.uri);
        formData.append("profilePicture", {
          uri: resizedUri,
          type: "image/jpeg",
          name:
            updatedForm.profilePicture.fileName || `profile-${Date.now()}.jpg`,
        } as any);
      }

      // console.log(updatedForm.profilePicture);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/users`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.user) {
        set({ user: data.user });
      }

      Alert.alert("Details Updated");
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUpdating: false });
      // console.log("Done updating user");
    }
  },
}));
