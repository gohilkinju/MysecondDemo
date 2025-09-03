// BottomTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, View } from "react-native";
import images from "./images";
import weatherToday from "./weatherToday";
import weatherForecast from "./weatherForecast";
import weatherSearch from "./weatherSearch";

const Tab = createBottomTabNavigator();

export default function bottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconPath;

      if (route.name === 'weatherToday') {
        iconPath = focused ? images.airQuality : images.airQuality;
      } else if (route.name === 'weatherForecast') {
        iconPath = focused ? images.airQuality : images.airQuality;
      } else if (route.name === 'weatherSearch') {
        iconPath = focused ? images.airQuality : images.airQuality;
      }

      return <Image source={iconPath} style={{ width: size, height: size, tintColor: color }} />;
    },
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
  })}
    >
      <Tab.Screen name="weatherToday" component={weatherToday} />
      <Tab.Screen name="weatherForecast" component={weatherForecast} />
      <Tab.Screen name="weatherSearch" component={weatherSearch} />
    </Tab.Navigator>
  );
}
