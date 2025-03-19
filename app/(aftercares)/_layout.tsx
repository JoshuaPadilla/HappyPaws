import React from "react";
import { Stack } from "expo-router";

const AftercareScreens = () => {
  return (
    <Stack>
      <Stack.Screen name="view_aftercare" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AftercareScreens;
