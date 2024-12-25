import * as React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Font from "../../constants/Font";
import AppTextInput from "../../components/AppTextInput";
import { useNavigation } from "@react-navigation/native";
import { Tasks } from "../../types";
import { useGetAllTasksInRoomQuery } from "../../Redux/API/tasks.api.slice";
import EditableScheduleBox from "../../components/schedule/EditableScheduleBox";
import { useEffect, useState } from "react";
import { useGetroomQuery } from "../../Redux/API/rooms.api.slice";
import LoadingIndictator from "../../components/LoadingIndictator";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import { useAppSelector } from "../../hooks/redux-hooks";
import PrimaryButton from "../../components/PrimaryButton";

const AdminCreatedTasks = () => {
  const navigation = useNavigation(); // Get the navigation object
  const userId = useAppSelector((state) => state.user._id);
  const roomId = useAppSelector((state) => state.user.roomId);
  const {
    data: { content: taskList } = {},
    refetch: refetchTaskList,
    isFetching: isTaskListFetching,
  } = useGetAllTasksInRoomQuery({ roomId });
  const [searchText, setSearchText] = useState("");
  const { data: roomData, refetch: refetchRoomData } = useGetroomQuery(roomId);
  const isCurrentUserAdmin = roomData?.adminIds?.includes(userId);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetchTaskList();
      refetchRoomData();
    });
    return unsubscribe;
  }, [navigation]);

  const handleAddTaskClick = () => {
    navigation.navigate("AddTask" as any, { roomId });
  };

  const getFilteredTasks = () => {
    if (!searchText) return taskList;
    return taskList?.filter((task: { name: string }) =>
      task.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <View style={styles.flexBox}>
      <View style={styles.Box2}>
        <AppTextInput
          style={{ flexGrow: 1 }}
          placeholder="🔍   Search tasks"
          onChangeText={(text) => setSearchText(text)}
        />
        {isCurrentUserAdmin && (
          <PrimaryButton
            label={"+"}
            buttonStyle={{ width: 60 }}
            textStyle={{ fontSize: 24 }}
            onPress={handleAddTaskClick}
          />
        )}
      </View>
      <View style={styles.Box1}>
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          contentContainerStyle={styles.frameScrollViewContent}
        >
          {isTaskListFetching ? (
            <LoadingIndictator />
          ) : getFilteredTasks() === undefined ||
            getFilteredTasks()?.length === 0 ? (
            <EmptyListPlaceholder
              title={"No Tasks Found"}
              content={
                !searchText
                  ? "Use the button above to add some tasks to this room"
                  : "No tasks found for this search key"
              }
            />
          ) : (
            getFilteredTasks()?.map((schedule: Tasks) => {
              return (
                <EditableScheduleBox
                  {...schedule}
                  key={schedule._id}
                  isRoomNameVisible={false}
                  isActionsVisible={isCurrentUserAdmin}
                  onDelete={() => refetchTaskList()}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default AdminCreatedTasks;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 100,
    paddingHorizontal: 150,
  },
  groupChild: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 8,
    backgroundColor: "#32338c",
    position: "absolute",
    width: "100%",
  },
  newTask: {
    top: 8,
    left: 19,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "500",
    fontFamily: Font["poppins-regular"],
    color: "#f1f7ff",
    textAlign: "center",
    width: 71,
    height: 15,
    position: "absolute",
  },
  iconlycurvedhome: {
    height: "48.39%",
    width: "16.13%",
    top: "25.81%",
    right: "79.57%",
    bottom: "25.81%",
    left: "4.3%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleParent: {
    height: 30,
    width: 100,
    top: "1.72%",
    right: "6.4%",
    bottom: "94.46%",
    left: "68.8%",
    position: "absolute",
  },
  roomManagmentProfileSetti: {
    backgroundColor: "#feffff",
    flex: 1,
    height: 30,
    overflow: "hidden",
    width: "100%",
  },
  flexBox: {
    flex: 1,
  },
  Box1: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 25,
    marginTop: 10,
  },
  Box2: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingTop: 10,
    gap: 10,
  },
  Box3: {
    width: "100%",
    height: 30,
    right: 10,
  },

  frameScrollViewContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },
});
