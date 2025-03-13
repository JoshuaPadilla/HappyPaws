import {
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { profileIcons } from "@/constants/icons";

interface ImageAvatarProps {
  imageUrl: string | null;
  placeholder: ImageSourcePropType;
  size?: string;
  onPress?: () => void;
}

export const ImageAvatar = ({
  placeholder,
  imageUrl,
  size,
  onPress,
}: ImageAvatarProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className={`overflow-hidden rounded-full p-1 bg-black-400  size-${size}`}
    >
      <View className="h-full w-full rounded-full bg-black-300 p-1">
        <Image
          source={imageUrl ? { uri: imageUrl } : placeholder}
          className="h-full w-full rounded-full shadow-black-200"
          style={{ resizeMode: "cover" }}
        />
      </View>
    </TouchableOpacity>
  );
};
