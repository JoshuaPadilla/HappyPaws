import { BASE_URL } from "@/constants";
import { AppointmentForm } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";

interface TimeSlot {
  time: string;
}

interface AdminAppointmentStoreState {
  appointments: AppointmentForm[];
  byDateAppointments: AppointmentForm[];
  bookedSlots: TimeSlot[];
  selectedAppointment: AppointmentForm | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isCancelling: boolean;

  fetchAllAppointments: () => Promise<void>;
  fetchAppointmentByDate: (date: string, signal?: any) => Promise<void>;
  addAppointment: (appointment: AppointmentForm) => Promise<void>;
  updateAppointment: (appointment: AppointmentForm) => Promise<void>;
  getTimeSlots: (date: string) => Promise<any>;
  setSelectedAppointment: (appointment: AppointmentForm) => void;
  cancelAppointment: (appointmentId: string) => Promise<void>;
}

export const useAdminAppointmentsStore = create<AdminAppointmentStoreState>(
  (set) => ({
    appointments: [],
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

    getTimeSlots: async (date) => {
      try {
        set({ isLoading: true });
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/appointments/times/${date}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (data.status === "success") {
          set({ bookedSlots: data.bookedTimes });
        } else {
          Alert.alert("Failed to get time slots");
        }
      } catch (error) {
        console.log(error);
        set({ isLoading: false });
        Alert.alert("Failed to get time slots");
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

        const res = await fetch(`${BASE_URL}/appointments/${appointment._id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointment),
        });

        const data = await res.json();

        if (data.status === "success") {
          set({ selectedAppointment: data.updatedAppointment });
          useAdminAppointmentsStore.getState().fetchAllAppointments();

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

    setSelectedAppointment: (appointment) => {
      set({ selectedAppointment: appointment });
    },
  })
);
