import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { IRoom } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { useGetAlltasksQuery } from "../../Redux/API/tasks.api.slice";
import { setRoomID } from "../../Redux/slices/userSlice";
import { useDispatch } from "react-redux";

const NonAdminRoomBox: React.FC<IRoom> = (props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation<any>();

  const roomId = props._id;

  const handleNavigate = () => {
    dispatch(setRoomID(roomId));
    // Navigate to the desired screen when the Pressable is pressed
    navigation.navigate("RoomDetails");
  };

  const { data: taskList, isLoading, isError } = useGetAlltasksQuery("");
  const taskCount = taskList?.content?.length;

  const propCount = Object.keys(props).length;

  return (
    <View style={styles.roomManagmentProfileSetti}>
      <View style={styles.groupParent}>
        <View style={[styles.rectangleParent, styles.groupChildPosition]}>
          <View style={[styles.groupChild, styles.groupLayout]} />
          <Text style={[styles.task, styles.taskTypo]}>{taskCount} Tasks</Text>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  groupParent: {
    height: 138,
    width: 138,
    position: "absolute",
  },
  roomManagmentProfileSetti: {
    backgroundColor: "#feffff",
    margin: 5,
    width: "40%",
    height: 150,
    overflow: "hidden",
  },
});

export default NonAdminRoomBox;
