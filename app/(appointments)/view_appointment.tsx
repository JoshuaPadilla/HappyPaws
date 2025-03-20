import React, { useState } from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppointmentsStore } from "@/store/useAppointments";
import {
  findPetById,
  formatDate,
  getAppointmentColors,
  getStatusColor,
} from "@/lib/utils";
import CustomButton from "@/components/custom_button";
import { goBack } from "@/lib/routerFunctions";
import icons, {
  petDetailsIcons,
  profileIcons,
  viewPetIcons,
} from "@/constants/icons";
import NewAppointmentModal from "@/components/new_appointment_modal";

const ViewAppointment = () => {
  const { selectedAppointment, cancelAppointment } = useAppointmentsStore();
  const appointedPet = findPetById(selectedAppointment?.petID._id || "");
  const colors = getAppointmentColors(selectedAppointment?.typeOfService);
  const formattedAppointmentDate = formatDate(
    selectedAppointment?.appointmentDate || ""
  );

  const [modalVisible, setModalVisible] = useState(false);

  const handleEditAppointment = () => {
    if (selectedAppointment) {
      setModalVisible(true);
    }
  };

  const handleCancelAppointment = () => {
    if (selectedAppointment?._id) {
      cancelAppointment(selectedAppointment._id);
    }

    goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8 gap-4">
      <NewAppointmentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action="edit"
      />

      {/* Headings */}
      <View className="flex-row justify-between items-center broder mb-8">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        {selectedAppointment?.status !== "Cancelled" &&
          selectedAppointment?.status !== "Completed" && (
            <View className="flex-row gap-2">
              <CustomButton
                iconLeft={icons.cancel}
                title="Cancel"
                btnClassname="flex-row items-center justify-center gap-2 rounded-xl px-4 py-1 bg-danger"
                textClassname="font-rubik-light text-m text-accent-100"
                iconSize="size-3"
                tintColor="#F6F4F0"
                onPress={handleCancelAppointment}
              />

              <CustomButton
                iconLeft={profileIcons.profile_detailsEdit}
                title="Edit"
                btnClassname="flex-row items-center justify-center gap-2 rounded-xl px-4 py-1 bg-primary-100"
                textClassname="font-rubik-light text-m text-accent-100"
                iconSize="size-3"
                tintColor="#F6F4F0"
                onPress={handleEditAppointment}
              />
            </View>
          )}
      </View>

      {/* Pet detials */}

      <View className="border-black-400 border-2 rounded-xl  p-4">
        <View className="flex-row gap-2 ">
          {appointedPet?.petImage ? (
            <Image
              source={{ uri: appointedPet?.petImage }}
              className="size-32 rounded-lg"
            />
          ) : (
            <Image
              source={icons.pet_image_holder}
              className="size-32 rounded-lg"
            />
          )}

          <View className="flex-1 px-4">
            <DetailsItem
              icon={petDetailsIcons.pet_name}
              title="Name"
              value={appointedPet?.petName || "No name"}
            />

            <DetailsItem
              icon={petDetailsIcons.pet_specie}
              title="Specie"
              value={appointedPet?.petSpecie || "No specie"}
            />

            <DetailsItem
              icon={petDetailsIcons.pet_breed}
              title="Breed"
              value={appointedPet?.petBreed || "No breed"}
            />

            <DetailsItem
              icon={petDetailsIcons.pet_gender}
              title="Gender"
              value={appointedPet?.petGender || "No gender"}
            />
          </View>
        </View>
        <View></View>
      </View>

      {/* Appointment details */}
      <View className="rounded-xl gap-6 p-4">
        <Text className="font-rubik-medium text-xl text-black-100 mb-4">
          Appointment Details:
        </Text>

        <DetailsItem
          icon={icons.appointment_status}
          title="Appointment Status"
          value={selectedAppointment?.status || "No status"}
          tintColor={getStatusColor(selectedAppointment?.status || "")}
        />

        <DetailsItem
          icon={icons.appointment_type}
          title="Appointment Type"
          value={selectedAppointment?.typeOfService || "No type"}
          valueClassname="s"
          valueColor={colors.colors.base}
        />

        <DetailsItem
          icon={icons.appointment_time}
          title="Appointment Time"
          value={selectedAppointment?.appointmentTime || "No time"}
        />
        <DetailsItem
          icon={icons.appointment_date}
          title="Appointment Date"
          value={formattedAppointmentDate || "No date"}
        />
        <DetailsItem
          icon={icons.appointment_notes}
          title="Appointment Notes"
          value={selectedAppointment?.appointmentNotes || "No notes"}
        />
      </View>
    </SafeAreaView>
  );
};

const DetailsItem = ({
  icon,
  title,
  value,
  valueClassname,
  valueColor,
  tintColor,
}: {
  icon?: ImageSourcePropType;
  title: string;
  value: string | number;
  valueClassname?: string;
  valueColor?: string;
  tintColor?: string;
}) => {
  const { updateAppointment, selectedAppointment } = useAppointmentsStore();

  const handleEditAppointment = () => {
    if (selectedAppointment) {
      updateAppointment(selectedAppointment);
    }
  };

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center justify-center gap-4">
        {icon && (
          <Image
            source={icon}
            className="size-4"
            tintColor={tintColor}
            style={{ tintColor: tintColor }}
          />
        )}
        <Text className="font-rubik-regular text-m text-black-200">
          {title}
        </Text>
      </View>

      <Text
        className={
          valueClassname
            ? `${valueClassname} font-rubik-medium text-lg text-black-200 px-4 py-1 rounded-lg`
            : "font-rubik-medium text-lg text-black-100"
        }
        style={{ backgroundColor: valueColor, color: tintColor }}
      >
        {value}
      </Text>
    </View>
  );
};

export default ViewAppointment;
