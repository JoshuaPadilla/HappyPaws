import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { useAuthStore } from "@/store/useAuth";
import Toggle from "@/components/toggle";
import { typeToColorClass } from "@/lib/utils";
import moment from "moment";

// Types for aftercare instructions
interface AfterCareInstruction {
  id: string;
  petName: string;
  type: "medication" | "wound care" | "diet and nutrition" | "Follow up";
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  frequency: string;
  isCompleted: boolean;
}

// Sample aftercare data
const aftercareInstructions: AfterCareInstruction[] = [
  {
    id: "ac_001",
    petName: "Buddy",
    type: "medication",
    title: "Antibiotics Course",
    description: "Give 1 tablet twice daily with food",
    startDate: "2025-03-04",
    endDate: "2025-03-17",
    frequency: "Every 12 hours",
    isCompleted: false,
  },
  {
    id: "ac_002",
    petName: "Mittens",
    type: "wound care",
    title: "Paw Bandage Change",
    description: "Clean wound and replace bandage",
    startDate: "2024-03-12",
    endDate: "2025-03-19",
    frequency: "Once daily",
    isCompleted: false,
  },
  {
    id: "ac_003",
    petName: "Rocky",
    type: "diet and nutrition",
    title: "Special Diet Plan",
    description: "Feed prescribed diet food only",
    startDate: "2024-03-08",
    endDate: "2025-03-22",
    frequency: "Three times daily",
    isCompleted: false,
  },
  {
    id: "ac_004",
    petName: "Charlie",
    type: "Follow up",
    title: "Post-Vaccination Check",
    description: "Monitor for any reactions",
    startDate: "2024-03-15",
    endDate: "2025-03-16",
    frequency: "Every 4 hours",
    isCompleted: true,
  },
];

const AfterCareCard = ({
  instruction,
}: {
  instruction: AfterCareInstruction;
}) => {
  const colors = typeToColorClass[instruction.type];
  const isActive = moment().isBetween(
    instruction.startDate,
    instruction.endDate,
    "day",
    "[]"
  );

  return (
    <View
      className={`${colors.bg} p-4 rounded-xl mb-3 border-l-[8px] ${colors.border}`}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className="font-rubik-bold text-lg text-black-100">
            {instruction.title}
          </Text>
          <Text className="font-rubik-regular text-sm text-black-200">
            {instruction.petName}
          </Text>
        </View>
        <View className={`px-3 py-1 rounded-lg ${colors.tag}`}>
          <Text className="font-rubik-medium text-sm text-black-100">
            {instruction.type}
          </Text>
        </View>
      </View>

      <Text className="font-rubik-regular text-sm text-black-100 mb-2">
        {instruction.description}
      </Text>

      <View className="flex-row justify-between items-center">
        <Text className="font-rubik-medium text-xs text-black-200">
          {`${moment(instruction.startDate).format("MMM DD")} - ${moment(
            instruction.endDate
          ).format("MMM DD")}`}
        </Text>
        <Text className="font-rubik-medium text-xs text-black-200">
          {instruction.frequency}
        </Text>
      </View>
    </View>
  );
};

const Aftercare = () => {
  // const { user } = useAuthStore();
  const [showActive, setShowActive] = useState(true);

  const activeInstructions = aftercareInstructions.filter(
    (instruction) =>
      !instruction.isCompleted &&
      moment().isBetween(
        instruction.startDate,
        instruction.endDate,
        "day",
        "[]"
      )
  );
  const completedInstructions = aftercareInstructions.filter(
    (instruction) => instruction.isCompleted
  );

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="font-poppins-bold text-2xl">Aftercare</Text>
        <Toggle
          trueValue="Active"
          falseValue="Completed"
          onPress={() => setShowActive((prev) => !prev)}
        />
      </View>

      {/* Active Instructions */}
      {showActive ? (
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-poppins-semibold text-lg">
              Active Instructions ({activeInstructions.length})
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-20"
          >
            {activeInstructions.map((instruction) => (
              <AfterCareCard key={instruction.id} instruction={instruction} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-poppins-semibold text-lg">
              Completed ({completedInstructions.length})
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-20"
          >
            {completedInstructions.map((instruction) => (
              <AfterCareCard key={instruction.id} instruction={instruction} />
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Aftercare;
