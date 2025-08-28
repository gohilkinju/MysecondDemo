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
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import images from "./images";
import axios from "axios";



const weatherSearch = () => {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "b0efb02d99a2d83b47796bf8b75d5dad";


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
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
      setWeather(null);
    }
  };


  const renderItem = ({ item }: any) => {
    console.log("FlatList Item:", item);

    return (
      <LinearGradient
        colors={["#6A0DAD", "#3B0A45"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.temp}>{item?.main?.temp}°</Text>
          <Text style={styles.range}>
            H:{item.high}°  L:{item.low}°
          </Text>
          <Text style={styles.city}>{item.city}</Text>
          <Text style={styles.condition}>{item.condition}</Text>
        </View>
        <Image source={item.icon} style={styles.icon} resizeMode="contain" />
      </LinearGradient>
    );
  };

  return (
    <LinearGradient
      colors={["#2C0E55", "#462283", "#7B3BA3"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Text style={styles.header}>Weather</Text> */}


        <TextInput
          style={styles.search}
          placeholder="Search for a city or airport"
          placeholderTextColor="#aaa"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={getWeather}
        />
        {weather &&(
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
        {/* <Image source={item.icon} style={styles.icon} resizeMode="contain" /> */}
      </LinearGradient>)}

        {/* <FlatList
          data={weather}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        /> */}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 22,
    color: "white",
    fontWeight: "600",
    marginBottom: 10,
  },
  search: {
    backgroundColor: "#2A1B3C",
    borderRadius: 12,
    padding: 12,
    color: "white",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  range: {
    fontSize: 14,
    color: "#ddd",
    marginTop: -5,
  },
  city: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  condition: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 3,
  },
  icon: {
    width: 90,
    height: 90,
  },
});

export default weatherSearch;
