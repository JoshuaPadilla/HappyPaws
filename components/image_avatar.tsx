import { View, TouchableOpacity, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { profileIcons } from "@/constants/icons";

interface ImageAvatarProps {
  imageUrl: string | undefined;
  size?: string;
  onPress?: () => void;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const ImageAvatar = ({ imageUrl, size, onPress }: ImageAvatarProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className={`overflow-hidden rounded-full p-1 bg-black-400  size-${size}`}
    >
      <View className="h-full w-full rounded-full bg-black-300 p-1">
        <Image
          source={imageUrl}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
          // className="h-full w-full rounded-full shadow-black-200"
          style={{
            flex: 1,
            borderRadius: 100,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
