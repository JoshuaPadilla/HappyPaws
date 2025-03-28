import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import CustomButton from "../custom_button";
import icons from "@/constants/icons";
import { getTotalPercentage } from "@/lib/utils";

interface BarChartComponentProps {
  barChartData: any;
  average?: number;
  prevAverage?: number;
  startDate?: string;
  endDate?: string;
}

const BarChartComponent = ({
  barChartData,
  average,
  prevAverage,
  startDate,
  endDate,
}: BarChartComponentProps) => {
  const screenWidth = Dimensions.get("window").width; // Get screen width
  const mappedData = barChartData.map((item: any) => ({
    value: item.count,
    label: item.date,
    frontColor: item.count >= 7 ? "#73C7C7" : "lightgray",
  }));

  const averagePercentage = getTotalPercentage(average || 0, prevAverage || 0);

  return (
    <View className="primary px-6">
      {/* heading */}
      <View className="flex-row justify-between mb-4">
        <View className=" gap-2">
          <Text className="font-rubik-semibold text-xl">
            Weekly Appointments
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
      <BarChart
        data={mappedData}
        width={screenWidth}
        barWidth={(screenWidth * 0.7) / 7 - 15}
        isAnimated
        height={150}
        barBorderRadius={5}
        maxValue={8}
        noOfSections={8}
        xAxisLabelTextStyle={{ textAlign: "center" }}
        dashGap={5}
        stepValue={2}
        hideRules
        xAxisColor={"#f5f5f5"}
        yAxisColor={"#f5f5f5"}
      />
    </View>
  );
};

export default BarChartComponent;
