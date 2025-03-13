import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useAuthStore } from "@/store/useAuth";

const AuthLayout = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
