import { BASE_URL } from "@/constants";
import { dismiss } from "@/lib/routerFunctions";
import { showToast } from "@/lib/utils";
import { signupForm, User, userFormData } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";

interface ClientStoreState {
  clients: User[];
  selectedClient: User | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  fetchClients: () => Promise<void>;
  addClient: (client: signupForm) => Promise<void>;
  // updateClient: (client: Client) => Promise<void>;
  // deleteClient: (clientId: string) => Promise<void>;
  // setSelectedClient: (client: Client) => void;
}

export const useClient = create<ClientStoreState>((set) => ({
  clients: [],
  selectedClient: null,
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,

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

  addClient: async (client: signupForm) => {
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
}));
