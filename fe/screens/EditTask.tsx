import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { NativeBaseProvider, Input, TextArea, useToast } from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { Checkbox, Button } from "native-base";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Tasks } from "../types";
import { useUpdatetaskMutation } from "../Redux/API/tasks.api.slice";
import {
  useGetAllUsersInRoomQuery,
  useGetAllUsersQuery,
} from "../Redux/API/users.api.slice";
import { useRoute } from "@react-navigation/native";
import { useGettaskQuery } from "../Redux/API/tasks.api.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Calendar from "../components/Calendar/calender";
import moment, { Moment } from "moment";
import Toast from "react-native-toast-message";
import PrioritySelector from "../components/PrioritySelector";
import PrimaryButton from "../components/PrimaryButton";
import ToastAlert from "../components/ToastAlert";
import { isEmptyString } from "../utils/ValidationUtils";
import FormInputField from "../components/FormInputField";
dayjs.extend(duration);

const EditTask = ({ route }: { route: any }) => {
  const taskId = route?.params?.taskId;
  const navigation = useNavigation();
  const toast = useToast();
  const { data: task, isFetching: isTaskFetching } = useGettaskQuery(taskId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const { data: userData } = useGetAllUsersInRoomQuery(task?.roomId ?? "", {
    refetchOnMountOrArgChange: true,
  });
  const [updateTask, { isLoading: isUpdateTaskLoading }] =
    useUpdatetaskMutation();

  /** In case initial date is before today. */
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [durationInMs, setDurationInMs] = useState<number>(
    task?.duration || ""
  );
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
      });
      setDurationInMs(task.duration ?? 0);
      setSelectedDate(moment(new Date(task?.date)));
    }
  }, [task, isTaskFetching]);

  const handleBackNav = () => {
    navigation.goBack();
  };

  const handleDateSelect = (date: Moment) => {
    setSelectedDate(date);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (userId: string) => {
    const selectedUserIds = formData.assignedUserIds ?? [];
    if (selectedUserIds?.includes(userId)) {
      setFormData((prev) => ({
        ...prev,
        assignedUserIds:
          selectedUserIds?.filter((id: string) => id !== userId) ?? [],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        assignedUserIds: [...selectedUserIds, userId],
      }));
    }
  };

  const handleDurationSelection = (pickedDuration: any) => {
    const { hours, minutes, seconds } = pickedDuration;
    const duration = dayjs.duration({
      hours,
      minutes,
      seconds,
    });
    setShowPicker(false);
    setFormData((prev) => ({ ...prev, duration: duration.asMilliseconds() }));
    handleCreateTask(duration.asMilliseconds());
  };

  const validateFormFields = () => {
    console.log("Validating form fields");
    const { name, priority, assignedUserIds } = formData;
    const formErrors: Record<string, string> = {};
    let isValid = true;

    if (isEmptyString(name)) {
      formErrors.name = "Name cannot be empty";
      isValid = false;
    }

    if (isEmptyString(priority)) {
      formErrors.priority = "Priority must be selected";
      isValid = false;
    }

    if (!assignedUserIds?.length) {
      formErrors.assignedUserIds = "Atleast one user must be assigned";
      isValid = false;
    }

    setFormErrors(formErrors);
    return isValid;
  };

  const handleCreateTask = async (durationInMs: number) => {
    try {
      if (!validateFormFields()) return;
      const formattedFormData = {
        ...formData,
        date: selectedDate,
        roomId: task.roomId,
        duration: durationInMs,
      };
      console.log("Submitted task edit data : ", formattedFormData);
      await updateTask({ taskId, formData: formattedFormData }).unwrap();
      toast.show({
        placement: "bottom",
        render: () => (
          <ToastAlert
            title="Successfully Edited Task"
            description="All schedules for affected users have been readjusted"
          />
        ),
      });
      console.log("Task edited successfully");
      navigation.goBack();
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

  if (isTaskFetching) {
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
            <Text style={styles.typo1}>Edit Task</Text>
          </View>
          <View>
            <ActivityIndicator color="#0000ff" size="large" />
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
      <View>
        <View style={styles.container0}>
          <View style={styles.box0}>
            <Pressable style={styles.rectangle} onPress={handleBackNav}>
              <Image
                style={styles.backImg}
                source={require("../assets/Arrow.png")}
              />
            </Pressable>
            <Text style={styles.typo1}>Edit Task</Text>
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
          <View>
            <Text style={styles.typoBoddy}>Date</Text>
            <Calendar onSelectDate={handleDateSelect} selected={selectedDate} />
          </View>
          <FormInputField
            label="Description"
            value={formData.description}
            onChange={getFieldValueChangeHandler("description")}
            type="textarea"
          />
          <FormInputField
            label="Priority"
            value={formData.priority}
            onChange={getFieldValueChangeHandler("priority")}
            isError={!!formErrors.priority}
            errorMessage={formErrors.priority}
            type="select"
            options={[
              { label: "High", value: "HIGH" },
              { label: "Medium", value: "MEDIUM" },
              { label: "Low", value: "LOW" },
            ]}
          />
          <View>
            <Text style={styles.typoBoddy}>Assign Members</Text>
            <View
              style={[
                styles.box3,
                !formErrors.assignedUserIds ? null : styles.errorBorder,
              ]}
            >
              {userData?.content.map((user: any) => (
                <View style={[styles.box4]} key={user._id}>
                  <Text style={styles.typoBoddy}>{user.firstName}</Text>
                  <View style={styles.CheckboxSpace1}>
                    <Checkbox
                      defaultIsChecked={task?.assignedUserIds.includes(
                        user._id
                      )}
                      value={user._id}
                      colorScheme="blue"
                      onChange={() => handleCheckboxChange(user._id)}
                      aria-label="Purple Checkbox"
                    />
                  </View>
                </View>
              ))}
            </View>
            <Text style={styles.errorText}>{formErrors.assignedUserIds}</Text>
          </View>
          <PrimaryButton
            isLoading={isUpdateTaskLoading}
            label="Schedule"
            onPress={() => setShowPicker(true)}
          />
        </ScrollView>
      </View>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={handleDurationSelection}
        modalTitle="Set Task Duration"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        LinearGradient={LinearGradient}
        styles={{
          theme: "light",
        }}
        initialHours={moment.duration(durationInMs).hours()}
        initialMinutes={moment.duration(durationInMs).minutes()}
        initialSeconds={moment.duration(durationInMs).seconds()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 150,
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
  box1: {
    marginBottom: 20,
  },
  box2: {
    marginBottom: 20,
  },
  box3: {
    marginTop: 16,
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
    marginBottom: 10,
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
    justifyContent: "space-between",
    padding: 10,
  },
  errorText: {
    color: "#dc2626",
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: "#dc2626",
  },
});

export default EditTask;
