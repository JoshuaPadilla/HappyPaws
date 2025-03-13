import { Link, router } from "expo-router";
import { Alert, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import RemindersCard from "@/components/reminders_card";
import PetCard from "@/components/pet_card";
import remindersDevData from "@/dev-data/reminders_data";
import { usePetStore } from "@/store/usePets";
import { useUserStore } from "@/store/useUser";
import { Pet } from "@/types/type";
import { goToViewPet } from "@/lib/routerFunctions";
import { useState } from "react";
import NewAppointmentModal from "@/components/new_appointment_modal";
import { useAppointmentsStore } from "@/store/useAppointments";
export default function Home() {
  const { pets, setSelectedPet } = usePetStore();
  const { user } = useUserStore();
  const { addAppointment } = useAppointmentsStore();
  const [modalVisible, setModalVisible] = useState(false);

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
      <StatusBar
        backgroundColor="#F6F4F0"
        barStyle="dark-content"
        translucent={true}
      />

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

        <ScrollView
          contentContainerClassName="flex-row mb-3"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {remindersDevData.map((reminder, index) => (
            <RemindersCard
              time={reminder.time}
              title={reminder.title}
              type={reminder.type}
              key={index}
            />
          ))}
        </ScrollView>
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
