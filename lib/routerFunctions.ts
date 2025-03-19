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

export const goToViewAftercare = () => {
  router.push("/(aftercares)/view_aftercare");
};

export const goToAppointmentHistory = () => {
  router.push("/(appointments)/appointment_history");
};

export const goBack = () => {
  router.back();
};

// utilities
export const goToEditProfile = () => {
  router.push("/(utility)/edit_profile");
};
