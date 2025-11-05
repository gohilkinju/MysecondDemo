// WeatherScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import images from "./images";
import axios from "axios";
import navigationScreen from "./navigationScreen";
import { useNavigation } from "@react-navigation/native";
import responsivePixels from "./responsivePixels";
import fonts from "./fonts";
import WeatherService from "./API/weatherService";
import Voice from '@react-native-voice/voice';


const weatherSearch = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    if (city.trim().length > 2) {   // wait until user typed at least 3 chars
      const delayDebounce = setTimeout(() => {
        getWeather();
      }, 800); // wait 800ms after typing stops

      return () => clearTimeout(delayDebounce);
    }
  }, [city]);

  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        setCity(e.value[0]);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestMicPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone for speech recognition.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS handles it via Info.plist
  };

  const getWeather = async () => {
    try {
      const weatherRes = await WeatherService.getWeatherByCity(city);
      setWeather(weatherRes.data);

    } catch (error) {
      console.error(error);
      setWeather(null);
    }
  };

  const startListening = async () => {
    const hasPermission = await requestMicPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Microphone access is required to use speech recognition.');
      return;
    }
    await Voice.start('en-US');
  };



  return (
    <LinearGradient
      colors={["#2C0E55", "#462283", "#7B3BA3"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.header}>Weather</Text>

        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}> */}
          <View style={styles.search}>
          <TextInput
            style={styles.searchText}
            placeholder="Speak something..."
            placeholderTextColor="#aaa"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={getWeather}
          />
          {/* {city.length > 0 && ( */}
            <TouchableOpacity onPress={() =>{ 
            setCity("")
            setWeather(null)}
            } style={styles.clearBtn}>
              <Image source={images.ic_cross} resizeMode="contain" style={styles.crossIcon} />
            </TouchableOpacity>
          {/* )} */}
          <TouchableOpacity onPress={startListening} style={styles.iconContainer}>
            <Image
              source={images.mic} // sunny-rain icon
              style={styles.weatherIcon}
              resizeMode="contain"
            />


          </TouchableOpacity>
        </View>

        {weather && (
          <TouchableOpacity
            style={{ marginVertical: responsivePixels.size30, marginTop: responsivePixels.size60, }}
            onPress={() => navigation.navigate('searchDetails', { weatherData: weather })}
          >
            <LinearGradient
              colors={["#6A0DAD", "#3B0A45"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.temp}>{weather?.main?.temp}°</Text>
                <Text style={styles.range}>
                  H:{weather?.main?.temp_max}°  L:{weather?.main?.temp_min}°
                </Text>
                <Text style={styles.city}>{weather?.name}</Text>
                <Text style={styles.condition}>{weather?.weather?.description}</Text>
              </View>
              <Image source={images.sunRain} style={styles.icon} />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  clearBtn: {
    padding: 4,
  },
  crossIcon: {
    width: responsivePixels.size20,
    height: responsivePixels.size15,
  },
  weatherIcon: {
    width: responsivePixels.size20,
    height: responsivePixels.size15,
  },
  iconContainer: {
    marginLeft: 8,
  },
  container: {
    flex: 1,
    padding: responsivePixels.size15,
  },
  header: {
    fontSize: fonts.size._22px,
    color: "white",
    fontWeight: "600",
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: responsivePixels.size10,
  },
  search: {
    flexDirection: 'row',
    width: '98%',
    backgroundColor: "#FFFF",
    borderRadius: responsivePixels.size12,
    paddingHorizontal: responsivePixels.size12,
    alignItems: 'center',},
  searchText: {
    width: '80%',
    backgroundColor: "#FFFF",
    color: "black",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: responsivePixels.size20,
    padding: responsivePixels.size20,
    marginBottom: responsivePixels.size15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  temp: {
    fontSize: fonts.size._40px,
    fontWeight: "bold",
    color: "white",
  },
  range: {
    fontSize: fonts.size._14px,
    color: "#ddd",
    marginTop: -responsivePixels.size5,
  },
  city: {
    fontSize: fonts.size._16px,
    color: "white",
    marginTop: responsivePixels.size5,
  },
  condition: {
    fontSize: fonts.size._14px,
    color: "#ddd",
    marginTop: responsivePixels.size3,
  },
  icon: {
    width: responsivePixels.size150,
    height: responsivePixels.size200,
    marginTop: -responsivePixels.size110,
  },
});

export default weatherSearch;
