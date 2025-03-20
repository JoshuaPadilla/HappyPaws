import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import icons, { adminIcons, navIcons } from "@/constants/icons";
import { useAuthStore } from "@/store/useAuth";

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

export default function AdminTabLayout() {
  const { authUser } = useAuthStore();

  if (!authUser) return <Redirect href="/welcome" />;

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
        name="overview"
        options={{
          title: "Overview",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={adminIcons.overview_icon}
              focused={focused}
              title="Overview"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: "Clients",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={adminIcons.clients_icon}
              focused={focused}
              title="Clients"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={adminIcons.appointments_admin_icon}
              focused={focused}
              title="Appointments"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={adminIcons.insights_icon}
              focused={focused}
              title="Insights"
            />
          ),
        }}
      />
    </Tabs>
  );
}
