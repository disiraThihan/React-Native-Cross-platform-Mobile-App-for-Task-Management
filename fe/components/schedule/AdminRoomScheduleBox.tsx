import React from "react";
import { Text, StyleSheet, View , Pressable} from "react-native";
import { NativeBaseProvider, Button } from 'native-base';
import Font from "../../constants/Font";
import { Schedule } from "../../types";
import { Color,FontSize, Padding, Border } from "../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useDeletetaskMutation } from "../../Redux/API/tasks.api.slice";
import { Entypo } from "@expo/vector-icons";
import Popover from 'react-native-popover-view';
import { TouchableWithoutFeedback , TouchableOpacity ,Modal ,Alert } from "react-native";
import { useState } from "react";
import Colors from "../../constants/Colors";

const AdminRoomScheduleBox = (props : Schedule) => {

  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const navigation = useNavigation<any>();

  const [modalVisible2, setModalVisible2] = useState(false);

  const [deleteTask, deletedResult] = useDeletetaskMutation();


  const taskId = props.schedules[0].taskList[0].taskId

  const handleEdit = () => {
    navigation.navigate("EditTask" , {
      taskId: taskId,
    });
    setPopoverVisible(false); // Close the popover
  };

  const handleDelete = () => {
    setModalVisible2(true);
  };

  const handleDeletePermission = (taskId: string) => {
    setModalVisible2(true);
    deleteTask(taskId);
  };

  const handleCancle = () => {
      setModalVisible2(!modalVisible2)
      setPopoverVisible(false); // Close the popover
  }

    return(
        <View style={styles.roomManagmentProfileSetti}>
        <View style={styles.roomManagmentProfileSettiInner}>
          <View style={styles.groupParent}>
            <View style={styles.groupChildPosition}>
              <View style={[styles.groupChild, styles.groupChildPosition]} />
              <View style={styles.projectProgressParent}>
                <Text
                  style={[styles.projectProgress, styles.textPosition]}
                >{props.schedules[0].taskList[0].taskName}</Text>
                <Text style={[styles.text, styles.textPosition]}>
                  {props.schedules[0].taskList[0].startTime} - {props.schedules[0].taskList[0].endTime}
                </Text>
              </View>
              <View
                style={[
                  styles.fluentmoreVertical20Regula,
                  styles.groupItemPosition,
                ]}
              />
              <View style={[styles.groupItem, styles.groupItemPosition]} />
            </View>

            <Popover
            isVisible={isPopoverVisible} // Pass the state variable as a prop to control visibility
            onRequestClose={() => setPopoverVisible(false)} // Close the Popover when backdrop is pressed
                from={(
                      <TouchableWithoutFeedback  onPress={() => setPopoverVisible(!isPopoverVisible)}>
                        <View style={styles.doted}>
                            <Entypo name="dots-three-vertical" size={10} color="black" />
                        </View>
                      </TouchableWithoutFeedback>
                )}>
                    {/* Model to change the Language */}
                    <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible2}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible2(!modalVisible2);
                                }}>
                                <View style={styles.modalBackground}>
                                <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.typoTitle1}>Delete Task</Text>
                                        <View style={styles.box1}>
                                            <Text style={styles.typoBoddy}>Are you sure to delete this Task ?</Text>
                                        </View>
                                        <View style={styles.box1}>
                                            <NativeBaseProvider>
                                                <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                                                    <Button style={{ marginHorizontal: 20 }} variant="outline" colorScheme="fuchsia" onPress={handleCancle}>
                                                        Cancle
                                                    </Button>
                                                    <Button colorScheme="fuchsia" onPress={() => handleDeletePermission(props._id)}>    Sure    </Button>
                                                </View>
                                            </NativeBaseProvider>
                                        </View>
                                </View>
                                </View>
                                </View>
                        </Modal>   

                        <Pressable style={[styles.groupInner, styles.groupInnerLayout]} />
                        <Text style={[styles.remove, styles.removeTypo]} onPress={handleDelete}>Remove</Text>
                        <Pressable
                          style={[styles.rectanglePressable, styles.groupInnerLayout]}
                        />
                        <Text style={[styles.reschedule, styles.removeTypo]} onPress={handleEdit}>Reschedule</Text>

                      </Popover>

          </View>
        </View>
      </View>

    );
}

const styles = StyleSheet.create ({
    groupChildPosition: {
        left: 0,
        top: 0,
        height: 130,
        width: "100%",
        position: "absolute",
      },
      textPosition: {
        textAlign: "left",
        left: 0,
        position: "absolute",
      },
      groupItemPosition: {
        top: 21,
        position: "absolute",
      },
      groupInnerLayout: {
        borderRadius: Border.br_5xs,
        bottom: "10.53%",
        top: "72.81%",
        width: "36.84%",
        height: "16.67%",
        position: "absolute",
      },
      removeTypo: {
        height: 15,
        width: 104,
        textAlign: "center",
        color: Color.colorAliceblue,
        lineHeight: 15,
        fontSize: FontSize.size_3xs,
        top: 85,
        fontFamily: Font['poppins-regular'],
        fontWeight: "500",
        position: "absolute",
      },
      groupChild: {
        borderRadius: 15,
        backgroundColor: "#f9fafd",
      },
      projectProgress: {
        fontSize: 16,
        color: "#2c406e",
        fontFamily: Font['poppins-regular'],
        fontWeight: "500",
        textAlign: "left",
        width: 166,
        top: 0,
      },
      text: {
        top: 26,
        fontSize: 14,
        fontFamily: Font['poppins-regular'],
        color: "#9aa8c7",
        width: "100%",
      },
      projectProgressParent: {
        top: 15,
        left: 37,
        height: 49,
        width: 166,
        position: "absolute",
      },
      fluentmoreVertical20Regula: {
        left: 244,
        width: 21,
        height: 14,
        overflow: "hidden",
      },
      groupItem: {
        left: 21,
        borderStyle: "solid",
        borderColor: "#8f99eb",
        borderRightWidth: 2,
        width: 2,
        height: 37,
      },
      groupInner: {
        right: "11.05%",
        left: "52.11%",
        backgroundColor: "#ff5959",
      },
      remove: {
        left: 175,
      },
      rectanglePressable: {
        right: "52.63%",
        left: "10.53%",
        backgroundColor: "#5b67ca",
      },
      reschedule: {
        left: 42,
      },
      groupParent: {
        height: 114,
        width: "100%",
      },
      roomManagmentProfileSettiInner: {
        top: 10,
        flexDirection: "row",
        width: "100%",
        position: "absolute",
      },
      roomManagmentProfileSetti: {
        backgroundColor: "#feffff",
        flex: 1,
        width: "100%",
        height: 140,
        overflow: "hidden",
      },

       //Modal
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      justifyContent: 'center',
      alignItems: 'center',
  },

  // Model Styles
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
  },
  modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
  },
  typoTitle1: {
      color: Colors.darkblue,
      fontFamily: Font['poppins-semiBold'],
      fontSize: FontSize.size_xl,
  },
  typoBoddy: {
      color: Colors.darkblue,
      fontFamily: Font['poppins-regular'],
      fontSize: FontSize.size_base,
  },
  box1: {
      flex:1,
      flexDirection:'row',
      maxHeight:50
  },
  doted: {
    top: 20,
    left: 300,
},

})

export default AdminRoomScheduleBox;