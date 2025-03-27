import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";

const LineChartComponent = ({ lineChartData }: { lineChartData: any }) => {
  const screenWidth = Dimensions.get("window").width; // Get screen width
  const mappedData = lineChartData.map((item: any) => ({
    value: item.count,
    label: item.date,
    frontColor: item.count >= 7 ? "#73C7C7" : "lightgray",
  }));

  return (
    <View>
      <LineChart
        data2={mappedData}
        showScrollIndicator={false}
        isAnimated
        scrollAnimation
      />
    </View>
  );
};

export default LineChartComponent;
