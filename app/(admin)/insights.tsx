import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInsightsStore } from "@/store/useInsights";
import { formatDate } from "@/lib/utils";
import Spinner from "react-native-loading-spinner-overlay";
import BarChart from "@/components/charts/bar_chart";
import BarChartComponent from "@/components/charts/bar_chart";
import TabSelect from "@/components/tab_select";
import Toggle from "@/components/toggle";
import icons from "@/constants/icons";
import CustomButton from "@/components/custom_button";

export default function Insights() {
  const [weekly, setWeekly] = useState(true);

  const { thisWeekInsights, getWeeklyInsights, isLoading } = useInsightsStore();
  const thisWeeksCountsByDay = thisWeekInsights?.thisWeeksCountsByDay;
  const averageAppointmentsPerWeek =
    thisWeekInsights?.averageAppointmentsPerWeek;
  const numberOfWeeklyAppointment = thisWeekInsights?.numberOfWeeklyAppointment;
  const thisWeekServicepopularity = thisWeekInsights?.thisWeekServicePopularity;
  const thisWeekStatusCount = thisWeekInsights?.thisWeekStatusCount;

  useEffect(() => {
    getWeeklyInsights();
  }, []);

  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 flex-col bg-accent-100 px-6 py-8">
      {/* Headings */}
      <View className=" flex-row justify-between mb-8">
        <Text className="font-poppins-bold text-2xl">Insights</Text>

        <Toggle
          falseValue="Monthly"
          trueValue="Weekly"
          onPress={() => setWeekly((prev) => !prev)}
        />
      </View>

      {/* Bar chart */}
      <View>
        {/* heading */}
        <View className="flex-row justify-between mb-4">
          <View className=" gap-2">
            <Text className="font-rubik-semibold text-xl">
              Weekly Appointments
            </Text>

            <View className="gap-1">
              <Text className="font-rubik-medium text-black-300 text-m">
                daily average
              </Text>

              <View className="flex-row gap-6">
                <Text className="font-rubik-semibold text-3xl text-black-100">
                  {Math.ceil(averageAppointmentsPerWeek)}
                </Text>

                <View className="flex-row items-center gap-1">
                  <Text className="font-rubik-medium text-trend-up">0.15%</Text>
                  <Image source={icons.trend_up} className="size-4" />
                </View>
              </View>
            </View>
          </View>

          <CustomButton
            title="Details"
            textClassname="font-rubik-regular text-accent-100 px-4 py-1 bg-primary-100 rounded-lg"
          />
        </View>

        {thisWeeksCountsByDay && (
          <BarChartComponent data={thisWeeksCountsByDay} />
        )}
      </View>

      <ScrollView>
        <View className="bg-white "></View>
      </ScrollView>
    </SafeAreaView>
  );
}
