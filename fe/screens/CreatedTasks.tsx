import * as React from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Font from "../constants/Font";
import EditableScheduleBox from "../components/schedule/EditableScheduleBox";
import { scheduleTypes } from "../types";
import { schedulesApi } from "../data/virtualData";
import { useGetAllPersonalDaySchedulesQuery } from "../Redux/API/schedules.api.slice";
import AppTextInput from "../components/AppTextInput";
import { getItem } from "../utils/Genarals";
import RoutePaths from "../utils/RoutePaths";
import { useState } from "react";
import { useEffect } from "react";
import { useGetAlltasksQuery } from "../Redux/API/tasks.api.slice";
import { ActivityIndicator } from "react-native";
import { Tasks } from "../types";
import { useGetAllroomsQuery } from "../Redux/API/rooms.api.slice";
import { useAppSelector } from "../hooks/redux-hooks";
import EmptyListPlaceholder from "../components/EmptyListPlaceholder";

const CreatedTasks = (props: any) => {
  const navigation = props.navigation;
  const user = useAppSelector((state) => state.user);
  const userID = user?._id;

  const {
    isFetching: isTaskListFetching,
    data: taskList,
    isSuccess,
    isError,
    refetch: refetchTaskList,
  } = useGetAlltasksQuery("api/tasks", {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const { data: roomsList } = useGetAllroomsQuery(userID, {});

  const [searchText, setSearchText] = useState("");

  // Function to filter tasks based on search text
  const filteredTasks = taskList?.content.filter((task: Tasks) =>
    task.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const getRoomFromList = (roomId: string) => {
    return roomsList?.find((room: any) => room._id === roomId);
  };

  // Whenever this screen appears. Reload the task list
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetchTaskList();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.flexBox}>
      <View style={styles.Box}>
        <Text style={[styles.tasksCreatedBy, styles.searchForTaskFlexBox]}>
          Tasks Created By You
        </Text>
      </View>
      <Image
        style={[styles.allTasksChild, styles.allTasksChildLayout]}
        source={require("../assets/Tasks.png")}
      />
      <View style={styles.Box2}>
        <AppTextInput
          placeholder="🔍   Search tasks"
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <View style={styles.Box1}>
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          contentContainerStyle={styles.frameScrollViewContent}
        >
          {isTaskListFetching || isError ? (
            <ActivityIndicator
              style={styles.contentContainer}
              color="#0000ff"
              size="large"
            />
          ) : filteredTasks?.length === 0 ? (
            <>
              <EmptyListPlaceholder
                title="No Tasks Found"
                content="Any tasks you create in your rooms will show up here"
              />
            </>
          ) : (
            filteredTasks?.map((schedule: Tasks) => (
              <EditableScheduleBox
                {...schedule}
                {...{
                  roomName: getRoomFromList(schedule.roomId)?.name,
                }}
                key={schedule._id}
                onDelete={() => refetchTaskList()}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default CreatedTasks;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 100,
    paddingHorizontal: 150,
  },
  flexBox: {
    flex: 1,
  },
  Box: {
    width: "100%",
    height: 70,
    padding: 25,
  },
  Box1: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 25,
  },
  Box2: {
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 10,
  },
  tasksCreatedBy: {
    top: 57,
    left: 72,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: Font["poppins-bold"],
    color: "#10275a",
  },
  allTasksChild: {
    height: "9.11%",
    width: "19.73%",
    top: "6.93%",
    right: "79.2%",
    bottom: "85.96%",
    left: "8.07%",
  },
  allTasksChildLayout: {
    maxHeight: "40%",
    maxWidth: "40%",
    position: "absolute",
    overflow: "hidden",
  },
  searchForTaskFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  frameScrollViewContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },
});
