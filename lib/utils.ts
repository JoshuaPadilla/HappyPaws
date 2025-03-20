import { signupForm } from "@/types/type";
import { parseSync } from "@babel/core";
import { router, useRouter } from "expo-router";
import moment from "moment";
import * as ImageManipulator from "expo-image-manipulator";
import { usePetStore } from "@/store/usePets";

export const getAftercareBg = (type: string) => {
  switch (type.toLowerCase()) {
    case "medication":
      return "#FFC0CB";
    case "wound care":
      return "#D9D48E";
    case "diet and nutrition":
      return "#C77D3E";
    default:
      return "#8FB88F";
  }
};

export const getAppointmentBg = (type: string) => {
  switch (type.toLowerCase()) {
    case "vaccination":
      return "#A2D5F2";
    case "checkup":
      return "#FFDAB9";
    case "grooming":
      return "#B2F2BB";
    default:
      return "#E6E6FA";
  }
};

// Color mappings for appointment types
export const appointmentTypeToColorClass = {
  Vaccination: {
    colors: {
      base: "#A2D5F2",
      dark: "#6FA8C9",
    },
  },
  Grooming: {
    colors: {
      base: "#B2F2BB",
      dark: "#7FC987",
    },
  },
  Dental: {
    colors: {
      base: "#E6E6FA",
      dark: "#B3A8D8",
    },
  },
  Checkup: {
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

// reminders card bg
export const getRemindersCardBg = (type: string): any => {
  switch (type.toLowerCase()) {
    case "medication":
      return "card_medication";
    case "wound care":
      return "card_wound";
    case "diet and nutrition":
      return "card_diet";
    case "follow-up":
      return "card_followup";
    case "vaccination":
      return "card_vaccine";
    case "grooming":
      return "card_groom";
    case "dental":
      return "card_dental";
    case "checkup":
      return "card_checkup";
    default:
      "card_checkup";
  }
};

export const getAftercareCardBg = (type: string): any => {
  switch (type.toLowerCase()) {
    case "medication":
      return "card_medication";
    case "wound care":
      return "card_wound";
    case "diet and nutrition":
      return "card_diet";
    default:
      return "card_followup";
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
    case "Completed":
      return "#16C47F";
    default:
      return "bg-primary-100";
  }
};

export const isActive = (endDate: string) => {
  const inputDate = moment(endDate, "YYYY-MM-DD");
  const currentDate = moment().startOf("day");
  return inputDate.isSame(currentDate) || inputDate.isAfter(currentDate);
};

export const isBetweenDates = (startDate: string, endDate: string) => {
  const start = moment(startDate, "YYYY-MM-DD");
  const end = moment(endDate, "YYYY-MM-DD");
  const current = moment();
  return current.isAfter(start) && current.isBefore(end);
};

export const resizeImage = async (uri: string): Promise<string> => {
  const resizedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }], // Resize to a maximum width of 800px
    { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG } // Compress to 70% quality
  );
  return resizedImage.uri;
};
