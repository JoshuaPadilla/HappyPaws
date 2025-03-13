import { Appointment } from "@/types/type";

export const appointments: Appointment[] = [
  {
    appointmentId: "A123",
    appointmentTitle: "Buddy's Checkup",
    userName: "John Doe",
    userPhoneNumber: "123-456-7890",
    userEmailAddress: "john.doe@example.com",
    userAddress: "123 Main St",
    appointmentDate: "2025-03-10", // Date as string
    appointmentTime: "9:00 - 10:00 AM",
    typeOfService: "Checkup",
    petName: "Buddy",
    petSpecie: "Dog",
    petBreed: "Golden Retriever",
    petAge: 3,
  },
  {
    appointmentId: "B456",
    appointmentTitle: "Whisker's Gromming",
    userName: "Jane Smith",
    userPhoneNumber: "987-654-3210",
    userEmailAddress: "jane.smith@example.com",
    userAddress: "456 Oak Ave",
    appointmentDate: "2025-03-15", // Date as string
    appointmentTime: "1:00 - 2:00 PM",
    typeOfService: "Grooming",
    petName: "Whiskers",
    petSpecie: "Cat",
    petBreed: "Persian",
    petAge: 5,
  },
  {
    appointmentId: "C789",
    appointmentTitle: "Charlie's Vaccination",

    userName: "Peter Jones",
    userPhoneNumber: "555-123-4567",
    userEmailAddress: "peter.jones@example.com",
    userAddress: "789 Pine Ln",
    appointmentDate: "2025-03-20", // Date as string
    appointmentTime: "10:00 - 11:00 AM",
    typeOfService: "Vaccination",
    petName: "Charlie",
    petSpecie: "Bird",
    petBreed: "Parakeet",
    petAge: 1,
  },
];
