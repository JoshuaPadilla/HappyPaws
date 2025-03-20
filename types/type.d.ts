import { Image, TextInputProps, TouchableOpacityProps } from "react-native";

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
  _id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

declare interface Aftercare {
  _id: string;
  petID: string;
  type: "Medication" | "Wound Care" | "Diet and Nutrition" | "Follow-up";
  medications: Medication[];
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

// const [form, setForm] = useState({
//   firstName: user?.firstName,
//   lastName: user?.lastName,
//   address: user?.address,
//   phone: user?.phone,
//   gender: user?.gender,
//   birthday: {
//     date: user?.birthday.date,
//     month: user?.birthday.month,
//     year: user?.birthday.year,
//   },
//   profilePicture: user?.profilePicture,
// });
