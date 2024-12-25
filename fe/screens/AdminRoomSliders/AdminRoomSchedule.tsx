import * as React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import Font from "../../constants/Font";
import { Button, Stack, NativeBaseProvider } from "native-base";
import Calendar from "../../components/Calendar/calender";
import moment, { Moment } from "moment";
import { useState } from "react";
import AdminScheduleScreen from "../../components/AdminRoomPSComp";
import { useAppSelector } from "../../hooks/redux-hooks";

const AdminRoomSchedule = () => {
  const roomId = useAppSelector((state) => state.user.roomId);

  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

  const handleDateSelect = (date: Moment) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.body}>
      <Text style={[styles.shedule, styles.textFlexBox]}>Shedule</Text>
      <View style={styles.pageTitle}>
        <Text style={[styles.date, styles.datePosition]}>August 2023</Text>
      </View>
      <View style={styles.datePicker}>
        <Calendar onSelectDate={handleDateSelect} selected={selectedDate} />
      </View>
      <View style={styles.datePicker}>
        {/* <AdminScheduleScreen selectedDate={selectedDate} roomId={roomId} /> */}
      </View>
    </View>
  );
};

export default AdminRoomSchedule;

const Color = {
  colorWhite: "#fff",
  colorDarkturquoise: "#1ec1c3",
  colorLightcyan: "#d1feff",
  colorCornflowerblue: "#8f99eb",
  colorLightsteelblue: "#9aa8c7",
  colorDarkslateblue_100: "#2c406e",
  colorDarkslateblue_200: "#10275a",
  colorGhostwhite: "#f9fafd",
};

const styles = StyleSheet.create({
  shedule: {
    top: 38,
    fontSize: 24,
    fontWeight: "600",
    fontFamily: Font["poppins-regular"],
    width: 115,
    height: 32,
    left: 23,
  },
  textFlexBox: {
    textAlign: "left",
    color: "#10275a",
    position: "absolute",
  },
  date: {
    left: 15,
    fontSize: 12,
    color: "#525f77",
    width: 91,
    height: 19,
    fontFamily: Font["poppins-regular"],
    textAlign: "left",
  },
  iconlycurvedcalendar: {
    height: "73.68%",
    width: "15.56%",
    top: "10.53%",
    right: "84.44%",
    bottom: "15.79%",
    left: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  pageTitle: {
    top: 46,
    left: 269,
    width: 90,
    height: 19,
    position: "absolute",
  },
  datePosition: {
    top: 0,
    position: "absolute",
  },
  body: {
    top: 0,
  },

  frameItem: {
    backgroundColor: "#eceaff",
    width: 77,
    height: 34,
    borderRadius: 22,
    zIndex: 0,
  },
  frameInner: {
    backgroundColor: "#ffefeb",
    marginLeft: 6,
    width: 77,
    height: 34,
    borderRadius: 22,
    zIndex: 1,
  },
  datePicker: {
    top: 70,
  },
  schedule: {
    top: 0,
  },
});
