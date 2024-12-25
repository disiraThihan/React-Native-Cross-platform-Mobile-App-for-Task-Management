import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Font from "../../constants/Font";
import { Schedule } from "../../types";
import { Color, FontSize, Padding, Border } from "../../Styles/GlobalStyles";
import { DateUtils } from "../../utils/DateUtils";
import { Row, Stack } from "native-base";

const RoomScheduleBox = (props: any) => {
  const { isRoomNameVisible = false } = props;
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        width: "100%",
        borderRadius: 4,
        backgroundColor: Color.ghostwhite,
      }}
    >
      <Row space={4} alignItems={"center"}>
        <View style={styles.frameChild} />
        <Stack>
          <Text style={styles.projectProgressMeeting}>{props.taskName}</Text>
          <Text style={styles.text4}>
            {DateUtils.getStartEndTimeString(props.startTime, props.endTime)}
          </Text>
          {isRoomNameVisible && (
            <Text style={[styles.altriumRoom01Typo]}>{props.roomName}</Text>
          )}
        </Stack>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: 80,
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
    marginTop: 5,
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: "#8f99eb",
    borderRightWidth: 2,
    width: 2,
    height: 37,
  },
});

export default RoomScheduleBox;
