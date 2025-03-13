import { View, Text, Image, Pressable, StatusBar } from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { useAuthStore } from "@/store/useAuth";
import Spinner from "react-native-loading-spinner-overlay";

const welcome = () => {
  const { isCheckingAuth, authUser } = useAuthStore();

  if (authUser) return <Redirect href="/(tabs)/home" />;

  return (
    <SafeAreaView className="flex flex-1 bg-background-100">
      <StatusBar
        backgroundColor="#F6F4F0"
        barStyle="dark-content"
        translucent={true}
      />

      <Spinner
        visible={isCheckingAuth}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />

      {/* Picture */}
      <View className="w-full h-2/3 flex justify-center items-center">
        <Image
          source={images.splash_screen}
          className="size-60"
          resizeMode="contain"
        />
      </View>

      {/* Welcome Message */}
      <View className="flex flex-col w-full h-full bg-primary-100 rounded-t-[30px] p-8">
        <Text className="text-black-100 font-poppins-bold text-3xl mb-4">
          Welcome
        </Text>

        <Text className="text-black-100 font-rubik-medium text-xl mb-10">
          Ready to give your pet the best care? Explore our services and book an
          appointment today.
        </Text>

        <View className="flex-row w-full h-[6%] justify-between">
          <Link href="/signup" asChild>
            <Pressable className="w-[49%] h-full flex justify-center items-center bg-black-100 rounded-3xl">
              <Text className="font-rubik-medium text-accent-100 text-xl">
                Sign Up
              </Text>
            </Pressable>
          </Link>

          <Link href="/signin" asChild>
            <Pressable className="w-[49%] h-full flex justify-center items-center bg-accent-100 rounded-3xl">
              <Text className="font-rubik-medium text-black-100 text-xl">
                Sign In
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default welcome;
