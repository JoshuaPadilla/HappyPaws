import {
  AftercareForm,
  Appointment,
  MedicalRecordForm,
  MedicationForm,
  signupForm,
  User,
  VaccineForm,
} from "@/types/type";
import moment from "moment";
import * as ImageManipulator from "expo-image-manipulator";
import Toast from "react-native-toast-message";
import { Platform } from "react-native";

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

export const getGreeting = (): string => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
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
  switch (type && type.toLowerCase()) {
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

export const basicDetailsIsValid = (formData: signupForm): boolean => {
  // Name validation
  if (!formData.firstName.trim()) {
    showToast("error", "first name is required");

    return false;
  }

  if (!formData.lastName.trim()) {
    showToast("error", "last name is required");
    return false;
  }

  // Address validation
  if (!formData.address.trim()) {
    showToast("error", "address is required");
    return false;
  }

  // Phone validation
  if (!formData.phone.trim()) {
    showToast("error", "phone number is required");
    return false;
  }

  // Gender validation
  if (!formData.gender) {
    showToast("error", "Please select a gender");
    return false;
  }

  if (
    !formData.birthday.date ||
    !formData.birthday.month ||
    !formData.birthday.year
  ) {
    showToast("error", "specify you birthday");
    return false;
  }

  return true;
};

export const emailAndPassIsValid = (formData: signupForm): boolean => {
  // Email validation
  if (
    !formData.email.trim() ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
  ) {
    showToast("error", "invalid email");
    return false;
  }

  // Password validation
  if (formData.password.length < 8) {
    showToast("error", "password must be atleast 8 characters long");
    return false;
  }

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

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "#64B5F6";
    case "Cancelled":
      return "#FF8A80";
    case "Rescheduled":
      return "#FFD54F";
    case "Completed":
      return "#B9F6CA";
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

export const findMostBookedAppointments = (
  appointments: Appointment[]
): { name: string; count: number } => {
  const serviceType = [
    { name: "Vaccination", count: 0 },
    { name: "Grooming", count: 0 },
    { name: "Checkup", count: 0 },
    { name: "Dental", count: 0 },
  ];

  appointments.forEach((appointment) => {
    switch (appointment.typeOfService) {
      case "Grooming":
        serviceType[1].count += 1;
        return;
      case "Checkup":
        serviceType[2].count += 1;
        return;
      case "Dental":
        serviceType[3].count += 1;
        return;
      default:
        serviceType[0].count += 1;
        return;
    }
  });

  let maxObject: any;

  for (let i = 0; i < serviceType.length - 1; i++) {
    if (serviceType[i].count >= serviceType[i + 1].count) {
      maxObject = serviceType[i];
    }
  }

  return maxObject;
};

export const textShortener = (originalWord: string, maxNumOfLetter: number) => {
  if (!originalWord) {
    return ""; // Handle null or empty input
  }

  if (originalWord.length <= maxNumOfLetter) {
    return originalWord; // Return original if short enough
  }

  return originalWord.substring(0, maxNumOfLetter) + "...";
};

export const showToast = (
  type: "error" | "info" | "success",
  text1?: string,
  text2?: string
) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    topOffset: 50,
  });
};

export const isUserFormValid = (form: Partial<User>): boolean => {
  if (
    !form.firstName ||
    !form.lastName ||
    !form.address ||
    !form.phone ||
    !form.gender ||
    !form.birthday!.date ||
    !form.birthday!.month ||
    !form.birthday!.year
  ) {
    return false; // At least one basic field is empty
  }

  return true; // All fields are filled
};

export const getTotalPercentage = (currNumber: number, prevNumber: number) => {
  if (currNumber === 0) return 0;
  if (prevNumber === 0) return 100;

  return ((currNumber - prevNumber) / prevNumber) * 100;
};

export const percentageFormatter = (num: number) => {};

export const isValidMedication = (medication: MedicationForm): boolean => {
  if (medication.name.trim() === "") {
    return false;
  }
  if (medication.dosage.trim() === "") {
    return false;
  }
  if (medication.frequency.trim() === "") {
    return false;
  }
  if (medication.startDate.trim() === "") {
    return false;
  }
  if (medication.endDate.trim() === "") {
    return false;
  }
  return true;
};

export const isValidAftercare = (aftercare: AftercareForm): boolean => {
  if (aftercare.type.trim() === "") {
    return false;
  }
  if (aftercare.startDate.trim() === "") {
    return false;
  }
  if (aftercare.endDate.trim() === "") {
    return false;
  }
  if (aftercare.followUpDate.trim() === "") {
    return false;
  }
  if (aftercare.notes.trim() === "") {
    return false;
  }
  if (aftercare.careInstructions.trim() === "") {
    return false;
  }
  return true;
};

export const isValidMedicalForm = (
  medicalRecord: MedicalRecordForm
): boolean => {
  if (medicalRecord.diagnosis.trim() === "") {
    return false;
  }

  if (medicalRecord.treatment.trim() === "") {
    return false;
  }

  if (medicalRecord.date.trim() === "") {
    return false;
  }

  return true;
};

export const isValidVaccineForm = (form: VaccineForm) => {
  if (form.vaccineName.trim() === "") {
    return false;
  }

  if (form.administeredBy.trim() === "") {
    return false;
  }

  if (form.validity.trim() === "") {
    return false;
  }

  return true;
};

export const showMarkCompletedBtn = (appointmentStatus: string) => {
  return appointmentStatus !== "Cancelled" && appointmentStatus !== "Completed";
};

export const getServiceIcons = (serviceType: string) => {
  switch (serviceType) {
    case "Grooming":
      return "service_grooming";
    case "Vaccination":
      return "service_vaccine";
    case "Dental":
      return "service_dental";
    default:
      return "service_checkup";
  }
};

export const getStatusIcons = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "status_confirmed";
    case "Cancelled":
      return "status_cancelled";
    case "Completed":
      return "status_completed";
    default:
      return "status_resched";
  }
};

export const getProgressLineColor = (status: string) => {
  switch (status) {
    case "Completed":
      return {
        filled: "rgba(104, 159, 56, 1)",
        unfilled: "rgba(104, 159, 56, 0.1)",
      };
    case "Cancelled":
      return {
        filled: "rgba(211, 47, 47, 1)",
        unfilled: "rgba(211, 47, 47, 0.1)",
      };
    case "Confirmed":
      return {
        filled: "rgba(25, 118, 210, 1)",
        unfilled: "rgba(25, 118, 210, 0.1)",
      };
    default:
      return {
        filled: "rgba(255, 160, 0, 1)",
        unfilled: "rgba(255, 160, 0, 0.1)",
      };
  }
};

export const addShadow = () => {
  return Platform.OS === "ios"
    ? {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }
    : { elevation: 4 };
};
