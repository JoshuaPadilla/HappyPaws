import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { Image } from "expo-image";
import images from "@/constants/images";
import { useAuthStore } from "@/store/useAuth";
import { Message } from "@/types/type";
import { goBack } from "@/lib/routerFunctions";
import { useMessageStore } from "@/store/useMessage";
import SampleQuestionOptions from "@/components/sample_question_options";
import { SAMPLE_AI_QUESTION } from "@/constants";
import SampleQuestionItem from "@/components/sample_question_options";

const AskAiScreen = () => {
  const { authUser } = useAuthStore();
  const { messages, sendMessage, isResponding } = useMessageStore();
  const scrollViewRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState<Message>({
    sender: "you",
    content: "",
  });

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const handleSendMessage = () => {
    if (message.content.trim() === "") return;

    sendMessage(message);

    setMessage((prev) => ({ ...prev, content: "" }));
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-8 pb-6">
      {/* Headings */}
      <View className="flex-row justify-between items-end mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <Text className="font-rubik-medium text-black-100">Ask AI</Text>

        <CustomButton
          iconLeft={icons.plus_icon}
          iconSize="size-6"
          tintColor="#73c7c7"
        />
      </View>

      <View className="flex-1 w-full">
        {messages.length <= 0 ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 items-center justify-center">
              <View className="size-24">
                <Image
                  source={images.app_logo}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>

              <View className="flex-row gap-2 items-end">
                <Text className="font-rubik-regular text-black-100/50 text-xl">
                  Hello
                </Text>
                <Text className="font-rubik-semibold text-primary-100 text-2xl">
                  {authUser?.firstName}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{
              justifyContent: "flex-end",
              paddingVertical: 10,
            }}
            contentContainerClassName="flex-1"
            showsVerticalScrollIndicator={false}
          >
            {messages.map((chat, index) => (
              <View
                key={index}
                className={`p-3 my-1 rounded-lg max-w-[80%] ${
                  chat.sender === "you"
                    ? "bg-primary-100/20 self-end ml-auto"
                    : "bg-black-100/10 self-start mr-auto"
                }`}
              >
                <Text className="font-rubik-regular text-black-100 leading-5">
                  {chat.content}
                </Text>
              </View>
            ))}

            {isResponding && (
              <View
                className={`p-3 my-1 rounded-lg max-w-[80%] "bg-black-100/10 self-start mr-auto"
                  }`}
              >
                <Text className="font-rubik-regular text-black-100">
                  Responding...
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {messages.length <= 0 && !message.content && (
          <ScrollView contentContainerClassName="flex-row gap-2 py-6">
            {SAMPLE_AI_QUESTION.map((item, index) => {
              return (
                <SampleQuestionItem
                  item={item}
                  onSelect={() =>
                    setMessage((prev) => (prev = { ...prev, content: item }))
                  }
                  key={index}
                />
              );
            })}
          </ScrollView>
        )}

        <View className="bg-black-100/30 py-2 px-4 rounded-xl flex-row items-center justify-between">
          <TextInput
            className="flex-1 font-rubik-regular text-lg text-black-100 text-left mr-2"
            placeholderTextColor={Platform.OS === "ios" ? "#888A98" : "#666876"}
            placeholder="Message AI"
            style={{ padding: 8 }}
            onChangeText={(value) =>
              setMessage((prev) => ({ ...prev, content: value }))
            }
            value={message.content}
            multiline
          />

          <CustomButton
            iconLeft={icons.arrow_up}
            iconSize="size-6"
            btnClassname={`${
              isResponding ? "bg-primary-100/80 " : "bg-primary-100 "
            } size-10 items-center justify-center rounded-full self-end`}
            onPress={handleSendMessage}
            disabled={message.content.trim() === "" || isResponding}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AskAiScreen;
