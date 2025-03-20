import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import DateCalendar from "@/components/date_calendar";
import icons, { adminIcons } from "@/constants/icons";
import TimeSlotList from "@/components/timeslot_list";
import { useAdminAppointmentsStore } from "@/store/useAdminAppointmentsStore";
import OverviewTimeslotList from "@/components/admin_components/overview_timeslot_list";
import CustomButton from "@/components/custom_button";

const Overview = () => {
  const currDate = moment().format("MMMM, YYYY");

  const { appointments, fetchAllAppointments, isLoading } =
    useAdminAppointmentsStore();

  const handleRefresh = () => {
    fetchAllAppointments();
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const todayAppointments = appointments.filter(
    (appointment) =>
      moment(appointment.appointmentDate).isSame(moment(), "day") &&
      appointment.status !== "Cancelled"
  );

  return (
    <SafeAreaView className="flex-1 flex-col bg-accent-100 px-6 py-8">
      <View>
        <View className="flex-row justify-between items-end mb-6">
          <Text className="font-poppins-bold text-2xl">{currDate}</Text>
        </View>
        <View className="mb-6">
          <DateCalendar />
        </View>
      </View>

      {/* Quick Insights */}
      <View className="flex-row flex-wrap gap-4 h-64 mb-8">
        {/* Total appointments */}
        <View className="flex-col h-[48%] w-[48%] bg-insights-total rounded-xl p-4 justify-around">
          <View className="flex-row items-center gap-4">
            <Image
              source={adminIcons.total_app_icon}
              className="size-10 rounded-full"
            />

            <Text className="font-rubik-bold text-3xl text-black-100">#3</Text>
          </View>

          <Text className="font-rubik-regular text-m text-black-100">
            Total Appointments
          </Text>
        </View>

        {/* completed appointments */}
        <View className="flex-col h-[48%] w-[48%] bg-insights-completed rounded-xl p-4 justify-around">
          <View className="flex-row items-center gap-4">
            <Image
              source={adminIcons.completed_app_icon}
              className="size-10 rounded-full"
            />

            <Text className="font-rubik-bold text-3xl text-black-100">#3</Text>
          </View>

          <Text className="font-rubik-regular text-m text-black-100">
            Completed
          </Text>
        </View>

        {/* cancelled appointments */}
        <View className="flex-col h-[48%] w-[48%] bg-insights-cancelled rounded-xl p-4 justify-around">
          <View className="flex-row items-center gap-4">
            <Image
              source={adminIcons.cancelled_app_icon}
              className="size-10 rounded-full"
            />

            <Text className="font-rubik-bold text-3xl text-black-100">#3</Text>
          </View>

          <Text className="font-rubik-regular text-m text-black-100">
            Cancelled
          </Text>
        </View>

        {/* Most Booked */}
        <View className="flex-col h-[48%] w-[48%] bg-insights-most rounded-xl p-4 justify-around">
          <View className="flex-row items-center gap-4">
            <Image
              source={adminIcons.most_booked_icon}
              className="size-10 rounded-full"
            />

            <Text className="font-rubik-bold text-3xl text-black-100">#3</Text>
          </View>

          <Text className="font-rubik-regular text-sm text-black-100">
            Most Booked #Grooming
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between">
        <Text className="font-rubik-semibold text-xl text-black-100">
          Todays Appointments
        </Text>

        <CustomButton
          iconLeft={adminIcons.refresh_icon}
          iconSize="size-8"
          onPress={handleRefresh}
        />
      </View>

      {!isLoading ? (
        <OverviewTimeslotList appointmentList={todayAppointments} />
      ) : (
        <ActivityIndicator color={"#73C7C7"} className="p-16" />
      )}
    </SafeAreaView>
  );
};

export default Overview;
