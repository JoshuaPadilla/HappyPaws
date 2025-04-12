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

export const gotoSignIn = () => {
  router.replace("/(auth)/signin");
};

export const gotoSignUp = () => {
  router.replace("/(auth)/signup");
};

// admin utility
export const goToAddClient = () => {
  router.push("/(admin_utility)/add_client");
};

export const goToViewClient = () => {
  router.push("/(admin_utility)/view_client");
};

export const goToClientDetails = () => {
  router.push("/(admin_utility)/client_details");
};

export const goToClientPets = () => {
  router.push("/(admin_utility)/client_pets");
};

export const goToClientActiveAppointments = () => {
  router.push("/(admin_utility)/client_active_appointments");
};

export const goToEditClient = () => {
  router.push("/(admin_utility)/edit_client");
};

export const goToViewMedicalRecord = () => {
  router.push("/(pets)/view_medical_record");
};

export const goToViewVaccine = () => {
  router.push("/(pets)/view_vaccine");
};

export const goToAddAftercare = () => {
  router.push("/(admin_utility)/add_aftercare");
};

export const goToAddMedicalRecord = () => {
  router.push("/(admin_utility)/add_medical_record");
};

export const goToAddVaccine = () => {
  router.push("/(admin_utility)/add_vaccine");
};

export const goToServicePopularity = () => {
  router.push("/(admin_utility)/service_popularity");
};
