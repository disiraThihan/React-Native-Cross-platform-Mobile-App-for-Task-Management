import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import AdminRoomScheduleBox from "./schedule/AdminRoomScheduleBox";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Schedule } from "../types";
import { useGetPopulatedRoomScheduleQuery } from "../Redux/API/schedules.api.slice";

const AdminScheduleScreen = (selectedDate: any, roomId: any) => {
  const {
    data: scheduleList,
    isError,
    isLoading,
  } = useGetPopulatedRoomScheduleQuery({});

  const groupedSchedules: { [key: string]: any[] } = {};

  scheduleList?.content.forEach((schedule: Schedule) => {
    const key = schedule.date.toISOString(); // Use the date as a string
    if (!groupedSchedules[key]) {
      groupedSchedules[key] = [];
    }
    groupedSchedules[key].push(schedule);
  });

  // Sort the keys (start times) in ascending order
  const sortedKeys = Object.keys(groupedSchedules).sort((a, b) => {
    // You can use the date strings for comparison directly
    return a.localeCompare(b);
  });

  return (
    <View style={styles.container}>
      <View style={styles.Box}>
        <Text style={[styles.today, styles.todayPosition]}>Day Plan</Text>
        <Text style={[styles.h45Min, styles.h45MinTypo]}>09 h 45 min</Text>
      </View>

      <FlatList
        data={
          sortedKeys.map((key) => [key, groupedSchedules[key]]) as (
            | string
            | any[]
          )[]
        }
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={styles.timeSlotContainer}>
            <Text style={styles.timeSlot}>{item[0]}</Text>
            {item[1].map((schedule: Schedule) => (
              <AdminRoomScheduleBox {...schedule} key={schedule._id} />
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  Box: {
    width: 100,
    height: 30,
    marginBottom: 30,
  },
  timeSlotContainer: {
    marginBottom: 16,
  },
  timeSlot: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 8,
    color: Colors.primary,
  },
  scheduleItem: {
    padding: 10,
    backgroundColor: "#e5e5e5",
    marginBottom: 8,
  },
  todayPosition: {
    textAlign: "left",
    color: Colors.darkText,
    left: "auto",
    position: "absolute",
  },
  h45MinTypo: {
    fontFamily: Font["poppins-regular"],
    textAlign: "left",
  },
  today: {
    fontSize: 20,
    width: "auto",
    height: 26,
    fontFamily: Font["poppins-regular"],
    fontWeight: "500",
    textAlign: "left",
    color: Colors.darkText,
  },
  h45Min: {
    left: 260,
    color: "#000",
    width: 69,
    height: 19,
    fontSize: 14,
    fontFamily: Font["poppins-regular"],
    position: "absolute",
  },
});

export default AdminScheduleScreen;
