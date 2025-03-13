import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import icons from "@/constants/icons";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#73C7C7" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${
        focused
          ? "text-primary-100 font-rubik-medium"
          : "text-black-200 font-rubik-regular"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F6F4F0",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Appointment",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.appointments}
              focused={focused}
              title="Appointment"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pets"
        options={{
          title: "Pets",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.pets} focused={focused} title="Pets" />
          ),
        }}
      />
    </Tabs>
  );
}
