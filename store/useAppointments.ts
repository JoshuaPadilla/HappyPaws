import { BASE_URL } from "@/constants";
import { goToViewAppointment } from "@/lib/routerFunctions";
import { showToast } from "@/lib/utils";
import { Appointment, AppointmentForm } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";

interface TimeSlot {
  time: string;
}

interface AppointmentStoreState {
  appointments: Appointment[];
  appointmentHistory: Appointment[];
  bookedSlots: TimeSlot[];
  selectedAppointment: Appointment | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isCancelling: boolean;

  fetchAppointments: (signal?: any) => void;
  fetchAppointmentHistory: (id?: string) => void;
  getOneAppointment: (id?: string) => void;

  addAppointment: (appointment: AppointmentForm) => void;
  updateAppointment: (appointment: AppointmentForm) => void;
  getTimeSlots: (date: string) => any;
  setSelectedAppointment: (appointment: Appointment) => void;
  cancelAppointment: (appointmentId: string) => void;
}

export const useAppointmentsStore = create<AppointmentStoreState>((set) => ({
  appointments: [],
  appointmentHistory: [],
  bookedSlots: [],
  selectedAppointment: null,
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isCancelling: false,

  fetchAppointments: async () => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/appointments`, {
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

  fetchAppointmentHistory: async () => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/appointments/history`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  getTimeSlots: async (date: string) => {
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

  addAppointment: async (appointment: AppointmentForm) => {
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

      if (data.status === "success") {
        const { fetchAppointments } = useAppointmentsStore.getState();
        fetchAppointments();
      } else {
        showToast("error", "❌ Appointment adding fails", "Try again");
      }

      if (data.status === "success") {
        showToast("success", "Appointment Added 🥳✅");
      } else {
        showToast("error", "Failed Adding appointment ❌");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "error to add appointment");
    } finally {
      set({ isAdding: false });
    }
  },

  updateAppointment: async (appointment: AppointmentForm) => {
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
        useAppointmentsStore.getState().fetchAppointments();

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

  cancelAppointment: async (appointmentId: string) => {
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
        useAppointmentsStore.getState().fetchAppointments();
        showToast("success", "Appointment cancelled successfully");
      } else {
        showToast("error", "Failed to cancel appointment");
      }
    } catch (error) {
      console.log("Cancelling appointment error:", error);
      Alert.alert("Failed to cancel appointment");
    } finally {
      set({ isCancelling: false });
    }
  },

  setSelectedAppointment: (appointment) => {
    set({ selectedAppointment: appointment });
  },

  getOneAppointment: async (id) => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/appointments/all/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.status === "success") {
        set({ selectedAppointment: data.appointment });
      }
    } catch (error) {
      console.log("gettting one appointment error", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
