import * as React from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import RoomBox from "../components/Rooms/RoomBox";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Popover from "react-native-popover-view";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useGetAllroomsQuery } from "../Redux/API/rooms.api.slice";
import RoutePaths from "../utils/RoutePaths";
import { useEffect } from "react";
import { removeItem } from "../utils/Genarals";
import { logoutCurrentUser } from "../Redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Button, Stack } from "native-base";
import LoadingIndictator from "../components/LoadingIndictator";
import PrimaryButton from "../components/PrimaryButton";
import EmptyListPlaceholder from "../components/EmptyListPlaceholder";

const AdminRoomComponent = () => {
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.user);
  const {
    data: roomList,
    isFetching: isRoomListFetching,
    refetch: refetchRoomList,
  } = useGetAllroomsQuery(user._id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetchRoomList();
    });
    return unsubscribe;
  }, []);

  const isRoomAdmin = (room: any) => {
    return room.adminIds.includes(user._id);
  };

  if (isRoomListFetching) return <LoadingIndictator />;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 15,
        width: "100%",
        justifyContent: "center",
      }}
    >
      {roomList?.length ? (
        roomList?.map((room: any) => (
          <RoomBox
            {...room}
            isActionsVisible={isRoomAdmin(room)}
            onDelete={() => refetchRoomList()}
          />
        ))
      ) : (
        <EmptyListPlaceholder
          title={"No Rooms Found"}
          content={
            "Click the button above to get started by making a room, or wait to be invited to another room."
          }
        />
      )}
    </View>
  );
};

const ProfileActionsButton = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isPopoverVisible, setIsPopoverVisible] = useState<boolean>(false);

  const handleSettings = () => {
    navigation.navigate("Settings");
    setIsPopoverVisible(false); // Close the popover
  };

  const handleLogout = () => {
    removeItem(RoutePaths.token);
    removeItem("user");
    dispatch(logoutCurrentUser);
    navigation.navigate("Login");
    setIsPopoverVisible(false); // Close the popover
  };

  return (
    <Popover
      isVisible={isPopoverVisible} // Pass the state variable as a prop to control visibility
      onRequestClose={() => setIsPopoverVisible(false)} // Close the Popover when backdrop is pressed
      from={
        <Pressable onPress={() => setIsPopoverVisible((prev) => !prev)}>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
            }}
            source={require("../assets/More-Square.png")}
          />
        </Pressable>
      }
    >
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={handleSettings} style={styles.textRow}>
          <Text>
            <AntDesign name="setting" size={14} color="black" /> Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.textRow}>
          <Text>
            <Ionicons
              name="log-out-outline"
              size={14}
              color="black"
              onPress={handleLogout}
            />{" "}
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </Popover>
  );
};

const RoomManagmentProfileSetti = () => {
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.user);

  const handleNavigate = () => {
    // Navigate to the desired screen when the Pressable is pressed
    navigation.navigate("CreateRoom");
  };

  return (
    <View>
      <ScrollView style={{ padding: 25, marginTop: 25 }}>
        <View style={{ position: "absolute", zIndex: 1000, left: "92%" }}>
          <ProfileActionsButton />
        </View>
        <Stack space={4}>
          <Stack space={4} alignItems={"center"} justifyContent={"center"}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                shadowOffset: { width: 0, height: 10 },
                shadowColor: Colors.primary,
                shadowOpacity: 0.1,
                shadowRadius: 8,
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                contentFit="cover"
                source={require("../assets/58-13.png")}
              />
            </View>

            <Text
              style={styles.nameText}
            >{`${user.firstName} ${user.lastName}`}</Text>
            <Text style={styles.emailText}>{user.email}</Text>
          </Stack>
          <PrimaryButton label={"Create Room +"} onPress={handleNavigate} />
          <View style={{ width: "100%" }}>
            <AdminRoomComponent />
          </View>
        </Stack>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 100,
    paddingRight: 70,
  },
  textRow: {
    marginVertical: 10,
  },
  menuContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  roomsYouMember: {
    position: "absolute",
    left: 30,
    top: 10,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Font["poppins-semiBold"],
    color: "#10275a",
    textAlign: "left",
  },
  roomManagmentMember: {
    backgroundColor: "#feffff",
    flex: 1,
    width: "100%",
    height: 50,
    overflow: "hidden",
  },
  Box: {
    width: "100%",
    height: 300,
  },
  Box1: {
    width: "100%",
    alignSelf: "stretch", // Ensures the container takes the full width
  },
  roomsManageByFlexBox: {
    textAlign: "left",
    color: Colors.darkblue,
  },
  ellipseParentPosition: {
    left: 0,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupPosition: {
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  nameText: {
    fontSize: 20,
    fontFamily: Font["poppins-semiBold"],
    fontWeight: "600",
    color: Colors.darkblue,
  },
  emailText: {
    fontSize: 14,
    fontFamily: Font["poppins-regular"],
  },
  groupChild: {
    top: -6,
    left: -16,
    width: 112,
    height: 112,
    borderRadius: FontSize.small,
    position: "absolute",
  },
  icon: {
    height: "90.7%",
    width: "91.86%",
    top: "8.14%",
    right: "5.81%",
    bottom: "1.16%",
    left: "2.33%",
  },
  ellipseParent: {
    top: 0,
    width: 86,
    height: 86,
  },
  groupItem: {
    backgroundColor: "#fff",
    shadowColor: "#f1f7ff",
    shadowOffset: {
      width: -3,
      height: 7,
    },
    shadowRadius: 13,
    elevation: 13,
    shadowOpacity: 1,
    borderRadius: FontSize.small,
  },
  iconlycurvedmoreSquare: {
    height: "50%",
    width: "50%",
    top: "27.08%",
    right: "25%",
    bottom: "22.92%",
    left: "25%",
  },
  groupWrapper: {
    height: "55.81%",
    width: "23.41%",
    top: "13.95%",
    bottom: "30.23%",
    left: "76.59%",
    right: "0%",
    position: "absolute",
  },
  groupParent: {
    top: 34,
    left: 143,
    width: 205,
    height: 86,
    position: "absolute",
  },
  roomsManageBy: {
    top: 1,
    fontSize: 16,
    textAlign: "left",
    color: Colors.darkblue,
    fontFamily: Font["poppins-semiBold"],
    fontWeight: "600",
  },
  groupInner: {
    borderRadius: 8,
    backgroundColor: "#858fe9",
  },
  createRoom: {
    top: 8,
    left: 18,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "500",
    fontFamily: Font["poppins-regular"],
    color: "#f1f7ff",
    textAlign: "center",
    width: 80,
    height: 15,
    position: "absolute",
  },
  iconlycurvedhome: {
    height: "48.39%",
    width: "16.13%",
    top: "25.81%",
    right: "80.65%",
    bottom: "25.81%",
    left: "3.23%",
  },
  groupContainer: {
    width: "33.49%",
    left: "69.51%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    right: "0%",
    position: "absolute",
  },
  roomsManageByYouParent: {
    top: 228,
    left: 35,
    width: 305,
    height: 60,
    position: "absolute",
  },
});

export default RoomManagmentProfileSetti;
