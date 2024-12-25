import * as React from "react";
import {
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Font from "../../constants/Font";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useGetroomQuery } from "../../Redux/API/rooms.api.slice";
import TaskDetail from "../TaskDetail";
import { useEffect } from "react";
import { setRoom } from "../../Redux/slices/roomSlice";
import DataBlock from "../../components/DataBlock";
import { Row } from "native-base";
import { DateUtils } from "../../utils/DateUtils";
import LoadingIndictator from "../../components/LoadingIndictator";

const RoomManagmentProfileSetti = () => {
  const dispatch = useAppDispatch();
  const roomId = useAppSelector((state) => state.user.roomId);
  const { data: roomData, isError, isLoading } = useGetroomQuery(roomId);

  useEffect(() => {
    if (roomData) {
      console.log("Setting room data in AdminRoomDetail", roomData);
      dispatch(setRoom(roomData));
    }
  }, [roomData, isLoading]);

  return (
    <View>
      <View style={styles.box0}>
        <Text style={styles.typo1}>Room Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Row style={{ gap: 5, marginBottom: 10 }}>
          <DataBlock
            isLoading={isLoading}
            title={"Created On"}
            content={DateUtils.getFormattedDate(roomData?.createdAt)}
          />
          <DataBlock
            isLoading={isLoading}
            title={"Created At"}
            content={DateUtils.getFormattedTime(roomData?.createdAt)}
          />
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <DataBlock
            isLoading={isLoading}
            title={"Description"}
            content={roomData?.description}
          />
        </Row>
        {isLoading ? (
          <LoadingIndictator />
        ) : (
          <>
            <View style={styles.box1}>
              <Text style={styles.typoBoddy}>Organisation</Text>
            </View>
            <View style={styles.box1}>
              <Text
                style={[
                  styles.typoBoddy,
                  { color: Colors.darkblue, fontFamily: Font["poppins-bold"] },
                ]}
              >
                {roomData?.organization}
              </Text>
            </View>
            <View style={styles.box1}>
              <Image source={require("../../assets/Line_19.png")} />
            </View>
            <View style={styles.box1}>
              <Text style={styles.typoBoddy}>Tag</Text>
            </View>
            <View style={styles.box2}>
              <View style={[styles.tabButton, { backgroundColor: "#eceaff" }]}>
                <Text style={[styles.tabtypoBoddy, { color: "#8F81FE" }]}>
                  {roomData?.tag}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default RoomManagmentProfileSetti;

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
  tabButton: {
    backgroundColor: Colors.colorLavender,
    borderRadius: 20,
    padding: 8,
    marginRight: 5,
  },
  box0: {
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  box1: {
    marginBottom: 20,
  },
  box11: {
    borderRadius: 10,
    paddingHorizontal: 30,
    marginRight: 0,
    paddingVertical: 20,
    marginBottom: 20,
  },
  box12: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 20,
  },
  box2: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
