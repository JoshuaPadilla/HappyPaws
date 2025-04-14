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
import {
  goToAppointmentStatus,
  goToServicePopularity,
} from "@/lib/routerFunctions";

export default function Insights() {
  const [weekly, setWeekly] = useState(true);

  const {
    thisWeekInsights,
    prevWeekInsights,
    getThisWeekInsights,
    getPrevWeekInsights,
    thisMonthInsights,
    prevMonthInsights,
    getPrevMonthInsights,
    getThisMonthInsights,
    isLoading,
  } = useInsightsStore();

  const currTotalAppointments = weekly
    ? thisWeekInsights?.numberOfWeeklyAppointment
    : thisMonthInsights?.numberOfMonthlyAppointments;

  const prevTotalAppointments = weekly
    ? prevWeekInsights?.numberOfWeeklyAppointment
    : prevMonthInsights?.numberOfMonthlyAppointments;

  const currNewClients = weekly
    ? thisWeekInsights?.newUserCount
    : thisMonthInsights?.newUserCount;

  const prevNewClients = weekly
    ? prevWeekInsights?.newUserCount
    : prevMonthInsights?.newUserCount;

  const servicePopularity = weekly
    ? thisWeekInsights?.weeklyServicePopularity
    : thisMonthInsights?.monthlyServicePopularity;

  const appointmentStatus = weekly
    ? thisWeekInsights?.weeklyStatusCount
    : thisMonthInsights?.monthlyStatusCount;

  const average = weekly
    ? thisWeekInsights?.averageAppointmentsPerWeek
    : thisMonthInsights?.averageAppointmentsPerMonth;

  const prevAverage = weekly
    ? prevWeekInsights?.averageAppointmentsPerWeek
    : prevMonthInsights?.averageAppointmentsPerMonth;

  const startDate = weekly
    ? thisWeekInsights?.startDate
    : thisMonthInsights?.startDate;

  const endDate = weekly
    ? thisWeekInsights?.endDate
    : thisMonthInsights?.endDate;

  // percentages
  const totalAppointmentPercentage = getTotalPercentage(
    currTotalAppointments || 0,
    prevTotalAppointments || 0
  );

  const newClientPercentage = getTotalPercentage(
    currNewClients || 0,
    prevNewClients || 0
  );

  useEffect(() => {
    getThisWeekInsights();
    getPrevWeekInsights();
    getThisMonthInsights();
    getPrevMonthInsights();
  }, []);

  const handleViewServicePopularity = () => {
    goToServicePopularity();
  };

  const handleViewAppointmentStatuses = () => {
    goToAppointmentStatus();
  };

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
          trueValue={"Weekly"}
          onPress={() => setWeekly((prev) => !prev)}
        />
      </View>

      {/* Bar chart or line chart*/}
      <View className="mb-4">
        {weekly
          ? thisWeekInsights && (
              <BarChartComponent
                barChartData={thisWeekInsights?.weeklyCountsByDay}
                average={average}
                prevAverage={prevAverage}
                startDate={startDate}
                endDate={endDate}
              />
            )
          : thisMonthInsights && (
              <LineChartComponent
                lineChartData={thisMonthInsights?.monthlyCountsByDay}
                average={average}
                prevAverage={prevAverage}
                startDate={startDate}
                endDate={endDate}
              />
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
                {currTotalAppointments || 0}
              </Text>

              <View className="flex-row gap-2">
                <Text
                  className={`font-rubik-semibold ${
                    totalAppointmentPercentage > 0
                      ? "text-trend-up"
                      : "text-trend-down"
                  } text-xl`}
                >
                  {totalAppointmentPercentage
                    ? `${Math.abs(totalAppointmentPercentage).toFixed()}%`
                    : ""}
                </Text>

                {totalAppointmentPercentage ? (
                  <Image
                    source={
                      totalAppointmentPercentage > 0
                        ? icons.trend_up
                        : icons.trend_down
                    }
                    className="size-6"
                  />
                ) : null}
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
                {currNewClients || 0}
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
                      newClientPercentage > 0
                        ? icons.trend_up
                        : icons.trend_down
                    }
                    className="size-6"
                  />
                ) : null}
              </View>
            </View>
          </View>

          {/* Total Clients */}
          <View className="p-4 bg-white rounded-lg shadow gap-2">
            <Text className="font-rubik-medium text-md text-black-200">
              Total Clients
            </Text>

            <View className="flex-row gap-4 items-center">
              <Text className="font-rubik-semibold text-black-100 text-3xl">
                {thisWeekInsights?.totalUsers || 0}
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
                onPress={handleViewServicePopularity}
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

              {thisMonthInsights && thisWeekInsights && (
                <PieChartService data={servicePopularity} />
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
                onPress={handleViewAppointmentStatuses}
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

              {thisWeekInsights && thisMonthInsights && (
                <PieChartStatus data={appointmentStatus} />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
