import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from "./fonts";
import { hp, scaleFont, wp } from "./responsive2";


const thirdScreen:React.FC = () => {

    return (
        <View style={styles.chevron}>
            <Text style={styles.description}>{"therd screen"}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    description: {
        fontSize: scaleFont(20),
    color: '#eee',
    marginTop: hp(10),
    marginLeft: wp(20),
    },
    gradient: {
        height:50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    chevron: {
        backgroundColor: "#363E51",
        width: "100%",
        flex: 1,
        
    },
    chevronMain: {
        width: "100%",
        height: 50,
        backgroundColor: "pink",
    },

    chevronTriangle2: {
        backgroundColor: "transparent",
        borderTopWidth: 20,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 450,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        borderRightColor: "transparent",
        borderLeftColor: "#363E51",
    },

    chevronTopRight: {
        position: "absolute",
        top: -20,
        right: 0,
        transform: [{ scaleX: -1 }],
    },

});
export default thirdScreen