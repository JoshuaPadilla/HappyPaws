import { View, Text, Dimensions } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { formatDate } from "@/lib/utils";
import moment from "moment";

const BarChartComponent = ({ data }: { data: any }) => {
  const screenWidth = Dimensions.get("window").width; // Get screen width
  const mappedData = data.map((item: any) => ({
    value: item.count,
    label: item.date,
    frontColor: item.count >= 7 ? "#73C7C7" : "lightgray",
  }));

  return (
    <View className="primary">
      <Text>
        <BarChart
          data={mappedData}
          width={screenWidth * 0.7}
          barWidth={(screenWidth * 0.7) / 7 - 21}
          isAnimated
          onPress={(item: any, index: any) => {
            console.log(item, index);
          }}
          height={150}
          barBorderRadius={5}
          spacing={20}
          maxValue={8}
          noOfSections={8}
          xAxisLabelTextStyle={{ textAlign: "center" }}
          dashGap={5}
        />
      </Text>
    </View>
  );
};

export default BarChartComponent;
