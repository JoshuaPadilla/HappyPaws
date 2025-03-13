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

export const goBack = () => {
  router.back();
};
