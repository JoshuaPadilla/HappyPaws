import { BASE_URL } from "@/constants";
import { showMarkCompletedBtn, showToast } from "@/lib/utils";
import { Appointment, AppointmentForm } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";

interface TimeSlot {
  time: string;
}

interface AdminAppointmentStoreState {
  appointments: Appointment[];
  appointmentHistory: Appointment[];
  activeAppointments: Appointment[];
  byDateAppointments: Appointment[];
  bookedSlots: TimeSlot[];
  selectedAppointment: Appointment | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isCancelling: boolean;

  fetchAllAppointments: () => Promise<void>;
  fetchAppointment: (appointmentId: string) => void;

  fetchAppointmentByDate: (date: string, signal?: any) => void;
  addAppointment: (appointment: AppointmentForm) => void;
  updateAppointment: (appointment: AppointmentForm) => void;
  setSelectedAppointment: (appointment: Appointment) => void;
  cancelAppointment: (appointmentId: string) => void;
  fetchAppointmentHistory: (clientID: string) => void;
  fetchActiveAppointment: (clientID: string) => void;
  markComplete: (appointmentId: string) => void;
}

export const useAdminAppointmentsStore = create<AdminAppointmentStoreState>(
  (set) => ({
    appointments: [],
    appointmentHistory: [],
    activeAppointments: [],
    byDateAppointments: [],
    bookedSlots: [],
    selectedAppointment: null,
    isLoading: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    isCancelling: false,

    fetchAllAppointments: async () => {
      try {
        set({ isLoading: true });
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/appointments/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.status === "success") {
          set({ appointments: data.appointments });
        } else {
          Alert.alert("Failed to fetch appointments");
        }
      } catch (error) {
        console.log(error);
        set({ isLoading: false });
        Alert.alert("Failed to fetch appointments");
      } finally {
        set({ isLoading: false });
      }
    },

    fetchAppointmentHistory: async (clientID) => {
      try {
        set({ isLoading: true });
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(
          `${BASE_URL}/appointments/history/${clientID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.status === "success") {
          set({ appointmentHistory: data.appointments });
        } else {
          Alert.alert("Failed to fetch appointments");
        }
      } catch (error) {
        console.log(error);
        set({ isLoading: false });
        Alert.alert("Failed to fetch appointments");
      } finally {
        set({ isLoading: false });
      }
    },

    fetchActiveAppointment: async (clientID) => {
      try {
        set({ isLoading: true });
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/appointments/active/${clientID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.status === "success") {
          set({ activeAppointments: data.appointments });
        } else {
          Alert.alert("Failed to fetch appointments");
        }
      } catch (error) {
        console.log(error);
        set({ isLoading: false });
        Alert.alert("Failed to fetch appointments");
      } finally {
        set({ isLoading: false });
      }
    },

    fetchAppointmentByDate: async (date) => {
      try {
        set({ isLoading: true });
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/appointments/by-date/${date}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.status === "success") {
          set({ byDateAppointments: data.appointments });
        } else {
          Alert.alert("Failed to fetch appointments");
        }
      } catch (error) {
        console.log(error);
        set({ isLoading: false });
        Alert.alert("Failed to fetch appointments");
      } finally {
        set({ isLoading: false });
      }
    },

    addAppointment: async (appointment) => {
      try {
        set({ isAdding: true });
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/appointments`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointment),
        });

        const data = await res.json();
        set((state) => {
          if (data.status === "success") {
            return { appointments: [...state.appointments, data.appointment] };
          } else {
            Alert.alert("Failed to add appointment");
            return state;
          }
        });
        if (data.status === "success") {
          Alert.alert("Appointment added successfully");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Failed to add appointment");
      } finally {
        set({ isAdding: false });
      }
    },

    updateAppointment: async (appointment) => {
      try {
        set({ isUpdating: true });
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(
          `${BASE_URL}/appointments/admin/${appointment._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(appointment),
          }
        );

        const data = await res.json();

        if (data.status === "success") {
          set({ selectedAppointment: data.updatedAppointment });

          Alert.alert("Appointment updated successfully");
        } else {
          Alert.alert("Failed to update appointment");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Failed to update appointment");
      } finally {
        set({ isUpdating: false });
      }
    },

    cancelAppointment: async (appointmentId) => {
      try {
        set({ isCancelling: true });
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(
          `${BASE_URL}/appointments/cancel/${appointmentId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log(data);
        if (data.status === "success") {
          useAdminAppointmentsStore.getState().fetchAllAppointments();
          Alert.alert("Appointment cancelled successfully");
        } else {
          Alert.alert("Failed to cancel appointment");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Failed to cancel appointment");
      } finally {
        set({ isCancelling: false });
      }
    },

    fetchAppointment: async (appointmentId) => {
      try {
        set({ isLoading: true });
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(
          `${BASE_URL}/appointments/admin/${appointmentId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.status === "success") {
          set({ selectedAppointment: data.appointment });
        } else {
          Alert.alert("Failed to fetch appointment");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error fetching appointment");
      } finally {
        set({ isLoading: false });
      }
    },

    markComplete: async (appointmentId) => {
      try {
        set({ isLoading: true });
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(
          `${BASE_URL}/appointments/completed/${appointmentId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.status === "success") {
          set({ selectedAppointment: data.completedAppointment });

          showToast("success", "Appointment marked complete");
        } else {
          showToast("error", "Failed to complete appointment");
        }
      } catch (error) {
        console.log("error in mark completed appointment: ", error);
        Alert.alert("Failed to update appointment");
      } finally {
        set({ isLoading: false });
      }
    },

    setSelectedAppointment: (appointment) => {
      set({ selectedAppointment: appointment });
    },
  })
);
