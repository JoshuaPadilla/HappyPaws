import { BASE_URL } from "@/constants";
import { User } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface ClientStoreState {
  clients: User[];
  selectedClient: User | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  fetchClients: () => Promise<void>;
  // addClient: (client: Client) => Promise<void>;
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
}));
