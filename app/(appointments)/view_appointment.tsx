import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppointmentsStore } from "@/store/useAppointments";
import {
  formatDate,
  getAppointmentColors,
  getStatusColor,
  showMarkCompletedBtn,
} from "@/lib/utils";
import CustomButton from "@/components/custom_button";
import { goBack } from "@/lib/routerFunctions";
import icons, { petDetailsIcons, profileIcons } from "@/constants/icons";
import NewAppointmentModal from "@/components/new_appointment_modal";
import { useAdminAppointmentsStore } from "@/store/useAdminAppointmentsStore";
import { useAuthStore } from "@/store/useAuth";

const ViewAppointment = () => {
  const { isAdmin } = useAuthStore();
  const { selectedAppointment, cancelAppointment } = useAppointmentsStore();
  const {
    selectedAppointment: adminSelectedAppointment,
    isLoading,
    markComplete,
  } = useAdminAppointmentsStore();

  const thisAppointment = selectedAppointment || adminSelectedAppointment;
  const caller = selectedAppointment ? "user" : "admin";

  const appointedPet = thisAppointment?.petID;
  const colors = getAppointmentColors(selectedAppointment?.typeOfService);
  const formattedAppointmentDate = formatDate(
    thisAppointment?.appointmentDate || ""
  );

  const [modalVisible, setModalVisible] = useState(false);

  const handleEditAppointment = () => {
    if (thisAppointment) {
      setModalVisible(true);
    }
  };

  const handleCancelAppointment = () => {
    if (thisAppointment?._id) {
      cancelAppointment(thisAppointment._id);
    }

    goBack();
  };

  const handleMarkCompleted = () => {
    markComplete(thisAppointment?._id || "");
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8 gap-4">
      <NewAppointmentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action="edit"
        caller={caller}
      />

      {/* Headings */}
      <View className="flex-row justify-between items-center broder mb-8">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        {thisAppointment?.status !== "Cancelled" &&
          thisAppointment?.status !== "Completed" && (
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

      {isLoading ? (
        <ActivityIndicator color={"#73C7C7"} className="p-16" />
      ) : (
        <View>
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
              value={thisAppointment?.status || "No status"}
              tintColor={getStatusColor(thisAppointment?.status || "")}
            />

            <DetailsItem
              icon={icons.appointment_type}
              title="Appointment Type"
              value={thisAppointment?.typeOfService || "No type"}
              valueClassname="s"
              valueColor={colors.colors.base}
            />

            <DetailsItem
              icon={icons.appointment_time}
              title="Appointment Time"
              value={thisAppointment?.appointmentTime || "No time"}
            />
            <DetailsItem
              icon={icons.appointment_date}
              title="Appointment Date"
              value={formattedAppointmentDate || "No date"}
            />
            <DetailsItem
              icon={icons.appointment_notes}
              title="Appointment Notes"
              value={thisAppointment?.appointmentNotes || "No notes"}
            />
          </View>
        </View>
      )}

      {isAdmin &&
      showMarkCompletedBtn(thisAppointment?.status || "") &&
      !isLoading ? (
        <CustomButton
          iconLeft={icons.edit_check}
          title="Completed"
          btnClassname="flex-row gap-2 p-4 items-center justify-center bg-primary-100 rounded-xl"
          textClassname="font-rubik-medium text-lg"
          onPress={handleMarkCompleted}
        />
      ) : null}
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
