import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAftercareStore } from "@/store/useAftercare";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons, { profileIcons } from "@/constants/icons";
import { goBack, goToAddAftercare } from "@/lib/routerFunctions";
import { formatDate } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuth";
import Spinner from "react-native-loading-spinner-overlay";
import ConfirmationModal from "@/components/confirmationModal";

const ViewAftercare = () => {
  const { isAdmin } = useAuthStore();
  const {
    selectedAftercare,
    setSelectedAftercare,
    setAction,
    isLoading,
    deleteAftercare,
  } = useAftercareStore();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const petName = selectedAftercare?.petID?.petName || "";

  const handleEditAftercare = () => {
    setAction("edit");
    goToAddAftercare();
  };

  const handleDeleteAftercare = () => {
    deleteAftercare(selectedAftercare?.petID?._id, selectedAftercare?._id);
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />

      <ConfirmationModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        onConfirm={handleDeleteAftercare}
        onCancel={() => setDeleteModalVisible(false)}
        title="Delete Pet"
        message="Are you sure you want to delete this pet?"
        onCancelBtnClassname="w-[45%] bg-black-400 items-center py-2 rounded-lg"
        onConfirmBtnClassname="w-[45%] bg-primary-100 items-center py-2 rounded-lg"
        icon={icons.trash}
      />

      {/* Headings */}
      <View className="flex-row w-fullitems-center mb-8 justify-between">
        <View className="flex-row items-center gap-4">
          <CustomButton
            iconLeft={icons.back_green}
            onPress={() => {
              goBack();
              setSelectedAftercare(null);
            }}
            iconSize="size-8"
          />

          <Text className="font-poppins-semibold text-xl">Aftercare</Text>
        </View>

        {isAdmin && (
          <CustomButton
            iconLeft={profileIcons.profile_edit}
            onPress={handleEditAftercare}
            iconSize="size-6"
          />
        )}
      </View>

      {/* main */}

      {isLoading ? (
        <ActivityIndicator color={"#73C7C7"} className="p-16" />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="pb-[100px] gap-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}

          <Text className="font-poppins-semibold text-2xl text-primary-100 mb-2">
            {`${petName}'s ${selectedAftercare?.type}`}
          </Text>

          {/* Medication */}
          <View className="gap-4">
            <Text className="font-rubik-semibold text-xl text-black-100">
              Medications:
            </Text>

            {(selectedAftercare?.medications || []).map((medication, index) => (
              <View
                key={index}
                className="px-4 py-4 border-b-2 border-black-400 gap-2"
              >
                <MedicationItem title="Name" value={medication.name} />
                <MedicationItem title="Dosage" value={medication.dosage} />
                <MedicationItem
                  title="frequency"
                  value={medication.frequency}
                />
                <MedicationItem
                  title="start date"
                  value={formatDate(medication.startDate)}
                />
                <MedicationItem
                  title="end date"
                  value={formatDate(medication.endDate)}
                />
              </View>
            ))}
          </View>

          {/* Instructions */}

          <View className="border-b-2 border-black-400">
            <Text className="font-rubik-semibold text-xl text-black-100">
              Intructions:
            </Text>

            <View className="flex-row gap-4 items-center p-4">
              <Text className="font-rubik-medium text-3xl">*</Text>
              <Text className="font-rubik-medium text-xl">
                {selectedAftercare?.careInstructions}
              </Text>
            </View>
          </View>

          {/* Restriction */}

          <View className="border-b-2 border-black-400">
            <Text className="font-rubik-semibold text-xl text-black-100">
              Restriction:
            </Text>

            <View className="gap-4 p-4">
              {selectedAftercare?.restrictions &&
                selectedAftercare.restrictions.map((restriction, index) => (
                  <View key={index} className="flex-row gap-4 items-center">
                    <Text className="font-rubik-medium text-3xl">*</Text>
                    <Text className="font-rubik-medium text-xl">
                      {restriction}
                    </Text>
                  </View>
                ))}
            </View>
          </View>

          {/* Notes */}
          <View className="border-b-2 border-black-400">
            <Text className="font-rubik-semibold text-xl text-black-100">
              Note:
            </Text>

            <View className="flex-row gap-4 items-center p-4">
              <Text className="font-rubik-medium text-3xl">*</Text>
              <Text className="font-rubik-medium text-xl">
                {selectedAftercare?.notes}
              </Text>
            </View>
          </View>

          {/* Next followup */}
          <View className="border-b-2 border-black-400">
            <Text className="font-rubik-semibold text-xl text-black-100">
              Next Follow-up:
            </Text>

            <View className="flex-row gap-4 items-center p-4">
              <Text className="font-rubik-medium text-3xl">*</Text>
              <Text className="font-rubik-medium text-xl">
                {formatDate(selectedAftercare?.followUpDate || "")}
              </Text>
            </View>
          </View>

          {isAdmin && (
            <CustomButton
              iconLeft={icons.trash}
              btnClassname="p-2 bg-danger-500 flex-row items-center justify-center gap-4 bg-danger mt-4 rounded-lg"
              textClassname="font-rubik-medium text-xl text-black-100"
              iconSize="size-6"
              title="Delete Aftercare"
              onPress={() => setDeleteModalVisible(true)}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const MedicationItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className="flex-row gap-4 items-center">
      <Text className="font-rubik-medium text-black-200 text-lg w-40">
        {title}:{" "}
      </Text>
      <Text className="font-rubik-semibold text-black-100 text-lg">
        {value}
      </Text>
    </View>
  );
};

export default ViewAftercare;
