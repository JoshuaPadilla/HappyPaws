import { create } from "zustand";

interface appointmentFilterState {
  startDate: string;
  setStartDate: (startDate: string) => void;
  endDate: string;
  setEndDate: (endDate: string) => void;
  serviceType: string;
  setServiceType: (serviceType: string) => void;
  status: string;
  setStatus: (status: string) => void;
  resetFilters: () => void;
}

export const useAppointmentFilterStore = create<appointmentFilterState>(
  (set) => ({
    startDate: "",
    setStartDate: (startDate: string) => set({ startDate }),
    endDate: "",
    setEndDate: (endDate: string) => set({ endDate }),
    serviceType: "",
    setServiceType: (serviceType: string) => set({ serviceType }),
    status: "",
    setStatus: (status: string) => set({ status }),
    resetFilters: () =>
      set({ startDate: "", endDate: "", serviceType: "", status: "" }),
  })
);
