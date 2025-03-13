import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Appointment {
  appointmentId: string; // Or number
  appointmentTitle?: string;
  userName: string;
  userPhoneNumber: string;
  userEmailAddress: string;
  userAddress: string;
  appointmentDate: string;
  appointmentTime: string;
  typeOfService: string;
  petName: string;
  petSpecie: string;
  petBreed: string;
  petAge: number;
}

declare interface AppointmentForm {
  _id?: string;
  userID: string;
  petID: string;
  appointmentDate: string;
  appointmentTime: string;
  typeOfService: string;
  appointmentNotes: string;
  status?: string;
}

declare interface Reminders {
  type: string;
  title: string;
  time: string;
}

declare interface userBirthday {
  date: string;
  month: string;
  year: string;
}

declare interface User {
  _id: string;
  lastName: string;
  firstName: string;
  address: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "";
  birthday: userBirthday;
  profilePicture: any;
  pets: any[];
  appointments: Appointment[];
  appointmentHistory: Appointment[];
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
  petAge: number | string;
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
  petImage: string | null;
}
