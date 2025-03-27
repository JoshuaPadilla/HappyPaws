import { View, Text, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";

const PieChartStatus = ({ data }: { data: any }) => {
  const screenWidth = Dimensions.get("window").width; // Get screen width
  const mappedData = data.map((item: any) => {
    switch (item.status.toLowerCase()) {
      case "completed":
        return { value: item.count, color: "#2fdd92" };
      case "cancelled":
        return { value: item.count, color: "#FF6868" };
      case "rescheduled":
        return { value: item.count, color: "#C3FF93" };
      default:
        return { value: item.count, color: "#FFA1F5" };
    }
  });

  return <PieChart data={mappedData} isAnimated radius={screenWidth * 0.2} />;
};

export default PieChartStatus;
