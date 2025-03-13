import React from "react";
import { Stack } from "expo-router";

const PetScreens = () => {
  return (
    <Stack>
      <Stack.Screen name="add_pet" options={{ headerShown: false }} />
      <Stack.Screen name="view_pet" options={{ headerShown: false }} />
      <Stack.Screen name="update_pet" options={{ headerShown: false }} />
      <Stack.Screen name="pet_details" options={{ headerShown: false }} />
      <Stack.Screen name="edit_pet" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PetScreens;
