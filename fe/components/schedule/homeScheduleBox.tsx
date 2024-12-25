import React, { FC } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Font from "../../constants/Font";
import { TaskType } from "../../types";
import { Color,FontSize, Padding, Border } from "../../Styles/GlobalStyles";
import DotMenu from "../PopUpMenu";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScheduleBox:FC<TaskType & {tag:string}> = ( props ) => {

    const navigation = useNavigation<any>();

    const handleNavigate = () => {
      // Navigate to the desired screen when the Pressable is pressed
      navigation.navigate("TaskDetail" , {
        taskId : props.taskId,
      }); 
    };

    return(
        <View style={[styles.frameContainer, styles.frameLayout]}>
        
        <TouchableOpacity onPress={handleNavigate}>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <View style={styles.frameChild} />
          <View style={styles.projectProgressMeetingParent}>
            <Text style={styles.projectProgressMeeting}>
              {props.taskName}
            </Text>
            <Text style={styles.text4}>{props.startTime} - {props.endTime}</Text>
          </View>
        </View>
        </TouchableOpacity>

        <View style={styles.doted}>
           <DotMenu/>
        </View>

        <TouchableOpacity onPress={handleNavigate}>
        <View style={[styles.altriumRoom01Wrapper, styles.wrapperLayout]}>
          <Text style={[styles.altriumRoom01, styles.altriumRoom01Typo]}>
            {props.tag}
          </Text>
        </View>
        </TouchableOpacity>

      </View>

    );
}

const styles = StyleSheet.create ({
    frameFlexBox1: {
        flexDirection: "column",
        position: "absolute",
        alignItems: "center",
        overflow: "hidden",
    },
    doted: {
        top: 20,
        left: 100,
    },
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
        height: 20,
        width: 83,
        fontSize: FontSize.size_3xs,
        fontFamily: Font["poppins-regular"],
        fontWeight: "500",
        textAlign: "left",
      },
    frame4: {
        top: 15,
        left: 19,
        width: 192,
        height: 49,
      },
    frameLayout: {
        height: 114,
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
        marginTop: 18,
      },
    frameChild: {
        borderStyle: "solid",
        borderColor: "#8f99eb",
        borderRightWidth: 2,
        width: 2,
        height: 37,
      },
})

export default HomeScheduleBox;