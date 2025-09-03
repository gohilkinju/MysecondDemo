import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "b0efb02d99a2d83b47796bf8b75d5dad"; 
        // `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`


  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
      setWeather(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>India Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={getWeather} />

      {weather && (
        <View style={styles.weatherBox}>
          <Text style={styles.info}>🌆 {weather.name}</Text>
          <Text style={styles.info}>🌡 {weather.main.temp}°C</Text>
          <Text style={styles.info}>💧 Humidity: {weather.main.humidity}%</Text>
          <Text style={styles.info}>🌤 {weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, width: "80%", marginBottom: 10, borderRadius: 5,color:"black" },
  weatherBox: { marginTop: 20, padding: 15, backgroundColor: "#e0f7fa", borderRadius: 8 },
  info: { fontSize: 18, marginVertical: 2,color:"black" }
});
