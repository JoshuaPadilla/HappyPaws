import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import { useInsightsStore } from "@/store/useInsights";
import PieChartService from "@/components/charts/pie_chart_service";
import Toggle from "@/components/toggle";
import ServiceCard from "@/components/admin_components/service_card";
import PieChartStatus from "@/components/charts/pie_chart_status";
import StatusCard from "@/components/admin_components/status_card";

const AppointmentStatus = () => {
  const [weekly, setWeekly] = useState(true);

  const { thisWeekInsights, thisMonthInsights } = useInsightsStore();

  const appointmentStatus = weekly
    ? thisWeekInsights?.weeklyStatusCount
    : thisMonthInsights?.monthlyStatusCount;

  const totalStatusCount = appointmentStatus?.reduce(
    (accumulator, currStatus) => {
      return accumulator + currStatus.count;
    },
    0
  );

  return (
    <SafeAreaView className="flex-1 px-6 py-8">
      {/* Headings */}
      <View className="flex-row justify-between items-center mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <Toggle
          falseValue="Monthly"
          trueValue={"Weekly"}
          onPress={() => setWeekly((prev) => !prev)}
        />
      </View>
      {/* pie chart status */}
      <View className="">
        <View className="p-4 bg-white rounded-lg shadow">
          <View className="flex-row items-center justify-between">
            <Text className="font-rubik-medium text-xl text-black-200">
              Appointments by Status
            </Text>
          </View>

          <View className="flex-row gap-6 items-center p-4 justify-between">
            {/* legends */}
            <View className="gap-1">
              <View className="flex-row items-center gap-2">
                <View className="size-4 bg-insights-completed rounded-full"></View>
                <Text className="font-rubik-regular text-black-200 text-lg">
                  Completed
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <View className="size-4 bg-insights-cancelled rounded-full"></View>
                <Text className="font-rubik-regular text-black-200 text-lg">
                  Cancelled
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <View className="size-4 bg-insights-resched rounded-full"></View>
                <Text className="font-rubik-regular text-black-200 text-lg">
                  Rescheduled
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <View className="size-4 bg-insights-most rounded-full"></View>
                <Text className="font-rubik-regular text-black-200 text-lg">
                  Confirmed
                </Text>
              </View>
            </View>

            {thisWeekInsights && thisMonthInsights && (
              <PieChartStatus data={appointmentStatus} />
            )}
          </View>
        </View>
      </View>

      <Text className="font-rubik-semibold text-xl pt-8 pb-4">
        Status Details
      </Text>

      <ScrollView
        contentContainerClassName="pb-[100px] flex-row flex-wrap justify-between gap-4"
        showsVerticalScrollIndicator={false}
      >
        {appointmentStatus?.map((status, index) => {
          // filter the matching status type from previous insights
          // returns an arrau so get the first item then get the count property

          return (
            <StatusCard
              key={index}
              status={status}
              totalStatusCount={totalStatusCount || 0}
              weekly={weekly}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentStatus;
