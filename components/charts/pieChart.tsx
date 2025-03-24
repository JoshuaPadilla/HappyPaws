import { View, Text, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";

const PieChartComponent = ({ data }: { data: any }) => {
  const screenWidth = Dimensions.get("window").width; // Get screen width
  const mappedData = data.map((item: any) => {
    return { value: item.count };
  });
  return <PieChart data={mappedData} isAnimated radius={screenWidth * 0.2} />;
};

export default PieChartComponent;
