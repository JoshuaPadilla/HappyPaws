import React from "react";
import { Stack } from "expo-router";

const UtilityScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="edit_profile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default UtilityScreensLayout;
