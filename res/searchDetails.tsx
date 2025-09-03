import { Button, Image, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import { RouteProp, useNavigation } from "@react-navigation/native";
import moment from "moment";
import images from "./images";
import weather from "./weather";
import responsivePixels from "./responsivePixels";
import fonts from "./fonts";
import WeatherService from "./API/weatherService";

// type SearchDetailsRouteProp = RouteProp<RootStackParamList, "SearchDetails">;

const searchDetails = ({ route }: any) => {
  const { weatherData } = route.params;
  const navigation = useNavigation();
  const [hourlyWeather, setHourlyWeather] = useState([]);
  useEffect(() => {
    fetchWeather(weatherData?.coord?.lat, weatherData?.coord?.lon);
  }, []);

  const fetchWeather = async (lat: any, lon: any) => {
    try {
      
      const forecastRes = await WeatherService.getForecast(lat, lon);

      console.log("whole day data get", forecastRes.data)
      setHourlyWeather(forecastRes?.data?.list.slice(0, 8)); // first 24 hours

      console.log("Hourly Weather Data:", forecastRes?.data?.list);

    } catch (error) {
      console.error(error);
    }
  };


  console.log("weatherData in searchDetails:", weatherData);

  return (
    <LinearGradient
      colors={["#2C0E55", "#462283", "#7B3BA3"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >


      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 20, zIndex: 10 }}
        onPress={() => navigation.goBack()}>
        <Text style={[styles.arrowButton, { margin: 2 }]}>{"<"}</Text>
      </TouchableOpacity>
      {/* Weather Icon */}
      <Image
        source={images.weatherImage} // sunny-rain icon
        style={styles.weatherIcon}
        resizeMode="contain"
      />


      {/* Temperature Info */}
      <Text style={styles.temp}>{weatherData?.main?.temp}°</Text>
      <Text style={styles.precip}>{weatherData?.name}</Text>
      <Text style={styles.range}>Max: {weatherData?.main?.temp_max}°   Min: {weatherData?.main?.temp_min}°</Text>
      <Text style={styles.infoTitle}>☀ SUNRISE {moment.unix(weatherData?.sys?.sunrise).utcOffset(weatherData?.timezone / 60).format("hh:mm A")}</Text>
      {/* <Text style={styles.infoValue}>
            
            </Text> */}
      <Text style={styles.infoSub}>Sunset: {moment.unix(weatherData?.sys?.sunset).utcOffset(weatherData?.timezone / 60).format("hh:mm A")}</Text>
      {/* House Illustration */}
      <Image
        source={images.home}
        style={styles.house}
        resizeMode="stretch"
      />

      {/* Bottom Card */}
      <LinearGradient
        colors={["#A249C0", "#2D2D8D"]} // start: purple-pink, end: deep blue
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.subCardView}
      >
        <View style={styles.bottomCard}>

          {/* Date Row */}
          <View style={styles.dateRow}>
            <Text style={[styles.dateText, { color: "#fff" }]}>Today</Text>
            <Text style={[styles.dateText, { color: "#bbb" }]}>{moment(weatherData?.dt * 1000).format("YYYY-MM-DD HH:mm")}
            </Text>
          </View>

          {/* Hourly Forecast Row */}
          <View style={styles.hourRow}>

            {/* <Text style={styles.infoTitle}>☀ SUNRISE</Text>

          <Text style={styles.infoValue}>
            {moment.unix(weatherData?.sys?.sunrise).utcOffset(weatherData?.timezone / 60).format("hh:mm A")}
            </Text>
          <Text style={styles.infoSub}>Sunset: {moment.unix(weatherData?.sys?.sunset).utcOffset(weatherData?.timezone / 60).format("hh:mm A")}</Text> */}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.daysRow}
              scrollEventThrottle={25}
            >

              {hourlyWeather.map((item, index) => {

                return (

                  <View key={index} style={styles.hourItem}>
                    <Text style={styles.hourTemp}>{item?.main?.temp}°C</Text>
                    <Image source={images.sunRain} style={styles.hourIcon} resizeMode="stretch" />
                    <Text style={styles.hourTime}>{moment(item?.dt * 1000).format("HH:mm")}</Text>
                  </View>
                )
              })}

            </ScrollView>
          </View>

        </View>
      </LinearGradient>
    </LinearGradient>

  );
}
export default searchDetails
const styles = StyleSheet.create({
  infoValue: {
    color: "#fff",
    fontSize: fonts.size._18px,
    marginBottom: responsivePixels.size5,
  },
  infoSub: {
    color: "#bbb",
    fontSize: fonts.size._12px,
  },
  infoTitle: {
    color: "#ccc",
    fontSize: fonts.size._12px,
    marginBottom: responsivePixels.size5,
  },
  arrowButton: {
    fontSize: fonts.size._28px,
    color: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: responsivePixels.size10,
  },
weatherIcon: {
    width: responsivePixels.size200,
    height: responsivePixels.size150,
  },
  daysRow: {
      flexDirection: "row",
      gap: responsivePixels.size15,
      marginBottom: responsivePixels.size25,
    },
  temp: {
      fontSize: fonts.size._50px,
      fontWeight: "bold",
      color: "#fff",
      marginTop: responsivePixels.size10,
    },
  precip: {
    fontSize: fonts.size._24px,
    color: "#ddd",
    marginTop: responsivePixels.size5,
  },
  range: {
    fontSize: fonts.size._22px,
    color: "#bbb",
    marginBottom: responsivePixels.size20,
    fontWeight: 'bold'
  },
  house: {
    width: responsivePixels.size400,
    height: responsivePixels.size260,
  },
  bottomCard: {
    width: "90%",
    padding: responsivePixels.size10,

  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: responsivePixels.size15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
    paddingBottom: responsivePixels.size8,
  },
  dateText: {
    fontSize: fonts.size._20px,
    fontWeight: "bold"
  },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  hourItem: {
    alignItems: "center",
    marginHorizontal: 10
  },
  hourTemp: {
    color: "#fff",
    fontSize: fonts.size._14px,
    marginBottom: responsivePixels.size5,
    fontWeight: 'bold'
  },
  hourIcon: {
    width: responsivePixels.size35,
    height: responsivePixels.size35,
    marginBottom: responsivePixels.size5,
  },
  hourTime: {
    color: "#bbb",
    fontSize: fonts.size._14px,
  },
  gradient: {
    width: responsivePixels.size300,
    height: responsivePixels.size150,
    borderRadius: responsivePixels.size25,
  },
  subCardView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    borderRadius: responsivePixels.size25,
    marginBottom: responsivePixels.size30,

  }
})