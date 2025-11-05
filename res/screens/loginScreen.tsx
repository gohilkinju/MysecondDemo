import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../constants/colors";
import { isValidEmail, isValidPassword } from "../screens/validation";
import { strings } from "../constants/strings";
import { scaleFont } from "../constants/responsive";
import fonts from "../assets/fonts/fonts";
import { useNavigation } from "@react-navigation/native";


const loginScreen: React.FC = () => {
const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Error", strings.enterBoth);
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Invalid Email", strings.invalidEmail);
            return;
        }

        if (!isValidPassword(password)) {
            Alert.alert("Weak Password", strings.weakPassword);
            return;
        }

        if (email === "vendor@test.com" && password === "123456") {
            //navigate dashbord screen
            // Alert.alert("Success", strings.loginSuccessful);

            navigation.replace('bottomTabsNew'); 
        } else {
            Alert.alert("Error", strings.invalid);
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#303030" />
            <Text style={styles.title}>{strings.vendorLogin}</Text>
            <TextInput
                style={styles.input}
                placeholder={strings.enterEmail}
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder={strings.enterPassword}
                placeholderTextColor="#ccc"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>{strings.login}</Text>
            </TouchableOpacity>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#303030",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        color: colors.text,
        fontSize: scaleFont(28),
        fontWeight: "bold",
        marginBottom: 40,
        fontFamily:fonts.name.regular,
    },
    input: {
        width: "100%",
        backgroundColor: "#404040",
        color: colors.text,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: scaleFont(16),
        fontFamily:fonts.name.regular,
    },
    button: {
        width: "100%",
        backgroundColor: colors.text,
        borderRadius: 10,
        paddingVertical: 15,
        marginTop: 10,
        
    },
    buttonText: {
        color: "#303030",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: scaleFont(18),
        fontFamily:fonts.name.regular,
    },
    

});
export default loginScreen;