import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { IRoom, RoomType } from "../../types";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Popover from "react-native-popover-view";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  useGetAllTasksInRoomQuery,
  useGetAlltasksQuery,
} from "../../Redux/API/tasks.api.slice";
import { setRoomID } from "../../Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useDeleteroomMutation } from "../../Redux/API/rooms.api.slice";
import { Skeleton, useToast } from "native-base";
import ConfirmationModal from "../ConfirmationModal";
import ToastAlert from "../ToastAlert";

const RoomBox = (props: any) => {
  const { isActionsVisible, _id: roomId, onDelete } = props;
  const toast = useToast();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [isDeleteRoomModalOpen, setIsDeleteRoomModalOpen] = useState(false);
  const { data: taskList, isFetching: isTaskListFetching } =
    useGetAllTasksInRoomQuery({ roomId });
  const [deleteRoom] = useDeleteroomMutation();
  const taskCount = taskList?.content?.length;

  const handleEdit = () => {
    navigation.navigate("EditRoom", {
      roomId: roomId,
    });
    setPopoverVisible(false); // Close the popover
  };

  const handleDeleteClick = () => {
    setPopoverVisible(false);
    setIsDeleteRoomModalOpen((prev) => !prev);
  };

  const handleDeleteModalConfirm = async () => {
    try {
      console.log("Deleting room with id ", roomId);
      await deleteRoom(roomId).unwrap();
      console.log("Successfully deleted room");
      toast.show({
        placement: "bottom",
        render: () => (
          <ToastAlert
            title="Successfully Deleted Room"
            description="All schedules, members and tasks have been cleaned up"
          />
        ),
      });
      onDelete?.(roomId);
    } catch (error) {
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
    setPopoverVisible(false); // Close the popover
  };

  const handleNavigate = () => {
    dispatch(setRoomID(roomId));
    navigation.navigate("AdminRoom");
  };

  return (
    <>
      <View style={styles.roomManagmentProfileSetti}>
        <View>
          <View style={[styles.rectangleParent, styles.groupChildPosition]}>
            <View style={[styles.groupChild, styles.groupLayout]} />
            {isTaskListFetching ? (
              <Skeleton
                style={[styles.task, styles.taskTypo]}
                mb="3"
                h="4"
                maxW="10"
                rounded="4"
                startColor="violet.300"
              />
            ) : (
              <Text style={[styles.task, styles.taskTypo]}>
                {taskCount} Tasks
              </Text>
            )}
            <Text style={[styles.seProjectGroup, styles.taskTypo]}>
              {props.name}
            </Text>
            <Pressable
              style={[styles.groupItem, styles.groupLayout]}
              onPress={handleNavigate}
            />
            <Image
              style={[styles.iconlycurvedprofile, styles.groupIconLayout]}
              contentFit="cover"
              source={require("../../assets/Profile.png")}
            />
          </View>
          {isActionsVisible && (
            <Popover
              isVisible={isPopoverVisible} // Pass the state variable as a prop to control visibility
              onRequestClose={() => setPopoverVisible(false)} // Close the Popover when backdrop is pressed
              from={
                <TouchableOpacity
                  onPress={() => setPopoverVisible(!isPopoverVisible)}
                >
                  <View style={styles.newDot}>
                    <Entypo
                      name="dots-three-vertical"
                      size={15}
                      color="black"
                    />
                  </View>
                </TouchableOpacity>
              }
            >
              <View style={styles.menuContainer}>
                <TouchableOpacity onPress={handleEdit} style={styles.textRow}>
                  <Text>
                    <Feather name="edit" size={14} color="black" /> Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteClick}
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
      </View>
      <ConfirmationModal
        isOpen={isDeleteRoomModalOpen}
        onCancel={() => setIsDeleteRoomModalOpen(false)}
        onConfirm={handleDeleteModalConfirm}
      >
        Are you sure you want to delete this room? All members, schedules and
        tasks in this room will be unassigned and cleaned up.
      </ConfirmationModal>
    </>
  );
};

const styles = StyleSheet.create({
  textRow: {
    marginVertical: 10,
  },
  newDot: {
    top: 15,
    left: 115,
  },
  menuContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  groupChildPosition: {
    left: 0,
    top: 0,
    height: 138,
    width: 138,
  },
  groupLayout: {
    borderRadius: FontSize.small,
    position: "absolute",
  },
  taskTypo: {
    textAlign: "center",
    fontFamily: Font["poppins-regular"],
    fontWeight: "500",
    position: "absolute",
  },
  groupIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupChild: {
    backgroundColor: "rgba(133, 143, 233, 0.25)",
    left: 0,
    top: 0,
    height: 138,
    width: 138,
  },
  task: {
    top: 103,
    left: 52,
    fontSize: 12,
    color: "#12175d",
    opacity: 0.5,
  },
  seProjectGroup: {
    top: "57.25%",
    width: 100,
    left: "15.22%",
    fontSize: 14,
    color: "#10275a",
  },
  groupItem: {
    height: "34.78%",
    width: "34.78%",
    top: "15.22%",
    right: "32.61%",
    bottom: "50%",
    left: "32.61%",
    backgroundColor: "#858fe9",
  },
  iconlycurvedprofile: {
    height: "17.39%",
    width: "17.39%",
    top: "23.91%",
    right: "41.3%",
    bottom: "58.7%",
    left: "41.3%",
  },
  rectangleParent: {
    position: "absolute",
    top: 0,
  },
  groupIcon: {
    height: "6.59%",
    width: "1.27%",
    top: "11.59%",
    right: "9.6%",
    bottom: "81.81%",
    left: "89.13%",
  },
  roomManagmentProfileSetti: {
    width: "40%",
    height: 150,
  },
});

export default RoomBox;
