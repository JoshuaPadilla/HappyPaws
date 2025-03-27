import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInsightsStore } from "@/store/useInsights";
import Spinner from "react-native-loading-spinner-overlay";
import Toggle from "@/components/toggle";
import icons from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import PieChartService from "@/components/charts/pie_chart_service";
import PieChartStatus from "@/components/charts/pie_chart_status";
import LineChartComponent from "@/components/charts/lineChart";
import { getTotalPercentage } from "@/lib/utils";
import BarChartComponent from "@/components/charts/bar_chart";

export default function Insights() {
  const [weekly, setWeekly] = useState(true);

  const {
    thisWeekInsights,
    prevWeekInsights,
    getThisWeekInsights,
    getPrevWeekInsights,
    isLoading,
  } = useInsightsStore();

  // Extract data for clarity
  const thisWeek = thisWeekInsights || {};
  const prevWeek = prevWeekInsights || {};

  // this weeks insights
  const totalUsers = thisWeekInsights?.totalUsers;
  const thisWeeksCountsByDay = thisWeekInsights?.weeklyCountsByDay;
  const thisWeekAverageAppointmentsPerWeek =
    thisWeekInsights?.averageAppointmentsPerWeek;
  const thisWeeksNumberOfAppointments =
    thisWeekInsights?.numberOfWeeklyAppointment;
  const thisWeekServicepopularity = thisWeekInsights?.weeklyServicePopularity;
  const thisWeekNewUserCount = thisWeekInsights?.newUserCount;
  const thisWeekStatusCount = thisWeekInsights?.weeklyStatusCount;

  // prev week insights for comparison
  const prevWeeksCountsByDay = thisWeekInsights?.weeklyCountsByDay;
  const prevWeekAverageAppointmentsPerWeek =
    prevWeekInsights?.averageAppointmentsPerWeek;
  const numberOfPrevWeekAppointments =
    prevWeekInsights?.numberOfWeeklyAppointment;
  const prevWeekServicepopularity = prevWeekInsights?.weeklyServicePopularity;
  const prevWeekNewUserCount = prevWeekInsights?.newUserCount;
  const prevWeekStatusCount = prevWeekInsights?.weeklyStatusCount;

  // percentages
  const totaAppointmentPercentage = getTotalPercentage(
    thisWeeksNumberOfAppointments!,
    numberOfPrevWeekAppointments!
  );

  const newClientPercentage = getTotalPercentage(
    thisWeekNewUserCount!,
    prevWeekNewUserCount!
  );

  useEffect(() => {
    getThisWeekInsights();
    getPrevWeekInsights();
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
    <SafeAreaView className="flex-1 flex-col bg-accent-100 py-8">
      {/* Headings */}
      <View className=" flex-row justify-between mb-8 px-6">
        <Text className="font-poppins-bold text-2xl">Insights</Text>

        <Toggle
          falseValue="Monthly"
          trueValue="Weekly"
          onPress={() => setWeekly((prev) => !prev)}
        />
      </View>

      {/* Bar chart */}
      <View className="px-6">
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
                  {Math.ceil(thisWeekAverageAppointmentsPerWeek || 0)}
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

        {thisWeeksCountsByDay && (
          <LineChartComponent lineChartData={thisWeeksCountsByDay} />
        )}
      </View>

      <ScrollView
        contentContainerClassName="justify-between pb-[100px] gap-4 px-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Totals */}
        <ScrollView
          contentContainerClassName="flex-row gap-2 pr[100px] p-2"
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
                {thisWeeksNumberOfAppointments}
              </Text>

              <View className="flex-row gap-2">
                <Text
                  className={`font-rubik-semibold ${
                    totaAppointmentPercentage > 0
                      ? "text-trend-up"
                      : "text-trend-down"
                  } text-xl`}
                >
                  {Math.abs(totaAppointmentPercentage).toFixed()}%
                </Text>

                <Image
                  source={
                    totaAppointmentPercentage > 0
                      ? icons.trend_up
                      : icons.trend_up
                  }
                  className="size-6"
                />
              </View>

              <View></View>
            </View>
          </View>

          {/* New clients */}
          <View className="p-4 bg-white rounded-lg shadow gap-2">
            <Text className="font-rubik-medium text-md text-black-200">
              New Clients
            </Text>
            <View className="flex-row gap-2 items-center">
              <Text className="font-rubik-semibold text-black-100 text-3xl">
                {thisWeekNewUserCount}
              </Text>

              <View className="flex-row gap-2">
                <Text
                  className={`font-rubik-semibold ${
                    newClientPercentage > 0
                      ? "text-trend-up"
                      : "text-trend-down"
                  } text-xl`}
                >
                  {newClientPercentage
                    ? `${Math.abs(newClientPercentage).toFixed()}%`
                    : ""}
                </Text>

                {newClientPercentage ? (
                  <Image
                    source={
                      newClientPercentage > 0 ? icons.trend_up : icons.trend_up
                    }
                    className="size-6"
                  />
                ) : null}
              </View>
            </View>
          </View>

          {/* Total clients */}
          <View className="p-4 bg-white rounded-lg shadow gap-2">
            <Text className="font-rubik-medium text-md text-black-200">
              Total Clients
            </Text>

            <View className="flex-row gap-4 items-center">
              <Text className="font-rubik-semibold text-black-100 text-3xl">
                {totalUsers}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* pie chart service*/}
        <View className="">
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
                <PieChartService data={thisWeekServicepopularity} />
              )}
            </View>
          </View>
        </View>

        {/* pie chart status */}
        <View className="">
          <View className="p-4 bg-white rounded-lg shadow">
            <View className="flex-row items-center justify-between">
              <Text className="font-rubik-medium text-xl text-black-200">
                Appointments by Status
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

              {thisWeekServicepopularity && (
                <PieChartStatus data={thisWeekStatusCount} />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
