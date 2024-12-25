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
import { NativeBaseProvider, Input, TextArea, useToast } from "native-base";
import { Button, Stack } from "native-base";
import { useEffect, useState } from "react";
import TagButton from "../components/TagButton";
import {
  useGetroomQuery,
  useUpdateroomMutation,
} from "../Redux/API/rooms.api.slice";
import LoadingIndictator from "../components/LoadingIndictator";
import ToastAlert from "../components/ToastAlert";
import FormInputField from "../components/FormInputField";
import PrimaryButton from "../components/PrimaryButton";
import { isEmptyString } from "../utils/ValidationUtils";

const EditRoom = (props: any) => {
  const navigation = props.navigation;
  const roomId: string = props.route?.params?.roomId;
  const toast = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [updateRoom, { isLoading: isUpdateRoomLoading }] =
    useUpdateroomMutation();
  const { data: roomData, isFetching: isRoomDataFetching } =
    useGetroomQuery(roomId);

  useEffect(() => {
    if (roomData) {
      setFormData({
        name: roomData.name,
        description: roomData.description,
        organization: roomData.organization,
        tag: roomData.tag,
      });
    }
  }, [roomData, isRoomDataFetching]);

  const handleBackNav = () => {
    navigation.goBack();
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

  const handleEditRoomClick = async () => {
    try {
      if (!validateFormFields()) return;
      console.log("Submitted Edited Room Data : ", roomId, formData);
      await updateRoom({ roomId, formData }).unwrap();
      console.log("Succesfully Edited room data");
      toast.show({
        placement: "bottom",
        render: () => (
          <ToastAlert
            title="Successfully Edited Room"
            description="All schedules for affected users have been readjusted"
          />
        ),
        title: "Successfully Edited Room",
        description: "All room details have been updated",
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

  if (isRoomDataFetching) {
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
            <Text style={styles.typo1}>Edit Room</Text>
          </View>
        </View>
        <LoadingIndictator />
      </View>
    );
  }

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
          <Text style={styles.typo1}>Edit Room</Text>
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
          onPress={handleEditRoomClick}
          isLoading={isUpdateRoomLoading}
          label="Edit Room"
        />
      </ScrollView>
    </View>
  );
};

export default EditRoom;

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
  tabButton: {
    backgroundColor: Colors.colorLavender,
    borderRadius: 20,
    padding: 8,
    marginRight: 5,
  },
  box0: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  box1: {
    marginBottom: 20,
  },
  box11: {
    borderRadius: 10,
    paddingHorizontal: 20,
    marginRight: 12,
    paddingVertical: 20,
    marginBottom: 20,
  },
  box12: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  box2: {
    flexDirection: "row",
    marginBottom: 0,
  },
  rectangle1: {},
  box3: {
    backgroundColor: Colors.colorGhostwhite,
    borderRadius: 10,
    shadowColor: Colors.darkText,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
    marginBottom: 50,
  },
  typo1: {
    marginLeft: 80,
    marginTop: 4,
    color: Colors.darkblue,
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.large,
  },
  typoBoddy: {
    color: Colors.darkblue,
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.medium,
  },
  tabtypoBoddy: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.medium,
  },
  typoTitle: {
    color: Colors.darkblue,
    fontFamily: Font["poppins-bold"],
    fontSize: FontSize.medium,
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
  backImg: {
    marginTop: 8,
  },
  CheckboxSpace1: {
    ustifyContent: "flex-end",
    alignItems: "flex-end",
  },
  box4: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
});
