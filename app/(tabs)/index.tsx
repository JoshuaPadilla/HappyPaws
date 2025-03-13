import { Link, Redirect } from "expo-router";
import moment from "moment";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons";
import RemindersCard from "@/components/reminders_card";
import DateCalendar from "@/components/date_calendar";
import PetCard from "@/components/pet_card";
import images from "@/constants/images";
import { usePets } from "@/contexts/pets";

export default function Home() {
  const { isLoading, petList } = usePets().state;
  const myDate = moment(); // Parsing a date stringg

  if (true) {
    return <Redirect href="/signin" />;
  }

  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-white px-4 py-8">
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
        translucent={true}
      />

      {/* home container */}
      <View className="flex-1 w-full h-full bg-white">
        {/* headings */}
        <View className="border-1 w-full h-fit justify-between flex-row items-center">
          {/* heading greetings */}
          <View className="flex-col w-fit h-fit">
            <Text className="text-2xl text-black-100 font-poppins-regular ">
              Good Afternoon
            </Text>
            <Text className="text-[32px] text-primary-100 font-poppins-bold ">
              Joshua Padilla
            </Text>
          </View>
          <Image source={icons.bell} className="size-7" resizeMode="contain" />
        </View>

        {/* dashboard daily reminders */}
        <View className="w-full flex  flex-col mt-4 gap-2">
          <View className="w-full flex-row justify-between items-center">
            <Text className="text-3xl font-rubik-bold text-black-100">
              Today
            </Text>
            <Text className="font-rubik-regular text-sm text-primary-100">
              See All
            </Text>
          </View>
          <ScrollView
            horizontal
            contentContainerClassName="flex-row gap-1"
            showsHorizontalScrollIndicator={false}
          >
            <RemindersCard
              title="appointment"
              desc="Buranday's Appointment"
              type="Vaccine"
              time="10:00 - 11:00 AM"
            />

            <RemindersCard
              title="aftercare"
              desc="Buranday's Appointment"
              type="Prescription"
              time="2:00 PM"
            />
          </ScrollView>
        </View>

        <View className="mt-8 px-4 flex-row justify-center items-center bg-accent-300 gap-4 w-full h-14 rounded-xl">
          <Image
            source={icons.add_appointment}
            className="size-6"
            tintColor="#8C8E98"
          />
          <Text className="font-rubik-semibold text-black-200 text-m">
            Book an Appointment
          </Text>
        </View>

        {/* Pets Heading */}

        <View className="w-full flex-row justify-between items-center mt-8">
          <Text className="font-rubik-bold text-2xl text-black-100">
            Your Pets
          </Text>
          <Text className="font-rubik-regular text-sm text-primary-100">
            See All
          </Text>
        </View>

        {/* pet list */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-wrap flex-row mt-4 justify-between gap-4 w-full pb-[70]"
        >
          {isLoading ? (
            <Text>Loading . . .</Text>
          ) : (
            petList.map((pet) => (
              <PetCard
                key={pet.petID}
                petImage={images.dog}
                petName={pet.petName}
                petBreed={pet.petBreed}
                petAge={pet.petAge}
                petGender={pet.petGender}
                petSpecie={pet.petSpecie}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
