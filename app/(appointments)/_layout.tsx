import React from "react";
import { Stack } from "expo-router";

const AppointmentsScreens = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal", // or "transparentModal" if you prefer
      }}
    >
      <Stack.Screen name="view_appointment" options={{ headerShown: false }} />
      <Stack.Screen
        name="appointment_history"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default AppointmentsScreens;
