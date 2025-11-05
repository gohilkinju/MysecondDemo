import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, PermissionsAndroid, Platform, ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import images from "./images";
import axios from "axios";
import moment from "moment";
import Geolocation from "@react-native-community/geolocation";
import responsivePixels from "./responsivePixels";
import fonts from "./fonts";
import WeatherService from "./API/weatherService";

const WeatherToday:React.FC = () => {
  const city = "Ahmedabad"
  const [weather, setWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(true); // progress state

  useEffect(() => {
    requestLocationPermission()
    getLocation()
  }, []);
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      (position) => {

        setLocation(position?.coords);
        console.log("location today", position?.coords?.latitude, position?.coords?.longitude );
        if (position?.coords?.latitude, position?.coords?.longitude) {
          getWeather(position?.coords?.latitude, position?.coords?.longitude)
        }

      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };



  const getWeather = async (lat: number, lng: number) => {
    try {
      console.log("fetch weather called", lat, lng);
      const weatherRes = await WeatherService.getCurrentWeather(lat, lng);
      setWeather(weatherRes?.data);
      console.log("current weather data", weatherRes?.data);
      {
        weatherRes?.data?.coord?.lat, weatherRes?.data?.coord?.lon &&
          (
            fetchWeather(weatherRes?.data?.coord?.lat, weatherRes?.data?.coord?.lon)
          )
      }

      setLoading(false); // hide progress when done
    } catch (error) {
      console.error(error);
      setWeather(null);
      // setLoading(false); // hide progress when done
    }
    finally {
      setLoading(false); // hide progress when done
    }


  };

  const fetchWeather = async (lat: any, lon: any) => {
    try {
      const forecastRes = await WeatherService.getForecast(lat, lon);

      console.log("whole day data get", forecastRes.data)
      setHourlyWeather(forecastRes?.data?.list.slice(0, 8)); // first 24 hours

    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={["#2C0E55", "#462283", "#7B3BA3"]} style={styles.container}>
        <ActivityIndicator size="large" color="#FEC52E" />
        <Text style={{ color: "#fff", marginTop: 20 }}>Loading Weather Data...</Text>
      </LinearGradient>
    );
  }


  return (
    <LinearGradient
      colors={["#2C0E55", "#462283", "#7B3BA3"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>

      {/* Weather Icon */}
      <Image
        source={images.weatherImage} // sunny-rain icon
        style={styles.weatherIcon}
        resizeMode="contain"
      />


      {/* Temperature Info */}
      <Text style={styles.temp}>{weather?.main?.temp}°</Text>
      <Text style={styles.precip}>{weather?.name}</Text>
      <Text style={styles.range}>Max: {weather?.main?.temp_max}°   Min: {weather?.main?.temp_min}°</Text>

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
            <Text style={[styles.dateText, { color: "#bbb" }]}>{moment(weather?.dt * 1000).format("YYYY-MM-DD HH:mm")}
            </Text>
          </View>

          {/* Hourly Forecast Row */}
          <View style={styles.hourRow}>

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
      </ScrollView>
    </LinearGradient>
  );
};

export default WeatherToday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: fonts.size._40px,
    fontWeight: "bold",
    color: "#fff",
    marginTop: responsivePixels.size10,
  },
  precip: {
    fontSize: fonts.size._20px,
    color: "#ddd",
    marginTop: responsivePixels.size5,
  },
  range: {
    fontSize: fonts.size._18px,
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
    fontSize: fonts.size._16px,
    fontWeight: "bold"
  },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  hourItem: {
    alignItems: "center",
    marginHorizontal: responsivePixels.size10
  },
  hourTemp: {
    color: "#fff",
    fontSize: fonts.size._12px,
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
    marginBottom: responsivePixels.size20,

  }
});
