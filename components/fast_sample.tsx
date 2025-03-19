import { View, Text } from "react-native";
import FastImage from "react-native-fast-image";

const FastSample = () => {
  return (
    <FastImage
      style={{ width: 200, height: 200 }}
      source={{
        uri: "https://unsplash.it/400/400?image=1",
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};

export default FastSample;
