import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";


const thirdScreen = () => {

    return (
        <View style={styles.chevron}>
            <LinearGradient
                colors={['#363E51', '#181C24']}
                style={styles.gradient}
            >
                {/* <View style={styles.chevronMain} /> */}
                <View style={[styles.chevronTriangle2, styles.chevronTopRight]} />
            </LinearGradient>
        </View>
    );
}
const styles = StyleSheet.create({
    gradient: {
        height:50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    chevron: {
        width: "100%",
        marginTop: 50,
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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