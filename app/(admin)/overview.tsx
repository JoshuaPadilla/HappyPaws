import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import DateCalendar from "@/components/date_calendar";
import icons, { adminIcons } from "@/constants/icons";
import TimeSlotList from "@/components/timeslot_list";
import { useAdminAppointmentsStore } from "@/store/useAdminAppointmentsStore";
import OverviewTimeslotList from "@/components/admin_components/overview_timeslot_list";
import CustomButton from "@/components/custom_button";
import { findMostBookedAppointments, formatDate } from "@/lib/utils";
import { router } from "expo-router";

const Overview = () => {
  const currDate = moment().format("YYYY-MM-DD");

  const { byDateAppointments, fetchAppointmentByDate, isLoading } =
    useAdminAppointmentsStore();

  const handleRefresh = () => {
     fetchAppointmentByDate(currDate);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchAppointmentByDate(currDate, signal);

    return () => {
      controller.abort(); // Cancel the previous fetch on cleanup
    };
  }, [currDate]);

  const totalAppointments = byDateAppointments.length;
  const cancelledAppointments = byDateAppointments.reduce(
    (accumulator, appointment) => {
      return appointment.status === "Cancelled" ? accumulator + 1 : accumulator;
    },
    0
  );
  const completedAppointments = byDateAppointments.reduce(
    (accumulator, appointment) => {
      return appointment.status === "Completed" ? accumulator + 1 : accumulator;
    },
    0
  );
  const mostBooked: { name: string; count: number } =
    findMostBookedAppointments(byDateAppointments);

  return (
    <SafeAreaView className="flex-1 flex-col bg-accent-100 px-6 py-8">
      <View>
        <View className="flex-row justify-between items-end mb-6">
          <Text className="font-poppins-bold text-2xl">
            {formatDate(currDate).split(" ").slice(0, 1)}{" "}
            {formatDate(currDate).split(" ").slice(2)}
          </Text>
        </View>
        <View className="mb-6">
          <DateCalendar />
        </View>
      </View>

      {/* Quick Insights */}
      <View className="flex gap-4 h-64 mb-8">
        <View className="flex-row justify-between w-full h-[50%]">
          {/* Total appointments */}
          <View className="flex-col h-full w-[48%] bg-insights-total rounded-xl p-4 justify-around">
            <View className="flex-row items-center gap-4">
              <Image
                source={adminIcons.total_app_icon}
                className="size-10 rounded-full"
              />

              <Text className="font-rubik-bold text-3xl text-black-100">
                {totalAppointments}
              </Text>
            </View>

            <Text className="font-rubik-regular text-m text-black-100">
              Total Appointments
            </Text>
          </View>

          {/* completed appointments */}
          <View className="flex-col h-full w-[48%] bg-insights-completed rounded-xl p-4 justify-around">
            <View className="flex-row items-center gap-4">
              <Image
                source={adminIcons.completed_app_icon}
                className="size-10 rounded-full"
              />

              <Text className="font-rubik-bold text-3xl text-black-100">
                {completedAppointments}
              </Text>
            </View>

            <Text className="font-rubik-regular text-m text-black-100">
              Completed
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between w-full h-[50%]">
          {/* cancelled appointments */}
          <View className="flex-col h-full w-[48%] bg-insights-cancelled rounded-xl p-4 justify-around">
            <View className="flex-row items-center gap-4">
              <Image
                source={adminIcons.cancelled_app_icon}
                className="size-10 rounded-full"
              />

              <Text className="font-rubik-bold text-3xl text-black-100">
                {cancelledAppointments}
              </Text>
            </View>

            <Text className="font-rubik-regular text-m text-black-100">
              Cancelled
            </Text>
          </View>

          {/* Most Booked */}
          <View className="flex-col h-full w-[48%] bg-insights-most rounded-xl p-4 justify-around">
            <View className="flex-row items-center gap-4">
              <Image
                source={adminIcons.most_booked_icon}
                className="size-10 rounded-full"
              />

              <Text className="font-rubik-bold text-3xl text-black-100">
                {mostBooked.count}
              </Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <Text className="font-rubik-regular text-sm text-black-100">
                Most Booked
              </Text>
              <Text className="font-rubik-bold text-m text-black-100">
                {mostBooked.name}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between mb-8 items-center">
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
        <OverviewTimeslotList appointmentList={byDateAppointments} />
      ) : (
        <ActivityIndicator color={"#73C7C7"} className="p-16" />
      )}
    </SafeAreaView>
  );
};

export default Overview;
