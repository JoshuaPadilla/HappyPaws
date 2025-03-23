import VaccineList from "@/app/(pets)/vaccine_list_view";
import { router } from "expo-router";

// pets route functions
export const goToViewPet = () => {
  router.push("/(pets)/view_pet");
};

export const goToAddPet = () => {
  router.push("/(pets)/add_pet");
};

export const goToPetDetails = () => {
  router.push("/(pets)/pet_details");
};

export const goToEditPet = () => {
  router.push("/(pets)/edit_pet");
};

// appointment route functions
export const goToViewAppointment = () => {
  router.push("/(appointments)/view_appointment");
};

// aftercare screens

export const goToAftercaresList = () => {
  router.push("/(pets)/aftercares_list_view");
};

export const goToViewAftercare = () => {
  router.push("/(pets)/view_aftercare");
};

// appoitnment screens

export const goToAppointmentHistory = () => {
  router.push("/(appointments)/appointment_history");
};

export const goBack = () => {
  router.back();
};

export const dismiss = () => {
  router.dismiss();
};

// utilities
export const goToEditProfile = () => {
  router.push("/(utility)/edit_profile");
};

// medical Record
export const goToMedicalRecordListView = () => {
  router.push("/(pets)/medical_record_list_view");
};

// VaccineList
export const goToVaccineListView = () => {
  router.push("/(pets)/vaccine_list_view");
};
