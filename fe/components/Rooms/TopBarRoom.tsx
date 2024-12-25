import * as React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import Font from "../../constants/Font";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../hooks/redux-hooks";

const TopBarRoom = () => {
  const roomName = useAppSelector((state) => state.room.name);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate("BottomTab");
  };
  return (
    <View style={styles.TopBarRoom}>
      <View style={styles.TopBarRoomInner}>
        <View style={[styles.rectangleParent, styles.groupChildPosition]}>
          <View style={[styles.groupChild, styles.groupChildPosition]} />
          <Pressable style={styles.iconlycurvedarrowLeft2} onPress={handleBack}>
            <Image
              style={[styles.icon, styles.iconLayout]}
              contentFit="cover"
              source={require("fe/assets/Arrow.png")}
            />
          </Pressable>
          <Text style={styles.seProjectGroup}>{roomName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    left: "0%",
    bottom: "0%",
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  groupChild: {
    height: "97.96%",
    width: "18.6%",
    top: "2.04%",
    right: "81.4%",
    borderRadius: 14,
    backgroundColor: "#fff",
    shadowColor: "#f1f7ff",
    shadowOffset: {
      width: -3,
      height: 7,
    },
    shadowRadius: 13,
    elevation: 13,
    shadowOpacity: 1,
  },
  icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  iconlycurvedarrowLeft2: {
    left: "4.65%",
    top: "26.53%",
    right: "86.05%",
    bottom: "24.49%",
    width: "9.3%",
    height: "48.98%",
    position: "absolute",
  },
  seProjectGroup: {
    top: 10,
    left: 80,
    fontSize: 24,
    fontWeight: "600",
    fontFamily: Font["poppins-semiBold"],
    color: "#10275a",
    textAlign: "left",
    position: "absolute",
  },
  rectangleParent: {
    top: "0%",
    right: "0%",
    height: 50,
    width: "100%",
  },
  TopBarRoomInner: {
    height: "6.03%",
    width: "68.8%",
    top: "40%",
    right: "24.8%",
    bottom: "89.16%",
    left: "6.4%",
    position: "absolute",
  },
  TopBarRoom: {
    backgroundColor: "#feffff",
    flex: 1,
    overflow: "hidden",
    width: "100%",
  },
});

export default TopBarRoom;
