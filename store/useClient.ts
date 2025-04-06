import { BASE_URL } from "@/constants";
import { dismiss } from "@/lib/routerFunctions";
import { resizeImage, showToast } from "@/lib/utils";
import { signupForm, User, userFormData } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";

interface ClientStoreState {
  clients: User[];
  selectedClient: User | null;
  selectedClientForAppointment: User | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  fetchClients: () => Promise<void>;
  addClient: (client: signupForm) => Promise<void>;
  fetchClient: (clientId: string) => Promise<void>;
  updateClient: (client: any) => Promise<void>;
  fetchSelectedClientPets: () => Promise<void>;
  fetchSelectedClientForAppointment: (userID: string) => Promise<void>;
  deleteClient: () => Promise<void>;
  // setSelectedClient: (client: Client) => void;
}

export const useClient = create<ClientStoreState>((set) => ({
  clients: [],
  selectedClient: null,
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  selectedClientForAppointment: null,

  fetchClients: async () => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      set({ clients: data.users });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addClient: async (client) => {
    try {
      set({ isAdding: true });
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
        body: JSON.stringify(client),
      });

      const data = await res.json();

      if (data.status === "success") {
        set((state) => ({ clients: [...state.clients, data.user] }));
        dismiss();
        showToast("success", `new client added`);
      } else {
        showToast("error", `Failed to register`);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("adding error Error");
    } finally {
      set({ isAdding: false });
    }
  },

  fetchClient: async (clientId) => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/users/${clientId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      set({ selectedClient: data.user });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateClient: async (updatedForm) => {
    try {
      set({ isUpdating: true });

      const selectedClient = useClient.getState().selectedClient;
      const formData = new FormData();

      formData.append("firstName", updatedForm.firstName);
      formData.append("lastName", updatedForm.lastName);
      formData.append("address", updatedForm.address);
      formData.append("phone", updatedForm.phone);
      formData.append("birthday", JSON.stringify(updatedForm.birthday));

      // Append the profile picture file
      if (
        updatedForm.profilePicture &&
        updatedForm.profilePicture !== selectedClient?.profilePicture
      ) {
        const resizedUri = await resizeImage(updatedForm.profilePicture.uri);
        formData.append("profilePicture", {
          uri: resizedUri,
          type: "image/jpeg",
          name:
            updatedForm.profilePicture.fileName || `profile-${Date.now()}.jpg`,
        } as any);
      }

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/users/${selectedClient?._id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.user) {
        set({ selectedClient: data.user });
      }

      showToast("success", "Details Updated ✅");
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUpdating: false });
      // console.log("Done updating user");
    }
  },

  fetchSelectedClientPets: async () => {
    try {
      set({ isLoading: true });

      const { selectedClient } = useClient.getState();
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/pets/all/${selectedClient?._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      set((state) => ({
        selectedClient: state.selectedClient
          ? {
              ...state.selectedClient,
              pets: data.pets,
            }
          : null,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSelectedClientForAppointment: async (userID) => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/users/${userID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.status === "success") {
        set({ selectedClientForAppointment: data.user });
      } else {
        showToast("error", "Failed Fetching Client");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteClient: async () => {
    try {
      set({ isDeleting: true });

      const token = await AsyncStorage.getItem("token");
      const { selectedClient } = useClient.getState();

      const res = await fetch(`${BASE_URL}/users/${selectedClient?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.status === "success") {
        set((state) => ({
          clients: state.clients.filter(
            (client) => client._id !== selectedClient?._id
          ),
          selectedClient: null,
        }));

        dismiss();
        showToast("success", "Client deleted successfully");
      } else {
        showToast("error", "Failed to delete client");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isDeleting: false });
    }
  },
}));
