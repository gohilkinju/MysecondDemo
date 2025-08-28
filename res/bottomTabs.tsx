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
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home";

          if (route.name === "weatherToday") {
            iconName = "home-outline";
          } else if (route.name === "weatherForecast") {
            iconName = "person-outline";
          } else if (route.name === "weatherSearch") {
            iconName = "settings-outline";
          }

          return <Image source={images.airQuality}  style={{}} resizeMode="center"/>;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // hide top header
      })}
    >
      <Tab.Screen name="weatherToday" component={weatherToday} />
      <Tab.Screen name="weatherForecast" component={weatherForecast} />
      <Tab.Screen name="weatherSearch" component={weatherSearch} />
    </Tab.Navigator>
  );
}
