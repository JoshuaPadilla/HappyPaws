import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import icons, { navIcons } from "@/constants/icons";
import { useAuthStore } from "@/store/useAuth";
import AskButton from "@/components/ask_button";

const TabIcon = ({ focused, icon }: { focused: boolean; icon: any }) => (
  <View
    className={`flex-1 min-h-[100px] rounded-full items-center justify-end  pb-[65%] min-w-[80px] ${
      focused && "bg-white"
    }`}
  >
    <Image
      source={icon}
      tintColor={focused ? "#73C7C7" : "#FFF"}
      resizeMode="contain"
      className="size-8 mt-4"
    />
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
          backgroundColor: "#73C7C7",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          height: 70,
          marginBottom: 30,
          borderRadius: 9999,
          outerMargin: 20,
          marginLeft: 30,
          marginRight: "25%",
          overflow: "hidden",
        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#000",
          hieght: 40,
          borderRadius: 9999,
        },
      }}
    >
      <Tabs.Screen
        key="home"
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon icon={navIcons.nav_home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        key="appointment"
        name="appointment"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon icon={navIcons.nav_appointment} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        key="aftercare"
        name="aftercare"
        options={{
          title: "Aftercare",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon icon={navIcons.nav_aftercare} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        key="pets"
        name="pets"
        options={{
          title: "Pets",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon icon={navIcons.nav_pets} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
