import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Platform, PermissionsAndroid, ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import images from "./images"; // make sure you add icons here
import axios from "axios";
import moment from "moment";
import Geolocation from "@react-native-community/geolocation";
import fonts from "./fonts";
import responsivePixels from "./responsivePixels";
import WeatherService from "./API/weatherService";


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
  const [offset, setoffset] = useState()
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true); // progress state


  const [aqData, setAqData] = useState<AirQualityData | null>(null);

  const aqiLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

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
        console.log("location", location);
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
    
      const weatherRes = await WeatherService.getCurrentWeather(lat, lng);
      setWeather(weatherRes.data);
      {
        weatherRes?.data?.coord?.lat, weatherRes?.data?.coord?.lon &&
          (
            fetchWeather(weatherRes?.data?.coord?.lat, weatherRes?.data?.coord?.lon)
          )
      }
      {
        weatherRes?.data?.coord?.lat, weatherRes?.data?.coord?.lon &&
          (
            getAirQuality(weatherRes?.data?.coord?.lat, weatherRes?.data?.coord?.lon)
          )
      }
    } catch (error) {
      console.error(error);
      setWeather(null);
    }
    finally {
      setLoading(false); // hide progress when done
    }
  };
  const fetchWeather = async (lat: any, lon: any) => {
    try {
      
      const forecastRes = await WeatherService.getForecast(lat, lon);

      console.log("whole day data get", forecastRes.data)
      setWeatherData(forecastRes?.data)

      setoffset(WeatherData?.city?.timezone)
      setHourlyWeather(forecastRes?.data?.list.slice(0, 24)); // first 24 hours

    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false); // hide progress when done
    }

  };

  const getAirQuality = async (lat: any, lon: any) => {
    try {
      
      const airRes = await WeatherService.getAirQuality(lat, lon);
      const data = airRes.data;
      console.log("Air Quality Data:", data.list);

      const aqi = data.list[0].main.aqi;

      const components = data.list[0].components;

      setAqData({ aqi, components });

    } catch (error) {
      console.error("Air Quality Error:", error);
    }
    finally {
      setLoading(false); // hide progress when done
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
{/* Weather Icon */}
      <Image
        source={images.weatherImage} // sunny-rain icon
        style={styles.weatherIcon}
        resizeMode="contain"
      />

      {/* Location and Temp Range */}
      <Text style={styles.location}>{weather?.name}</Text>
      <Text style={styles.range}>Max: {weather?.main?.temp_min}°   Min: {weather?.main?.temp_max}°</Text>

      {/* 7-Day Forecast */}
      <Text style={styles.sectionTitle}>3-Days Forecasts</Text>
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

          {hourlyWeather.length > 0 && hourlyWeather.map((item, index) => (

            <LinearGradient
              key={index}
              colors={["#A249C0", "#6A3AA8", "#2D2D8D"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.dayCard}
            >
              <Text style={styles.dayTemp}>{item?.main?.temp ? `${Math.round(item.main.temp)}°C` : "--"}</Text>
              <Image source={images.sunRain} style={styles.dayIcon} resizeMode="contain" />
              <Text style={styles.dayText}>{moment(item?.dt_txt).format("DD/MM/YY")}</Text>
              <Text style={styles.dayText}>{moment(item?.dt_txt).format("ddd")}</Text>
              <Text style={styles.dayText}>{moment(item?.dt_txt).format("hh:mm A")}</Text>
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
  weatherIcon: {
      width: responsivePixels.size200,
      height: responsivePixels.size150,
    },
  arrowButton: {
    fontSize:fonts.size._28px,
    color: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  location: {
    fontSize: fonts.size._20px,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  range: {
    color: "#bbb",
    textAlign: "center",
    marginBottom: responsivePixels.size20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: fonts.size._16px,
    marginBottom: responsivePixels.size10,
    fontWeight: "bold",
  },
  daysRow: {
    flexDirection: "row",
    gap: responsivePixels.size15,
    marginBottom:responsivePixels.size25,
  },
  dayCard: {
    width: responsivePixels.size70,
    height: responsivePixels.size175,
    borderRadius: responsivePixels.size90,
    paddingVertical: responsivePixels.size15,
    alignItems: "center",
    marginHorizontal: 1,
  },
  dayTemp: {
    color: "#fff",
    fontSize: fonts.size._16px,
    marginBottom: responsivePixels.size5,
  },
  arraowButton: {
    color: "#fff",
    fontSize: fonts.size._12px,
    fontWeight: "bold",
    justifyContent: 'center', alignSelf: 'center',
    padding: responsivePixels.size4,
  },
  dayIcon: {
    width: responsivePixels.size40,
    height: responsivePixels.size40,
    marginBottom: responsivePixels.size5,
  },
  dayText: {
    color: "#fff",
    fontSize: fonts.size._14px,
  },
  airCard: {
    alignSelf:"flex-start",
    marginTop: responsivePixels.size10,
    marginHorizontal: responsivePixels.size20,
    borderRadius: responsivePixels.size20,
    padding: responsivePixels.size10,
  },
  line: {
    borderRadius: responsivePixels.size20,
    height: responsivePixels.size1,
    marginVertical: responsivePixels.size10,
  },
  airTitle: {
    color: "#ccc",
    fontSize: fonts.size._16px,
    marginBottom: responsivePixels.size5,
  },
  airValue: {
    color: "#fff",
    fontSize: fonts.size._16px,
    marginBottom: responsivePixels.size8,
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
    borderRadius: responsivePixels.size15,
    padding: responsivePixels.size15,
    marginHorizontal: responsivePixels.size5,
  },
  infoTitle: {
    color: "#ccc",
    fontSize: fonts.size._12px,
    marginBottom: responsivePixels.size5,
  },
  infoValue: {
    color: "#fff",
    fontSize: fonts.size._12px,
    marginBottom: responsivePixels.size5,
  },
  infoSub: {
    color: "#bbb",
    fontSize: fonts.size._12px,
  },
  bottomBar: {
    marginTop: responsivePixels.size30,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLine: {
    width: responsivePixels.size30,
    height: responsivePixels.size3,
    backgroundColor: "#fff",
    marginVertical: responsivePixels.size2,
    borderRadius: responsivePixels.size2,
  },
});
