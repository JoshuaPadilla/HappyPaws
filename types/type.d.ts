import { Image, TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Appointment {
  _id?: string;
  userID: User;
  petID: Pet;
  appointmentDate: string;
  appointmentTime: string;
  typeOfService: "Vaccination" | "Checkup" | "Grooming" | "Dental" | string;
  appointmentNotes: string;
  status?: string;
}

declare interface AppointmentForm {
  _id?: string;
  userID: string;
  petID: string;
  appointmentDate: string;
  appointmentTime: string;
  typeOfService: "Vaccination" | "Checkup" | "Grooming" | "Dental" | string;
  appointmentNotes: string;
  status?: string;
}

// reminders type if appointment or aftercare
declare interface Reminder {
  id?: string;
  remindersType: "Appointment" | "Aftercare";
  type: string;
  title: string;
  time?: string;
  note?: string;
}

declare interface userBirthday {
  date?: string;
  month?: string;
  year?: string;
}

declare interface User {
  _id: string;
  lastName: string;
  firstName: string;
  address: string;
  email: string;
  phone: string;
  gender?: "Male" | "Female" | "";
  birthday?: userBirthday;
  profilePicture?: any;
  pets?: any[];
  appointments?: Appointment[];
  appointmentHistory?: Appointment[];
  role?: string;
  joinedAt?: string;
}

declare interface signupForm {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  gender: string;
  birthday: userBirthday;
  email: string;
  password: string;
  confirmPassword: string;
}

declare interface signinForm {
  email: string;
  password: string;
}

declare interface Pet {
  _id: string;
  petName: string;
  petAge: string;
  petBreed: string;
  petSpecie: string;
  petGender: string;
  petImage: any;
}

declare interface PetFormData {
  petName: string;
  petSpecie: string;
  petBreed: string;
  petAge: string;
  petGender: string;
  petImage: ImageInfo | null;
}

declare interface AddPetForm {
  petName: string;
  petSpecie: string;
  petBreed: string;
  petAge: string;
  petGender: string;
  petImage: ImageInfo | null;
}

declare interface Medication {
  _id?: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  indexID?: string;
}

declare interface MedicationForm {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

declare interface Aftercare {
  _id: string;
  petID: Pet;
  type: "Medication" | "Wound Care" | "Diet and Nutrition" | "Follow-up";
  medications?: Medication[];
  followUpDate: string;
  restrictions: string[];
  careInstructions: string;
  notes: string;
  endDate: string;
  startDate: string;
}

declare interface userFormData {
  lastName: string;
  firstName: string;
  address: string;
  phone: string;
  gender: "Male" | "Female" | "";
  birthday: userBirthday;
  profilePicture: any;
}

declare interface ImageInfo {
  uri: string;
  type: string;
  fileName: string;
}

declare interface MedicalRecord {
  _id?: string;
  petID: Pet;
  userID: User;
  diagnosis: string;
  treatment: string;
  prescribedMedications: Medication[];
  date: string;
  notes: string;
}

declare interface MedicalRecordForm {
  diagnosis: string;
  treatment: string;
  prescribedMedications: Medication[];
  date: string;
  notes: string;
}

declare interface Vaccine {
  _id: string;
  petID: Pet;
  vaccineName: string;
  dateAdministered: string;
  validity: string;
  dueDate: string;
  administeredBy: string;
  notes?: string;
}

declare interface VaccineForm {
  vaccineName: string;
  dateAdministered: string;
  validity: string;
  administeredBy: string;
  notes?: string;
}

declare interface AftercareForm {
  type: "Medication" | "Wound Care" | "Diet and Nutrition" | "Follow-up";
  medications?: Medication[];
  followUpDate: string;
  restrictions: string[];
  careInstructions: string;
  notes: string;
  endDate: string;
  startDate: string;
}

declare interface Message {
  sender: "you" | "ai";
  content: string;
}
