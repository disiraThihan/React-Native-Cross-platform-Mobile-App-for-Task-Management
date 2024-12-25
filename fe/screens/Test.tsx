import * as react from "react";
import Popover from 'react-native-popover-view';
import { TouchableOpacity,Text, View, StyleSheet } from "react-native";

const TestTab = () => {

    return(
        <View style={{paddingVertical:60,paddingHorizontal:20}}>
            <Popover
            from={(
                <TouchableOpacity>
                <Text>Press here to open popover!</Text>
                </TouchableOpacity>
            )}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity  style={styles.textRow}>
                    <Text>📝   Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textRow}>
                    <Text>🗑️   Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textRow}>
                    <Text>❌   Cancel</Text>
                    </TouchableOpacity>
            </View>
            </Popover>
        </View>
       
    );
}

export default TestTab;

const styles = StyleSheet.create ({
    textRow: {
        marginVertical:10,
      },
      newDot:{
        top:15,
        left:115
      },
      menuContainer: {
        padding: 20,
        borderRadius: 10,
        elevation: 5,
      },
})