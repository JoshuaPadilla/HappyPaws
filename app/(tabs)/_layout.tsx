import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import icons, { navIcons } from "@/constants/icons";
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

export default function TabLayout() {
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
        key="home"
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={navIcons.nav_home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        key="appointment"
        name="appointment"
        options={{
          title: "Appointment",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={navIcons.nav_appointment}
              focused={focused}
              title="Appointment"
            />
          ),
        }}
      />
      <Tabs.Screen
        key="aftercare"
        name="aftercare"
        options={{
          title: "Aftercare",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={navIcons.nav_aftercare}
              focused={focused}
              title="Aftercare"
            />
          ),
        }}
      />
      <Tabs.Screen
        key="pets"
        name="pets"
        options={{
          title: "Pets",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={navIcons.nav_pets} focused={focused} title="Pets" />
          ),
        }}
      />
      <Tabs.Screen
        key="profile"
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={navIcons.nav_profile}
              focused={focused}
              title="Profile  "
            />
          ),
        }}
      />
    </Tabs>
  );
}
