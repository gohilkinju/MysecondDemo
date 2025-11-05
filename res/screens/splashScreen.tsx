import { Image,  StatusBar, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { images } from "../assets/images/images";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';


const splashScreen:React.FC = () => {
const navigation = useNavigation();

     useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('loginScreen'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]
);
    return (
        <SafeAreaView  style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#303030" />
      <Image
        source={images.foodbg}
        style={styles.backgroundImage}
      />
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});
export default splashScreen;