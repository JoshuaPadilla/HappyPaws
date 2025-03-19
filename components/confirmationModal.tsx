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
            <Text className="font-rubik-semibold text-xl text-black-100 self-center">
              {title}
            </Text>

            <Text className="font-rubik-regular text-lg text-black-100 mb-6 self-center">
              {message}
            </Text>
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
