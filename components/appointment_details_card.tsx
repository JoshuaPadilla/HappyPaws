import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  ScrollView,
} from "react-native";
import React from "react";
import { Pet } from "@/types/type";
import icons from "@/constants/icons";

interface AppointmentDetailsCardProps {
  pet: Pet | null;
  date: string;
  time: string;
  notes: string;
  type: string;
}

const AppointmentDetailsCard = ({
  pet,
  date,
  time,
  notes,
  type,
}: AppointmentDetailsCardProps) => {
  return (
    <ScrollView contentContainerClassName="px-4 py-8 rounded-xl bg-white ">
      <View className="flex justify-center items-center p-6 gap-4 border-b border-black-400">
        <Image
          source={
            pet?.petImage ? { uri: pet?.petImage } : icons.pet_image_holder
          }
          className="size-32 rounded-full"
          resizeMode="cover"
        />

        <Text className="font-rubik-semibold text-2xl text-black-100">
          {pet?.petName}
        </Text>
      </View>

      {/* appointment details */}
      <View className="py-4 gap-4 border-b border-black-400">
        <Text className="font-rubik-semibold text-lg text-black-100">
          Pet Details:
        </Text>
        <AppointmentDetailItem
          title="Pet Specie"
          value={pet?.petSpecie || ""}
        />
        <AppointmentDetailItem title="Pet Breed" value={pet?.petBreed || ""} />

        <AppointmentDetailItem
          title="Pet Gender"
          value={pet?.petGender || ""}
        />
      </View>

      {/* appointment details */}
      <View className="mt-4 gap-4">
        <Text className="font-rubik-semibold text-lg text-black-100">
          Appointment Details:
        </Text>
        <AppointmentDetailItem
          icon={icons.appointment_date}
          title="Appointment Date"
          value={date}
        />

        <AppointmentDetailItem
          icon={icons.appointment_time}
          title="Appointment Time"
          value={time}
        />

        <AppointmentDetailItem
          icon={icons.appointment_type}
          title="Appointment Type"
          value={type}
        />

        <AppointmentDetailItem
          icon={icons.appointment_notes}
          title="Appointment Notes"
          value={notes || "No note"}
        />
      </View>
    </ScrollView>
  );
};

const AppointmentDetailItem = ({
  icon,
  title,
  value,
}: {
  icon?: ImageSourcePropType;
  title: string;
  value: string;
}) => {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center justify-center gap-3">
        {icon && <Image source={icon} className="size-4" />}
        <Text className="font-rubik-medium text-sm text-black-200">
          {title}
        </Text>
      </View>

      <Text className="font-rubik-medium text-lg text-black-200">{value}</Text>
    </View>
  );
};

export default AppointmentDetailsCard;
