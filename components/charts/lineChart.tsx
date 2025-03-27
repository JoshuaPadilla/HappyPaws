import { View, Text, Dimensions, ScrollView, Image } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
import CustomButton from "../custom_button";
import icons from "@/constants/icons";
import { getTotalPercentage } from "@/lib/utils";

interface LineChartComponentProps {
  lineChartData: any;
  average?: number;
  prevAverage?: number;
}

const devLineChartData = [
  { date: "Apr 01", count: Math.floor(Math.random() * 9) },
  { date: "Apr 02", count: Math.floor(Math.random() * 9) },
  { date: "Apr 03", count: Math.floor(Math.random() * 9) },
  { date: "Apr 04", count: Math.floor(Math.random() * 9) },
  { date: "Apr 05", count: Math.floor(Math.random() * 9) },
  { date: "Apr 06", count: Math.floor(Math.random() * 9) },
  { date: "Apr 07", count: Math.floor(Math.random() * 9) },
  { date: "Apr 08", count: Math.floor(Math.random() * 9) },
  { date: "Apr 09", count: Math.floor(Math.random() * 9) },
  { date: "Apr 10", count: Math.floor(Math.random() * 9) },
  { date: "Apr 11", count: Math.floor(Math.random() * 9) },
  { date: "Apr 12", count: Math.floor(Math.random() * 9) },
  { date: "Apr 13", count: Math.floor(Math.random() * 9) },
  { date: "Apr 14", count: Math.floor(Math.random() * 9) },
  { date: "Apr 15", count: Math.floor(Math.random() * 9) },
  { date: "Apr 16", count: Math.floor(Math.random() * 9) },
  { date: "Apr 17", count: Math.floor(Math.random() * 9) },
  { date: "Apr 18", count: Math.floor(Math.random() * 9) },
  { date: "Apr 19", count: Math.floor(Math.random() * 9) },
  { date: "Apr 20", count: Math.floor(Math.random() * 9) },
  { date: "Apr 21", count: Math.floor(Math.random() * 9) },
  { date: "Apr 22", count: Math.floor(Math.random() * 9) },
  { date: "Apr 23", count: Math.floor(Math.random() * 9) },
  { date: "Apr 24", count: Math.floor(Math.random() * 9) },
  { date: "Apr 25", count: Math.floor(Math.random() * 9) },
  { date: "Apr 26", count: Math.floor(Math.random() * 9) },
  { date: "Apr 27", count: Math.floor(Math.random() * 9) },
  { date: "Apr 28", count: Math.floor(Math.random() * 9) },
  { date: "Apr 29", count: Math.floor(Math.random() * 9) },
  { date: "Apr 30", count: Math.floor(Math.random() * 9) },
];

const LineChartComponent = ({
  lineChartData,
  average,
  prevAverage,
}: LineChartComponentProps) => {
  const mappedData = lineChartData.map((item: any) => ({
    value: item.count,
    label: item.date,
  }));

  const averagePercentage = getTotalPercentage(average || 0, prevAverage || 0);

  return (
    <View className="px-6">
      {/* heading */}
      <View className="flex-row justify-between mb-4">
        <View className=" gap-2">
          <Text className="font-rubik-semibold text-xl">
            Monthly Appointments
          </Text>

          <View className="gap-1">
            <Text className="font-rubik-medium text-black-300 text-m">
              Daily average
            </Text>

            <View className="flex-row gap-6">
              <Text className="font-rubik-semibold text-3xl text-black-100">
                {Math.ceil(average || 0)}
              </Text>

              <View className="flex-row items-center gap-1">
                <Text
                  className={`font-rubik-semibold ${
                    averagePercentage > 0 ? "text-trend-up" : "text-trend-down"
                  } text-xl`}
                >
                  {averagePercentage
                    ? `${Math.abs(averagePercentage).toFixed()}%`
                    : ""}
                </Text>

                {averagePercentage ? (
                  <Image
                    source={
                      averagePercentage > 0 ? icons.trend_up : icons.trend_up
                    }
                    className="size-6"
                  />
                ) : null}
              </View>
            </View>
          </View>
        </View>

        <CustomButton
          title="Details"
          textClassname="font-rubik-regular text-accent-100 px-4 py-1 bg-primary-100 rounded-lg"
        />
      </View>
      <LineChart
        data={mappedData}
        height={150}
        curved
        overflowBottom={0}
        spacing={80}
        overflowTop={0}
        maxValue={8}
        stepValue={2}
        scrollAnimation
        nestedScrollEnabled
        showScrollIndicator
        stepHeight={50}
        areaChart
        hideDataPoints
        hideRules
        yAxisColor={"#f5f5f5"}
        xAxisColor={"#f5f5f5"}
        color="#73C7C7"
        thickness={4}
        startFillColor="#73C7C7"
        scrollToEnd
      />
    </View>
  );
};

export default LineChartComponent;
