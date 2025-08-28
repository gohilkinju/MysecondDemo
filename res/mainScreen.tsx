import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from './images';
import { useNavigation } from '@react-navigation/native';
import WeatherToday from './weatherToday';

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
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: 400,
    height: 400,
    marginTop: 80,
  },
   title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FEC52E",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FEC52E",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop:50
  },
  buttonText: {
    color: "#2B2C89",
    fontSize: 18,
    fontWeight: "bold",
  },
});
