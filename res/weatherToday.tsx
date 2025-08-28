import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import images from "./images";
import axios from "axios";
import moment from "moment";

const WeatherToday = () => {
  //  const [city, setCity] = useState("Ahmedabad");
  const city = "Ahmedabad"
  const [weather, setWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const API_KEY = "b0efb02d99a2d83b47796bf8b75d5dad";

  useEffect(() => {

    getWeather()
  }, [city]);
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      console.log("weather data",weather)
      console.log("weather data",response.data)
      {
        response?.data?.coord?.lat, response?.data?.coord?.lon &&
          (
            fetchWeather(response?.data?.coord?.lat, response?.data?.coord?.lon)
          )
      }
    } catch (error) {
      console.error(error);
      setWeather(null);
    }


  };

  const fetchWeather = async (lat: any,lon:any) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setHourlyWeather(response?.data?.list.slice(0, 8)); // first 24 hours

    } catch (error) {
      console.error(error);
    }
  };



  return (
    <LinearGradient
      colors={["#2C0E55", "#462283", "#7B3BA3"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >


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
            <Text style={[styles.dateText, { color: "#bbb" }]}>{moment(weather?.dt*1000).format("YYYY-MM-DD HH:mm")}
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
                    <Text style={styles.hourTime}>{moment(item?.dt*1000).format("HH:mm")}</Text>
                  </View>
                )
              })}

            </ScrollView>
          </View>

        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

export default WeatherToday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
  weatherIcon: {
    width: 200,
    height: 150,
  },
  daysRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 25,
  },
  temp: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  precip: {
    fontSize: 24,
    color: "#ddd",
    marginTop: 5,
  },
  range: {
    fontSize: 22,
    color: "#bbb",
    marginBottom: 20,
    fontWeight: 'bold'
  },
  house: {
    width: 400,
    height: 260,
  },
  bottomCard: {
    width: "90%",
    padding: 10,

  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
    paddingBottom: 8,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  hourItem: {
    alignItems: "center",
    marginHorizontal:10
  },
  hourTemp: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  hourIcon: {
    width: 35,
    height: 35,
    marginBottom: 5,
  },
  hourTime: {
    color: "#bbb",
    fontSize: 14,
  },
  gradient: {
    width: 300,
    height: 150,
    borderRadius: 25,
  },
  subCardView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    borderRadius: 25,
    marginBottom: 30

  }
});
