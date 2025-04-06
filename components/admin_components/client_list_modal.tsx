import {
  View,
  Text,
  Modal,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useClient } from "@/store/useClient";
import SearchBar from "../search_bar";
import CustomButton from "../custom_button";
import icons from "@/constants/icons";
import ClientCard from "./client_card";

interface ClientListModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onClose?: () => void;
}

const ClientListModal = ({
  modalVisible,
  setModalVisible,
  onClose,
}: ClientListModalProps) => {
  const { clients, isLoading, fetchSelectedClientForAppointment } = useClient();

  const [query, setQuery] = useState("");

  const filteredClients = query
    ? clients.filter((client) =>
        `${client.address} ${client.email} ${client.firstName} ${client.lastName}`
          .toLowerCase()
          .includes(query.toLowerCase().trim())
      )
    : clients;

  const handleSelectClient = (id: string) => {
    setModalVisible(false);
    fetchSelectedClientForAppointment(id);
    onClose && onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View className="flex-1 justify-center items-center bg-black-100/70 p-6 overflow-hidden">
        <View className="bg-accent-100 w-full rounded-lg px-6 pt-6 pb-10 max-h-[70%] overflow-hidden">
          <View className="flex-row justify-between mb-4">
            <Text className="font-rubik-medium text-xl">Select Client</Text>

            <CustomButton
              iconLeft={icons.cancel}
              onPress={() => setModalVisible(false)}
            />
          </View>

          {/* Search bar */}
          <View className="items-center justify-center p-4 mb-2">
            <SearchBar
              queryValue={query}
              setQuery={setQuery}
              placeholder="Search for client"
              onSubmit={Keyboard.dismiss}
            />
          </View>

          <ScrollView
            contentContainerClassName="flex-col justify-between gap-2 pb-[70px] p-2 items-center w-full"
            showsVerticalScrollIndicator={false}
          >
            {isLoading ? (
              <ActivityIndicator color={"#73C7C7"} className="pt-8" />
            ) : filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <ClientCard
                  displayOnly
                  client={client}
                  key={client._id}
                  onPress={() => handleSelectClient(client._id)}
                />
              ))
            ) : (
              <Text>No Result</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ClientListModal;
