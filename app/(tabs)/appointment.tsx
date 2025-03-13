import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import moment from "moment";
import DateCalendar from "@/components/date_calendar";
import AppointmentItem from "@/components/appointment_item";

const Appointments = () => {
  const currDate = moment().format("MMMM YYYY");

  return (
    <SafeAreaView className="flex-1 flex-col  bg-white px-4 py-5">
      {/* Headings */}
      <View className="w-full flex-row justify-between items-end mb-6">
        <Pressable>
          <Image source={icons.back} tintColor="#73C7C7" className="size-10" />
        </Pressable>

        <Pressable>
          <Image source={icons.bell} tintColor="#73C7C7" className="size-7" />
        </Pressable>
      </View>

      {/* Calendar */}
      <View className=" w-full h-40 flex-col p-4">
        {/* heading */}
        <View className="flex-row justify-between items-end">
          <View className="flex-col items-center ">
            <Image
              source={icons.left_arrow}
              tintColor="#73C7C7"
              className="size-4"
              resizeMode="contain"
            />
            <Text className="font-rubik-bold text-xs">Prev</Text>
          </View>

          <Text className="font-poppins-bold text-2xl">{currDate}</Text>

          <View className="flex-col items-center">
            <Image
              source={icons.right_arrow}
              tintColor="#73C7C7"
              className="size-4"
              resizeMode="contain"
            />
            <Text className="font-rubik-bold text-xs">Next</Text>
          </View>
        </View>

        <View className="mt-4">
          <DateCalendar />
        </View>
      </View>

      {/* New Appointment button */}
      <View className="px-4 mb-6">
        <Pressable className="bg-primary-100 w-full h-12 mt-4 rounded-xl flex-row justify-center items-center gap-4">
          <Image
            source={icons.new_appointment}
            resizeMode="contain"
            tintColor="#f5f5f5"
            className="size-7"
          />
          <Text className="font-rubik-medium text-accent-100">
            Book an Appointment
          </Text>
        </Pressable>
      </View>

      {/* Appoinrtments list */}
      <View className="flex-col w-full px-4">
        {/* heading */}
        <View className="flex-row justify-between items-end">
          <Text className="font-rubik-semibold text-xl">Appointments</Text>
          <View className="flex-row items-start gap-1">
            <Text className="font-rubik-medium text-sm text-primary-100">
              Filter
            </Text>
            <Image
              source={icons.filter}
              resizeMode="contain"
              className="size-4"
            />
          </View>
        </View>
      </View>

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-col gap-2 px-4 pb-[]"
      >
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Appointments;
