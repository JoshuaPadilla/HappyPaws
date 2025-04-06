import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Link, Redirect } from "expo-router";
import icons from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import Dropdown from "@/components/dropdown";
import { days, genderDropdownData, months, years } from "@/constants";
import { useAuthStore } from "@/store/useAuth";
import {
  basicDetailsIsValid,
  checkSamePassword,
  emailAndPassIsValid,
  showToast,
} from "@/lib/utils";
import Spinner from "react-native-loading-spinner-overlay";
import { signinForm, signupForm } from "@/types/type";
import { dismiss, gotoSignIn } from "@/lib/routerFunctions";
import { useClient } from "@/store/useClient";

const AddClient = () => {
  const { addClient, isAdding } = useClient();
  const [form, setForm] = useState<signupForm>({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    gender: "",
    birthday: { date: "", month: "", year: "" },
    email: "",
    password: "12345678",
    confirmPassword: "12345678",
  });
  const [step, setStep] = useState(1);

  const handleSignup = () => {
    if (!emailAndPassIsValid(form)) {
      return;
    }

    if (!checkSamePassword(form.password, form.confirmPassword)) {
      showToast("error", "password are not the same");
      return;
    }

    addClient(form);
  };

  const checkBasicDetails = () => {
    if (!basicDetailsIsValid(form)) {
      return;
    }

    setStep(2);
  };

  return (
    <SafeAreaView className="flex flex-1 mb-2">
      <Spinner
        visible={isAdding}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex h-full w-full bg-accent-100 rounded-[20px] px-6 py-8 gap-4">
          {/* heading */}
          <View className="flex-row gap-4 mb-4">
            <CustomButton
              iconLeft={icons.back_green}
              iconSize="size-8"
              onPress={() => {
                step === 2 ? setStep(1) : dismiss();
              }}
            />
            <Text className="font-rubik-bold text-2xl text-black-100">
              Add new client
            </Text>
          </View>

          {/* step 1 */}
          {step === 1 && (
            <View className="w-full flex gap-2">
              <Text className="font-rubik-semibold text-lg text-black-100">
                Step 1: Basic Information
              </Text>

              {/* Input fields */}
              <KeyboardAvoidingView className="flex gap-2 pb-4">
                {/* first name and last name */}
                <View className="flex-row justify-between">
                  <View className="flex w-[48%] gap-1">
                    <Text className="text-black-200 font-rubik-regular text-m">
                      First Name
                    </Text>

                    <TextInput
                      value={form.firstName}
                      onChange={(value) =>
                        setForm({
                          ...form,
                          firstName: value.nativeEvent.text,
                        })
                      }
                      className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
                    />
                  </View>

                  <View className="flex w-[48%] gap-1">
                    <Text className="text-black-200 font-rubik-regular text-m">
                      Last Name
                    </Text>

                    <TextInput
                      value={form.lastName}
                      onChange={(value) =>
                        setForm({
                          ...form,
                          lastName: value.nativeEvent.text,
                        })
                      }
                      className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
                    />
                  </View>
                </View>

                {/* Address */}
                <View className="flex gap-1">
                  <Text className="text-black-200 font-rubik-regular text-m">
                    Address
                  </Text>

                  <TextInput
                    value={form.address}
                    onChange={(value) =>
                      setForm({
                        ...form,
                        address: value.nativeEvent.text,
                      })
                    }
                    className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
                  />
                </View>

                {/* Contact Number */}
                <View className="flex gap-1">
                  <Text className="text-black-200 font-rubik-regular text-m">
                    Contact Number
                  </Text>

                  <TextInput
                    inputMode="tel"
                    value={form.phone}
                    onChange={(value) =>
                      setForm({
                        ...form,
                        phone: value.nativeEvent.text,
                      })
                    }
                    className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
                  />
                </View>

                {/* Gender Dropdown */}
                <View className="flex gap-1">
                  <Text className="text-black-200 font-rubik-regular text-m">
                    Gender
                  </Text>

                  <Dropdown
                    data={genderDropdownData}
                    onSelect={(selectedItem: any) =>
                      setForm({ ...form, gender: selectedItem })
                    }
                    iconLeft={icons.dropdown}
                    title="select gender"
                    height={genderDropdownData.length * 68}
                  />
                </View>

                {/* Birthday */}
                <View className="flex gap-1">
                  <Text className="mb-2 text-black-200 font-rubik-regular text-m">
                    Birthday
                  </Text>

                  {/* Datepicker container */}
                  <View className="flex-row justify-between">
                    {/* month */}
                    <View className="w-[32%]">
                      <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                        month
                      </Text>
                      <Dropdown
                        data={months}
                        onSelect={(selectedItem) =>
                          setForm({
                            ...form,
                            birthday: {
                              ...form.birthday,
                              month: selectedItem,
                            },
                          })
                        }
                        title="month"
                        iconLeft={icons.dropdown}
                        height={250}
                      />
                    </View>

                    {/* Day */}
                    <View className="w-[32%]">
                      <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                        day
                      </Text>
                      <Dropdown
                        data={days}
                        onSelect={(selectedItem) =>
                          setForm({
                            ...form,
                            birthday: {
                              ...form.birthday,
                              date: selectedItem,
                            },
                          })
                        }
                        title="day"
                        iconLeft={icons.dropdown}
                        height={250}
                      />
                    </View>

                    {/* year */}
                    <View className="w-[32%]">
                      <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                        year
                      </Text>
                      <Dropdown
                        data={years}
                        onSelect={(selectedItem) =>
                          setForm({
                            ...form,
                            birthday: {
                              ...form.birthday,
                              year: selectedItem,
                            },
                          })
                        }
                        title="year"
                        iconLeft={icons.dropdown}
                        height={250}
                      />
                    </View>
                  </View>

                  {/* Date pickers */}
                  <View className="flex-row"></View>
                </View>
              </KeyboardAvoidingView>

              <View className="flex-row justify-end">
                <CustomButton
                  btnClassname="p-4 bg-primary-100 w-[150px] rounded-xl flex items-center"
                  title="next"
                  textClassname="font-rubik-semibold text-accent-100 text-lg"
                  onPress={checkBasicDetails}
                />
              </View>
            </View>
          )}

          {/* step 2 */}
          {step === 2 && (
            <View className="w-full flex gap-2">
              <Text className="font-rubik-semibold text-lg text-black-100">
                Step 2: Login Information
              </Text>

              {/* Input fields */}
              <KeyboardAvoidingView className="flex gap-2 pb-4">
                {/* Email */}
                <View className="flex gap-1">
                  <Text className="text-black-200 font-rubik-regular text-m">
                    Email
                  </Text>

                  <TextInput
                    value={form.email}
                    onChange={(value) =>
                      setForm({
                        ...form,
                        email: value.nativeEvent.text,
                      })
                    }
                    className="border rounded-xl border-primary-100 py-2 px-4 h-[50px] font-poppins-medium text-lg"
                    inputMode="email"
                  />
                </View>

                <Text className="font-rubik-semibold text-lg text-black-100">
                  *Password is set to default
                </Text>
                <Text className="font-rubik-semibold text-lg text-black-100">
                  *password:{" "}
                  <Text className="font-rubik-bold text-primary-100 text-lg">
                    (12345678)
                  </Text>
                </Text>
              </KeyboardAvoidingView>

              <View className="flex-row justify-end">
                <CustomButton
                  btnClassname="p-4 bg-primary-100 w-full rounded-xl flex items-center"
                  title="Add Client"
                  textClassname="font-rubik-semibold text-accent-100 text-lg"
                  onPress={handleSignup}
                />
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddClient;
