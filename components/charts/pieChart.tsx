import { View, Text, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";

const PieChartComponent = ({ data }: { data: any }) => {
  const screenWidth = Dimensions.get("window").width; // Get screen width
  const mappedData = data.map((item: any) => {
    switch (item.serviceType) {
      case "Grooming":
        return { value: item.count, color: "#B2F2BB" };
      case "Vaccination":
        return { value: item.count, color: "#A2D5F2" };
      case "Checkup":
        return { value: item.count, color: "#FFDAB9" };
      default:
        return { value: item.count, color: "#E6E6FA" };
    }
  });

  return <PieChart data={mappedData} isAnimated radius={screenWidth * 0.2} />;
};

export default PieChartComponent;
