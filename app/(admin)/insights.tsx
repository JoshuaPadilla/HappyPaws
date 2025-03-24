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
import { PieChart } from "react-native-gifted-charts";
import PieChartComponent from "@/components/charts/pieChart";

export default function Insights() {
  const [weekly, setWeekly] = useState(true);

  const { thisWeekInsights, getWeeklyInsights, isLoading } = useInsightsStore();
  const thisWeeksCountsByDay = thisWeekInsights?.thisWeeksCountsByDay;
  const averageAppointmentsPerWeek =
    thisWeekInsights?.averageAppointmentsPerWeek;
  const numberOfWeeklyAppointment = thisWeekInsights?.numberOfWeeklyAppointment;
  const thisWeekServicepopularity = thisWeekInsights?.thisWeekServicePopularity;
  const totalUsers = thisWeekInsights?.totalUsers;
  const newUserCount = thisWeekInsights?.newUserCount;

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
                  {Math.ceil(averageAppointmentsPerWeek || 0)}
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

      <ScrollView
        contentContainerClassName="justify-between pb-[100px] gap-4 p-2"
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          contentContainerClassName="flex-row justify-between gap-4 p-2 pr[100px]"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {/* Total Appointments */}
          <View className="p-4 bg-white rounded-lg shadow gap-2">
            <Text className="font-rubik-medium text-md text-black-200">
              Total Appointments
            </Text>

            <View className="flex-row gap-2 items-center">
              <Text className="font-rubik-semibold text-black-100 text-3xl">
                {numberOfWeeklyAppointment}
              </Text>

              <View className="flex-row gap-2">
                <Text className="font-rubik-semibold text-trend-down text-xl">
                  16.0%
                </Text>

                <Image source={icons.trend_down} className="size-6" />
              </View>

              <View></View>
            </View>
          </View>

          {/* Total Users */}
          <View className="p-4 bg-white rounded-lg shadow gap-2">
            <Text className="font-rubik-medium text-md text-black-200">
              Total Clients
            </Text>

            <View className="flex-row gap-4 items-center">
              <Text className="font-rubik-semibold text-black-100 text-3xl">
                {totalUsers}
              </Text>

              <View className="flex-row gap-2">
                <Text className="font-rubik-semibold text-trend-up text-xl">
                  4.0%
                </Text>

                <Image source={icons.trend_up} className="size-6" />
              </View>

              <View></View>
            </View>
          </View>

          {/* New Users */}
          <View className="p-4 bg-white rounded-lg shadow gap-2">
            <Text className="font-rubik-medium text-md text-black-200">
              New Users
            </Text>

            <View className="flex-row gap-4 items-center">
              <Text className="font-rubik-semibold text-black-100 text-3xl">
                {newUserCount}
              </Text>

              <View className="flex-row gap-2">
                <Text className="font-rubik-semibold text-trend-up text-xl">
                  68.0%
                </Text>

                <Image source={icons.trend_up} className="size-6" />
              </View>

              <View></View>
            </View>
          </View>
        </ScrollView>

        {/* pie chart */}
        <View className="p-4 bg-white rounded-lg shadow">
          <View className="flex-row items-center justify-between">
            <Text className="font-rubik-medium text-xl text-black-200">
              Service Popularity
            </Text>

            <CustomButton
              title="See Details"
              textClassname="font-rubik-regular text-sm text-black-300"
            />
          </View>

          <View className="flex-row gap-6 items-center p-4 justify-between">
            {/* legends */}
            <View className="gap-1">
              <View className="flex-row items-center gap-2">
                <View className="size-4 bg-base-vaccine rounded-full"></View>
                <Text className="font-rubik-regular text-black-200 text-lg">
                  Vaccine
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <View className="size-4 bg-base-groom rounded-full"></View>
                <Text className="font-rubik-regular text-black-200 text-lg">
                  Grooming
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <View className="size-4 bg-base-dental rounded-full"></View>
                <Text className="font-rubik-regular text-black-200 text-lg">
                  Dental
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <View className="size-4 bg-base-checkup rounded-full"></View>
                <Text className="font-rubik-regular text-black-200 text-lg">
                  Checkup
                </Text>
              </View>
            </View>

            {thisWeekServicepopularity && (
              <PieChartComponent data={thisWeekServicepopularity} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
