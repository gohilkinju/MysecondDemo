import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from './images';
import { useNavigation } from '@react-navigation/native';
import WeatherToday from './weatherToday';
import responsivePixels from './responsivePixels';
import fonts from './fonts';

export default function mainScreen({navigation}) {




  return (
      <LinearGradient
      colors={['#0D1B3D', '#3E2C8B', '#A32CA0']} 
      style={styles.container}
      start={{ x: 0.5, y: 0 }}   // from top center
      end={{ x: 0.5, y: 1 }}     // to bottom center
    >
      <View style={{flex:1,alignItems:'center'}}>

    <Image
        source={images.weatherImage} // place your weather image here
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Weather</Text>
      <Text style={styles.subTitle}>ForeCasts</Text>


  <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('bottomTabsNew')} >
        <Text style={styles.buttonText}>Get Start</Text>
      </TouchableOpacity>
      </View>

    

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // full screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: fonts.size._22px,
    fontWeight: 'bold',
  },
  image: {
    width: responsivePixels.size400,
    height: responsivePixels.size400,
    marginTop: responsivePixels.size80,
  },
   title: {
    fontSize: fonts.size._50px,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: fonts.size._50px,
    fontWeight: "bold",
    color: "#FEC52E",
    marginBottom: fonts.size._40px,
  },
  button: {
    backgroundColor: "#FEC52E",
    paddingVertical: responsivePixels.size14,
    paddingHorizontal: responsivePixels.size50,
    borderRadius: responsivePixels.size30,
    marginTop:responsivePixels.size50
  },
  buttonText: {
    color: "#2B2C89",
    fontSize: fonts.size._18px,
    fontWeight: "bold",
  },
});
