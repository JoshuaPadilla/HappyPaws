import { signupForm } from "@/types/type";
import { parseSync } from "@babel/core";
import { router, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import { usePetStore } from "@/store/usePets";

// Color mappings for different types of care
export const typeToColorClass = {
  medication: {
    bg: "bg-base-medication",
    border: "border-dark-medication",
    tag: "bg-dark-medication",
  },
  "wound care": {
    bg: "bg-base-wound",
    border: "border-dark-wound",
    tag: "bg-dark-wound",
  },
  "diet and nutrition": {
    bg: "bg-base-diet",
    border: "border-dark-diet",
    tag: "bg-dark-diet",
  },
  "Follow up": {
    bg: "bg-base-follow",
    border: "border-dark-follow",
    tag: "bg-dark-follow",
  },
} as const;

// Color mappings for appointment types
export const appointmentTypeToColorClass = {
  Vaccination: {
    bg: "bg-base-vaccine",
    border: "border-dark-vaccine",
    tag: "bg-dark-vaccine",
    colors: {
      base: "#A2D5F2",
      dark: "#6FA8C9",
    },
  },
  Grooming: {
    bg: "bg-base-groom",
    border: "border-dark-groom",
    tag: "bg-dark-groom",
    colors: {
      base: "#B2F2BB",
      dark: "#7FC987",
    },
  },
  Dental: {
    bg: "bg-base-dental",
    border: "border-dark-dental",
    tag: "bg-dark-dental",
    colors: {
      base: "#E6E6FA",
      dark: "#B3A8D8",
    },
  },
  Checkup: {
    bg: "bg-base-checkup",
    border: "border-dark-checkup",
    tag: "bg-dark-checkup",
    colors: {
      base: "#FFDAB9",
      dark: "#D4A276",
    },
  },
} as const;

export const getAppointmentColors = (type: string | undefined) => {
  if (!type) {
    return {
      bg: "bg-primary-100",
      border: "border-primary-200",
      tag: "bg-primary-200",
      colors: {
        base: "#73C7C7",
        dark: "#53A9A9",
      },
    };
  }

  // Try exact match first
  const exactMatch =
    appointmentTypeToColorClass[
      type as keyof typeof appointmentTypeToColorClass
    ];
  if (exactMatch) return exactMatch;

  // Try case-insensitive match
  const normalizedType = type.toLowerCase();
  const normalizedMatch = Object.entries(appointmentTypeToColorClass).find(
    ([key]) => key.toLowerCase() === normalizedType
  );

  if (normalizedMatch) return normalizedMatch[1];

  // Default fallback
  return {
    bg: "bg-primary-100",
    border: "border-primary-200",
    tag: "bg-primary-200",
    colors: {
      base: "#73C7C7",
      dark: "#53A9A9",
    },
  };
};

// Keeping these for backward compatibility
export const getAppointmentCardColor = (
  type: string | undefined
): string | undefined => {
  if (!type) return;

  switch (type.toLowerCase()) {
    case "vaccination":
      return "bg-base-vaccine";
    case "grooming":
      return "bg-base-groom";
    case "dental":
      return "bg-base-dental";
    case "checkup":
      return "bg-base-checkup";
    default:
      return "bg-primary-100";
  }
};

export const getAppointmentCardBorder = (type: string): string | undefined => {
  switch (type.toLowerCase()) {
    case "vaccination":
      return "border-dark-vaccine";
    case "grooming":
      return "border-dark-groom";
    case "dental":
      return "border-dark-dental";
    case "checkup":
      return "border-dark-checkup";
    default:
      return "border-primary-200";
  }
};

export const getAfterCareCardColor = (type: string): string | undefined => {
  switch (type.toLowerCase()) {
    case "medication":
      return "base-medication";
    case "wound care":
      return "base-wound";
    case "diet and nutrition":
      return "base-diet";
    case "Follow up":
      return "base-follow";
    default:
      "primary-100";
  }
};

export const getRemindersCardBg = (type: string): any => {
  switch (type.toLowerCase()) {
    case "medication":
      return "card_medication";
    case "wound care":
      return "card_wound";
    case "diet and nutrition":
      return "card_diet";
    case "follow up":
      return "card_followup";
    case "vaccine":
      return "card_vaccine";
    case "groom":
      return "card_groom";
    case "dental":
      return "card_dental";
    case "checkup":
      return "card_checkup";
    default:
      "card_checkup";
  }
};

export const checkForm = (formData: signupForm): boolean => {
  // Name validation
  if (!formData.firstName.trim()) return false;

  if (!formData.lastName.trim()) return false;

  // Address validation
  if (!formData.address.trim()) return false;

  // Email validation
  if (
    !formData.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  )
    return false;

  // Phone validation
  if (!formData.phone.trim()) return false;

  // Gender validation
  if (!formData.gender) return false;

  if (!formData.birthday) return false;

  // Password validation
  if (formData.password.length < 8) return false;

  return true;
};

export const checkSamePassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

// back functions

export const formatDate = (dateString: string) => {
  const date = moment(dateString, "YYYY-MM-DD");
  if (date.isValid()) {
    return date.format("MMMM D, YYYY");
  } else {
    return "Invalid date";
  }
};

export const findPetById = (petId: string) => {
  const { pets } = usePetStore();
  return pets.find((pet) => pet._id === petId);
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "#16C47F";
    case "Cancelled":
      return "#F93827";
    case "Rescheduled":
      return "#FFD65A";
    default:
      return "bg-primary-100";
  }
};
