import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import Font from "../../constants/Font";
import { scheduleTypes } from "../../types";
import { Color, FontSize, Padding, Border } from "../../Styles/GlobalStyles";
import { Entypo } from "@expo/vector-icons";
import Popover from "react-native-popover-view";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeBaseProvider, Button, Stack, Row, useToast } from "native-base";
import Colors from "../../constants/Colors";
import { Tasks } from "../../types";
import { useDeletetaskMutation } from "../../Redux/API/tasks.api.slice";
import { useGettaskQuery } from "../../Redux/API/tasks.api.slice";
import moment, { duration } from "moment";
import { DateUtils } from "../../utils/DateUtils";
import ConfirmationModal from "../ConfirmationModal";
import ToastAlert from "../ToastAlert";

const EditableScheduleBox = (props: any) => {
  const { isRoomNameVisible = true, isActionsVisible = true, onDelete } = props;
  const toast = useToast();
  const navigation = useNavigation<any>();
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [deleteTask, deletedResult] = useDeletetaskMutation();

  const taskId = props?._id;

  const handleEdit = () => {
    navigation.navigate("EditTask", {
      taskId: taskId,
    });
    setPopoverVisible(false); // Close the popover
  };

  const handleViewClick = () => {
    navigation.navigate("TaskDetail", { taskId });
  };

  const handleDeleteTaskModalConfirm = async () => {
    try {
      console.log("Deleting task with id ", taskId);
      await deleteTask(taskId).unwrap();
      console.log("Successfully deleted task with id", taskId);
      toast.show({
        placement: "bottom",
        render: () => (
          <ToastAlert
            title="Successfully Deleted Task"
            description="All schedules for affected users have been readjusted"
          />
        ),
      });
      onDelete?.();
      setIsDeleteTaskModalOpen(false);
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

  return (
    <>
      <View
        style={{
          padding: 20,
          width: "100%",
          borderRadius: 4,
          backgroundColor: Color.ghostwhite,
        }}
      >
        <Pressable
          onPress={handleViewClick}
          style={{
            width: "95%",
            position: "absolute",
            height: "170%",
            zIndex: 1000,
          }}
        />
        <Row space={4} alignItems={"center"}>
          <View style={styles.frameChild} />
          <Stack>
            <Text style={styles.projectProgressMeeting}>{props.name}</Text>
            <Text style={styles.text4}>
              {DateUtils.getDurationAsString(props?.duration)}
            </Text>
            {isRoomNameVisible && (
              <Text style={[styles.altriumRoom01Typo]}>{props.roomName}</Text>
            )}
          </Stack>
        </Row>

        {isActionsVisible && (
          <Popover
            isVisible={isPopoverVisible} // Pass the state variable as a prop to control visibility
            onRequestClose={() => setPopoverVisible(false)} // Close the Popover when backdrop is pressed
            from={
              <TouchableWithoutFeedback
                onPress={() => setPopoverVisible(!isPopoverVisible)}
              >
                <View style={styles.doted}>
                  <Entypo name="dots-three-vertical" size={14} color="black" />
                </View>
              </TouchableWithoutFeedback>
            }
          >
            <View style={styles.menuContainer}>
              <TouchableOpacity onPress={handleEdit} style={styles.textRow}>
                <Text>
                  <Feather name="edit" size={14} color="black" /> Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsDeleteTaskModalOpen(true);
                  setPopoverVisible(false);
                }}
                style={styles.textRow}
              >
                <Text>
                  <AntDesign name="delete" size={14} color="black" /> Delete
                </Text>
              </TouchableOpacity>
            </View>
          </Popover>
        )}
      </View>
      <ConfirmationModal
        isOpen={isDeleteTaskModalOpen}
        onCancel={() => setIsDeleteTaskModalOpen(false)}
        onConfirm={handleDeleteTaskModalConfirm}
      >
        Are you sure you want to delete this task? This will remove and adjust
        all schedules of the assigned users.
      </ConfirmationModal>
    </>
  );
};

const styles = StyleSheet.create({
  textRow: {
    marginVertical: 10,
  },
  menuContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  frameFlexBox1: {
    flexDirection: "column",
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
  },
  doted: {
    position: "absolute",
    left: "102%",
    top: "40%",
  },
  altriumRoom01Wrapper: {
    top: 75,
    left: 36,
    backgroundColor: Color.lightcoral_200,
    paddingHorizontal: Padding.p_6xs,
    alignItems: "flex-end",
  },
  wrapperLayout: {
    paddingVertical: Padding.p_11xs,
    height: 20,
    width: 108,
    borderRadius: Border.br_10xs,
    position: "absolute",
  },
  altriumRoom01: {
    color: Color.lightcoral_100,
  },
  projectProgressMeeting: {
    fontSize: FontSize.size_sm,
    color: Color.darkslateblue,
    fontFamily: Font["poppins-regular"],
    fontWeight: "500",
    textAlign: "left",
  },
  text4: {
    color: Color.lightsteelblue,
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  projectProgressMeetingParent: {
    width: 175,
    marginLeft: 16,
  },
  altriumRoom01Typo: {
    paddingVertical: 2,
    marginTop: 4,
    width: 83,
    fontSize: FontSize.size_3xs,
    fontFamily: Font["poppins-regular"],
    fontWeight: "500",
    textAlign: "center",
    borderRadius: 4,
    color: Color.lightcoral_100,
    backgroundColor: Color.lightcoral_200,
  },
  frame4: {
    top: 15,
    left: 19,
    width: 192,
    height: 49,
  },
  frameLayout: {
    height: 114,
    width: 322,
    backgroundColor: Color.ghostwhite,
    borderRadius: Border.br_mini,
  },
  frameFlexBox: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
  },
  frameContainer: {
    marginTop: 18,
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: "#8f99eb",
    borderRightWidth: 2,
    width: 2,
    height: 37,
  },

  //Modal
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },

  // Model Styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  typoTitle1: {
    color: Colors.darkblue,
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.size_xl,
  },
  typoBoddy: {
    color: Colors.darkblue,
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.size_base,
  },
  box1: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 50,
  },
});

export default EditableScheduleBox;
