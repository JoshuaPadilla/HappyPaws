import React from "react";
import { Stack } from "expo-router";

const AdminUtilityScreens = () => {
  return (
    <Stack>
      <Stack.Screen name="add_client" options={{ headerShown: false }} />
      <Stack.Screen name="view_client" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AdminUtilityScreens;
