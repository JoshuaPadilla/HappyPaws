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
  startDate?: string;
  endDate?: string;
}

const LineChartComponent = ({
  lineChartData,
  average,
  prevAverage,
  startDate,
  endDate,
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
            <Text className="font-rubik-regular text-black-300 text-m">
              Daily average{" "}
              <Text className="font-rubik-medium text-primary-100 text-lg">
                {startDate} - {endDate}
              </Text>
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
                      averagePercentage > 0 ? icons.trend_up : icons.trend_down
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
        areaChart
        hideDataPoints
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
