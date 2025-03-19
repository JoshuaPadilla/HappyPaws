import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Image, StatusBar, View } from "react-native";
import icons from "@/constants/icons";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className="flex-1">
      <Image
        source={icons.add_appointment}
        tintColor={"#FFC700"}
        className="size-20 rounded-full absolute bg-white z-50 bottom-[100px] right-8"
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(utility)" options={{ headerShown: false }} />
        <Stack.Screen name="(pets)" options={{ headerShown: false }} />
        <Stack.Screen name="(appointments)" options={{ headerShown: false }} />
        <Stack.Screen name="(aftercares)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar backgroundColor={"#f6f4f0"} barStyle={"dark-content"} />
    </View>
  );
}
