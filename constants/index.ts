import moment from "moment";

export const BASE_URL = "http://172.20.10.6:3000/api/happy-paws";

// 192.168.101.18 Home
// 172.20.10.13 hotspot
//  192.168.101.39 sk hall
// 10.0.0.222 piso wifi
// ngrok https://cdd3-103-224-95-65.ngrok-free.app

export const genderDropdownData = ["Male", "Female"];

export const days = Array.from({ length: 31 }, (_, i) => i + 1);

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const petSpecies = ["Dog", "Cat", "Bird", "Other"];

export const gender = ["Male", "Female"];

export const ageFormat = ["Years", "Months"];

const currentYear = new Date().getFullYear();
const startYear = currentYear; // Example: 100 years in the past
const endYear = currentYear - 100;

export const years = Array.from(
  { length: startYear - endYear + 1 },
  (_, i) => startYear - i
);

export const businessHours = [
  "7:00-8:00 AM",
  "8:00-9:00 AM",
  "9:00-10:00 AM",
  "10:00-11:00 AM",
  "1:00-2:00 PM",
  "2:00-3:00 PM",
  "3:00-4:00 PM",
  "4:00-5:00 PM",
];

export const appointmentTypes = [
  "Vaccination",
  "Checkup",
  "Grooming",
  "Dental",
];

export const appointmentStatus = ["Pending", "Confirmed", "Cancelled"];

export const SERVICE_TYPES_CATEGORY = [
  "All",
  "Checkup",
  "Dental",
  "Vaccination",
  "Grooming",
];

export const AFTERCARE_TYPES = [
  "Medication",
  "Wound Care",
  "Diet and Nutrition",
  "Follow-up",
];

export const AGE_FORMAT = ["Years", "Months"];

export const TODAY = moment();

export const VALIDITY = ["3 Months", "6 Months", "9 Months", "1 Year"];

export const SAMPLE_AI_QUESTION = [
  "Tell me about cats",
  "How to pet a dog",
  "Sign of rabies on pets",
];
