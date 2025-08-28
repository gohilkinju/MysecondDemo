import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import images from "./images"; // make sure you add icons here
import axios from "axios";
import moment from "moment";


type AirQualityData = {
  aqi: number;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
};
const weatherForecast = () => {
  const CARD_WIDTH = 90; // day card width + margin
  const scrollRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);

  const city = "Ahmedabad"
  const [weather, setWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [WeatherData, setWeatherData] = useState();
  const API_KEY = "b0efb02d99a2d83b47796bf8b75d5dad";
  const [offset,setoffset]=useState()




  
  const [aqData, setAqData] = useState<AirQualityData | null>(null);

  const aqiLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

  useEffect(() => {

    getWeather()
  }, [city]);
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`

      );
      setWeather(response.data);

      {
        response?.data?.coord?.lat, response?.data?.coord?.lon &&
          (
            fetchWeather(response?.data?.coord?.lat, response?.data?.coord?.lon)
          )
      }
       {
        response?.data?.coord?.lat, response?.data?.coord?.lon &&
          (
            getAirQuality(response?.data?.coord?.lat, response?.data?.coord?.lon)
          )
      }
    } catch (error) {
      console.error(error);
      setWeather(null);
    }


    console.log("weather data", weather?.coord?.lat, weather?.coord?.lon)
  };
  const fetchWeather = async (lat: any, lon: any) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      console.log("whole day data get", response.data)
      setWeatherData(response?.data)

       setoffset (WeatherData?.city?.timezone)
      setHourlyWeather(response?.data?.list.slice(0, 24)); // first 24 hours

    } catch (error) {
      console.error(error);
    }


  };

  const getAirQuality = async (lat:any,lon:any) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log("Air Quality Data:", data.list);

    // AQI Index (1 = Good, 5 = Very Poor)
    const aqi = data.list[0].main.aqi;

    // Pollutants (µg/m³)
    const components = data.list[0].components;

    setAqData({ aqi, components });

    // return { aqi, components };
  } catch (error) {
    console.error("Air Quality Error:", error);
  }
};

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: scrollX + offset,
        animated: true,
      });
      setScrollX(scrollX + offset);
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollX(e.nativeEvent.contentOffset.x);
  };

  {
    console.log("dataaaaaaaaa=========>>>>>>", hourlyWeather)
    { console.log("time ", WeatherData?.city?.sunrise, WeatherData?.city?.sunset) }
  }
  return (

    <LinearGradient
      colors={["#2C0E55", "#462283", "#7B3BA3"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {/* Location and Temp Range */}
      <Text style={styles.location}>{weather?.name}</Text>
      <Text style={styles.range}>Max: {weather?.main?.temp_min}°   Min: {weather?.main?.temp_max}°</Text>

      {/* 7-Day Forecast */}
      <Text style={styles.sectionTitle}>5-Days Forecasts</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: "center" }}
          onPress={() => scrollBy(-CARD_WIDTH)}>
          <Text style={[styles.arrowButton, { margin: 2 }]}>{"<"}</Text>
        </TouchableOpacity>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRow}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {[
            { day: "Mon", temp: "19°C", icon: images.sunRain },
            { day: "Tue", temp: "18°C", icon: images.cloudRain },
            { day: "Wed", temp: "18°C", icon: images.cloudRain },
            { day: "Thu", temp: "19°C", icon: images.sunRain },
            { day: "Fri", temp: "18°C", icon: images.cloudRain },
            { day: "Sat", temp: "18°C", icon: images.cloudRain },
            { day: "Sun", temp: "18°C", icon: images.cloudRain },
          ].map((item, index) => (

            <LinearGradient
              key={index}
              colors={["#A249C0", "#6A3AA8", "#2D2D8D"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.dayCard}
            >

              <Text style={styles.dayTemp}>{item.temp}</Text>
              <Image source={item.icon} style={styles.dayIcon} resizeMode="contain" />
              <Text style={styles.dayText}>{item.day}</Text>
            </LinearGradient>
          ))}
        </ScrollView>
        {/* Right Arrow */}
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: "center" }}
          onPress={() => scrollBy(CARD_WIDTH)}>
          <Text style={[styles.arrowButton, { paddingStart: 5 }]}>{">"}</Text>
        </TouchableOpacity>

      </View>
      {/* Air Quality Card */}
      <LinearGradient

        colors={["#A249C0", "#6A3AA8", "#2D2D8D"]}
        useAngle={true}
        angle={135}
        style={styles.airCard}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Image source={images.airQuality} style={{ height: 15, width: 15, marginHorizontal: 4 }} resizeMode="cover" />
          <Text style={styles.airTitle}>AIR QUALITY</Text></View>
          <Text style={styles.airValue}>{aqData?.aqi} ({aqiLevels[aqData?.aqi - 1]})</Text>
     
        <LinearGradient
          colors={["#6A3AA8", "#2D2D8D"]}
          useAngle={true}
          angle={135}
          style={styles.line}
        ></LinearGradient>
        {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.seeMore}>See more</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 20 }}>{">"}</Text>
        </TouchableOpacity> */}
      </LinearGradient>

      {/* Sunrise and UV Index */}
      <View style={styles.bottomRow}>
        <LinearGradient colors={["#3E2C8B", "#6A3AA8"]} style={styles.infoCard}>
          <Text style={styles.infoTitle}>☀ SUNRISE</Text>

          <Text style={styles.infoValue}>
            {moment.unix(WeatherData?.city?.sunrise).utcOffset(WeatherData?.city?.timezone / 60).format("hh:mm A")}
            </Text>
          <Text style={styles.infoSub}>Sunset: {moment.unix(WeatherData?.city?.sunset).utcOffset(WeatherData?.city?.timezone / 60).format("hh:mm A")}</Text>
        </LinearGradient>

        <TouchableOpacity
        // onPress={()=>navigation.navigate('weatherSearch')}
        >
          <LinearGradient colors={["#3E2C8B", "#6A3AA8"]} style={styles.infoCard}>
            <Text style={styles.infoTitle}>☀ humidity</Text>
            <Text style={styles.infoValue}>{weather?.main?.humidity}</Text>
            

          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Bottom Menu Bar */}
      {/* <View style={styles.bottomBar}>
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
      </View> */}
    </LinearGradient>
  );
};

export default weatherForecast;

const styles = StyleSheet.create({
  arrowButton: {
    fontSize: 28,
    color: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  location: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  range: {
    color: "#bbb",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  daysRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 25,
  },
  dayCard: {
    width: 70,
    height: 140,
    borderRadius: 90,
    paddingVertical: 15,
    alignItems: "center",
    marginHorizontal: 1,
  },
  dayTemp: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  arraowButton: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    justifyContent: 'center', alignSelf: 'center',
    padding: 4,
  },
  dayIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  dayText: {
    color: "#fff",
    fontSize: 14,
  },
  airCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  line: {
    borderRadius: 20,
    height: 1,
    marginVertical: 10,
  },
  airTitle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5,
  },
  airValue: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  seeMore: {
    color: "#fff",
    fontSize: 14,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoCard: {
    flex: 1,
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
  },
  infoTitle: {
    color: "#ccc",
    fontSize: 12,
    marginBottom: 5,
  },
  infoValue: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
  infoSub: {
    color: "#bbb",
    fontSize: 12,
  },
  bottomBar: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLine: {
    width: 30,
    height: 3,
    backgroundColor: "#fff",
    marginVertical: 2,
    borderRadius: 2,
  },
});
