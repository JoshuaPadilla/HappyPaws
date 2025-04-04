import { Link, router } from "expo-router";
import { Alert, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import RemindersCard from "@/components/reminders_card";
import PetCard from "@/components/pet_card";
import { usePetStore } from "@/store/usePets";
import { useUserStore } from "@/store/useUser";
import { Pet } from "@/types/type";
import { goToViewPet } from "@/lib/routerFunctions";
import { useState } from "react";
import NewAppointmentModal from "@/components/new_appointment_modal";
import { useAppointmentsStore } from "@/store/useAppointments";
import { useAftercareStore } from "@/store/useAftercare";
import moment from "moment";
import { Reminders } from "@/types/type";
import { isBetweenDates } from "@/lib/utils";
export default function Home() {
  const { pets, setSelectedPet } = usePetStore();
  const { user } = useUserStore();

  const [modalVisible, setModalVisible] = useState(false);
  const reminders = getReminders();

  const handleSelecPet = (pet: Pet) => {
    setSelectedPet(pet);
    goToViewPet();
  };

  const handleAddAppointment = () => {
    if (pets.length === 0) {
      Alert.alert("Please add a pet first");
      return;
    }
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-4 py-8">
      <NewAppointmentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action="add"
      />

      {/* Headings */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="max-w-[70%]">
          <Text className="font-poppins-medium text-lg text-black-100">
            Good morning
          </Text>
          <Text className="font-poppins-semibold text-3xl text-primary-100">
            {user?.firstName}
          </Text>
        </View>

        <CustomButton
          btnClassname=""
          textClassname=""
          iconLeft={icons.bell_icon}
          iconSize="size-8"
          onPress={() => {}}
        />
      </View>

      {/* reminders */}
      <View>
        <Text className="font-rubik-bold text-2xl text-black-100 mb-2">
          Reminders
        </Text>

        {reminders.length > 0 ? (
          <ScrollView
            contentContainerClassName="flex-row mb-3"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {reminders.map((reminder, index) => (
              <RemindersCard
                time={reminder.time}
                title={reminder.title}
                type={reminder.type}
                key={index}
              />
            ))}
          </ScrollView>
        ) : (
          <View className="h-[200px] justify-center items-center">
            <Text className="font-rubik-medium text-2xl text-black-100">
              no reminders {"\n"}for today 😊🎉
            </Text>
          </View>
        )}
      </View>

      {/* New Apppointment Button */}
      <CustomButton
        title="Add New Appointment"
        btnClassname="flex-row justify-center items-center bg-primary-100 rounded-lg h-16 gap-4 mb-4"
        textClassname="font-rubik-semibold text-accent-100 text-lg"
        iconLeft={icons.add_appointment}
        iconSize="size-8"
        onPress={handleAddAppointment}
      />

      {/* Dashboard Pet list */}

      {/* headings */}
      <View className="w-full flex-row justify-between items-end mb-4">
        <Text className="font-rubik-bold text-2xl text-black-100">Pets</Text>

        <Link href={"/(tabs)/pets"}>
          <Text className="font-rubik-regular text-primary-100 text-m">
            See all
          </Text>
        </Link>
      </View>

      <ScrollView contentContainerClassName="flex-row flex-wrap justify-between gap-2 pb-[70px]">
        {pets &&
          pets.map((pet, index) => (
            <PetCard
              petBreed={pet.petBreed}
              petGender={pet.petGender}
              petName={pet.petName}
              petSpecie={pet.petSpecie}
              petImage={pet.petImage}
              key={index}
              onPress={() => handleSelecPet(pet)}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const getReminders = (): Reminders[] => {
  const { appointments } = useAppointmentsStore();
  const { allAftercares } = useAftercareStore();

  const reminders: Reminders[] = [];

  appointments.forEach((appointment) => {
    if (
      moment(appointment.appointmentDate).isSame(moment(), "day") &&
      appointment.status !== "Cancelled"
    ) {
      const pet = appointment.petID;

      reminders.push({
        type: appointment.typeOfService,
        title: `${
          typeof pet === "object" && pet?.petName ? pet.petName : ""
        }'s \n${appointment.typeOfService}`,
        time: appointment.appointmentDate,
      });
    }
  });

  allAftercares.forEach((aftercare) => {
    if (isBetweenDates(aftercare.startDate, aftercare.endDate)) {
      reminders.push({
        type: aftercare.type,
        title: aftercare.notes,
        time: aftercare.startDate,
      });
    }
  });

  return reminders;
};
