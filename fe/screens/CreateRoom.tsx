import * as React from "react";
import {
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";
import { Input, TextArea, Button, Stack, useToast } from "native-base";
import { useState } from "react";
import TagButton from "../components/TagButton";
import { useCreateroomMutation } from "../Redux/API/rooms.api.slice";
import ToastAlert from "../components/ToastAlert";
import FormInputField from "../components/FormInputField";
import PrimaryButton from "../components/PrimaryButton";
import { isEmptyString } from "../utils/ValidationUtils";

const CreateRoom = () => {
  const navigate = useNavigation();
  const toast = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [createRoom, { isLoading: isCreateRoomLoading }] =
    useCreateroomMutation();

  const handleBackNav = () => {
    navigate.goBack();
  };

  const validateFormFields = () => {
    console.log("Validating form fields");
    const { name, tag, organization } = formData;
    const formErrors: Record<string, string> = {};
    let isValid = true;

    if (isEmptyString(name)) {
      formErrors.name = "Name cannot be empty";
      isValid = false;
    }

    if (isEmptyString(organization)) {
      formErrors.organization = "Organization cannot be empty";
      isValid = false;
    }

    if (isEmptyString(tag)) {
      formErrors.tag = "Tag must be selected";
      isValid = false;
    }

    setFormErrors(formErrors);
    return isValid;
  };

  const handleCreateRoomClick = async () => {
    try {
      if (!validateFormFields()) return;
      console.log("Submitted Room Data : ", formData);
      await createRoom({ formData }).unwrap();
      console.log("Succesfully submitted room data");
      toast.show({
        placement: "bottom",
        render: () => (
          <ToastAlert
            title="Successfully Created Room"
            description="You will now be able to access the room in your profile"
          />
        ),
      });
      handleBackNav();
    } catch (error) {
      console.error(error);
      toast.show({
        placement: "bottom",
        render: () => (
          <ToastAlert
            title="Something went wrong"
            description="An error occurred, please try again later"
            type="error"
          />
        ),
      });
    }
  };

  const getFieldValueChangeHandler = (fieldName: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setFormErrors({});
  };

  return (
    <View>
      <View style={styles.container0}>
        <View style={styles.box0}>
          <Pressable style={styles.rectangle} onPress={handleBackNav}>
            <Image
              style={styles.backImg}
              source={require("../assets/Arrow.png")}
            />
          </Pressable>
          <Text style={styles.typo1}>Create Room</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <FormInputField
          label="Name"
          onChange={getFieldValueChangeHandler("name")}
          value={formData.name}
          isError={!!formErrors.name}
          errorMessage={formErrors.name}
        />
        <FormInputField
          label="Description"
          value={formData.description}
          onChange={getFieldValueChangeHandler("description")}
          type="textarea"
        />
        <FormInputField
          label="Organization"
          value={formData.organization}
          onChange={getFieldValueChangeHandler("organization")}
          isError={!!formErrors.organization}
          errorMessage={formErrors.organization}
        />
        <FormInputField
          label="Tag"
          value={formData.tag}
          onChange={getFieldValueChangeHandler("tag")}
          isError={!!formErrors.tag}
          errorMessage={formErrors.tag}
          type="select"
          options={[
            { label: "Office", value: "OFFICE" },
            { label: "Home", value: "HOME" },
            { label: "Education", value: "EDUCATION" },
            { label: "Business", value: "BUSINESS" },
          ]}
        />
        <PrimaryButton
          onPress={handleCreateRoomClick}
          isLoading={isCreateRoomLoading}
          label="Create Room"
        />
      </ScrollView>
    </View>
  );
};

export default CreateRoom;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 150,
    gap: 16,
  },
  container0: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  box0: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  box2: {
    flexDirection: "row",
    marginBottom: 0,
  },
  backImg: {
    marginTop: 8,
  },
  typo1: {
    marginLeft: 80,
    marginTop: 4,
    color: Colors.darkblue,
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.large,
  },
  rectangle: {
    width: 40,
    height: 40,
    backgroundColor: Colors.colorWhite,
    borderRadius: 10,
    shadowColor: Colors.darkText,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
    verticalAlign: "middle",
  },
});
