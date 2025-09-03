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
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import images from "./images";
import axios from "axios";
import navigationScreen from "./navigationScreen";
import { useNavigation } from "@react-navigation/native";
import responsivePixels from "./responsivePixels";
import fonts from "./fonts";
import WeatherService from "./API/weatherService";



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



  const getWeather = async () => {
    try {
      const weatherRes = await WeatherService.getWeatherByCity(city);
      setWeather(weatherRes.data);

    } catch (error) {
      console.error(error);
      setWeather(null);
    }
  };


  // const renderItem = ({ item }: any) => {
  //   console.log("FlatList Item:", item);

  //   return (
  //     <LinearGradient
  //       colors={["#6A0DAD", "#3B0A45"]}
  //       start={{ x: 0, y: 0 }}
  //       end={{ x: 1, y: 1 }}
  //       style={styles.card}
  //     >
  //       <View style={{ flex: 1 }}>
  //         <Text style={styles.temp}>{item?.main?.temp}°</Text>
  //         <Text style={styles.range}>
  //           H:{item.high}°  L:{item.low}°
  //         </Text>
  //         <Text style={styles.city}>{item.city}</Text>
  //         <Text style={styles.condition}>{item.condition}</Text>
  //       </View>
  //       <Image source={item.icon} style={styles.icon} resizeMode="contain" />
  //     </LinearGradient>
  //   );
  // };

  return (
    <LinearGradient
      colors={["#2C0E55", "#462283", "#7B3BA3"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.header}>Weather</Text>

        <TextInput
          style={styles.search}
          placeholder="Search for a city or airport"
          placeholderTextColor="#aaa"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={getWeather}
        />
        {weather && (
          <TouchableOpacity
            style={{ marginVertical: 30, marginTop: 50 }}
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
  container: {
    flex: 1,
    padding: responsivePixels.size15,
  },
  header: {
    fontSize: fonts.size._22px,
    color: "white",
    fontWeight: "600",
    justifyContent:'center',
    textAlign:'center',
    marginBottom: responsivePixels.size10,
  },
  search: {
    backgroundColor: "#2A1B3C",
    borderRadius: responsivePixels.size12,
    padding: responsivePixels.size12,
    color: "white",
    marginBottom: responsivePixels.size15,
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
    marginTop: -responsivePixels.size150,
  },
});

export default weatherSearch;
