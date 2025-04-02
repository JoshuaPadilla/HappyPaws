import { View, Text, Modal, Image } from "react-native";
import CustomButton from "./custom_button";
interface ConfirmationModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  icon?: any;
  title: string;
  message: string;
  message2?: string;
  onCancelBtnClassname?: string;
  onConfirmBtnClassname?: string;
}

const ConfirmationModal = ({
  modalVisible,
  setModalVisible,
  onConfirm,
  onCancel,
  icon,
  title,
  message,
  message2,
  onCancelBtnClassname,
  onConfirmBtnClassname,
}: ConfirmationModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black-100/70 p-6 overflow-hidden">
        {/*Modal container*/}
        <View className="bg-accent-100 w-full rounded-xl p-4 max-h-[70%] overflow-hidden justify-between items-center">
          {/* Icon */}
          {icon && <Image source={icon} className="size-8 mb-6" />}

          {/* TItle and message */}
          <View>
            <Text className="font-rubik-semibold text-xl text-black-100 self-center mb-2">
              {title}
            </Text>

            <View className="mb-6">
              <Text className="font-rubik-regular text-lg text-black-100 self-center">
                {message}
              </Text>

              <Text className="font-rubik-regular text-md text-black-300 self-center">
                {message2}
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-4 w-full p-6 justify-between">
            <CustomButton
              title="Cancel"
              onPress={onCancel}
              btnClassname={onCancelBtnClassname}
              textClassname="text-xl font-rubik-regular"
            />
            <CustomButton
              title="Confirm"
              onPress={onConfirm}
              btnClassname={`${onConfirmBtnClassname} `}
              textClassname="text-white text-xl font-rubik-semibold"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
