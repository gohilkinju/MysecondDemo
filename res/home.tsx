import { View, SafeAreaView, Dimensions, FlatList, Text, StyleSheet, Button } from "react-native"
import React from 'react'
import firstScreen from "./firstScreen";
import { useNavigation } from "@react-navigation/native";



const { width } = Dimensions.get('window');

const data = [
  { id: '1', title: 'Slide One', description: 'Welcome to the first slide', backgroundColor: '#4f83cc', },
  { id: '2', title: 'Slide Two', description: 'Here is some more info', backgroundColor: '#ffb3b3', },
  { id: '3', title: 'Slide Three', description: 'Keep sliding to explore', backgroundColor: '#00e600', },
  { id: '4', title: 'Slide Four', description: 'Keep sliding to explore', backgroundColor: '#ff99cc', },
];


const SlideItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Button title="Click me" onPress={() => navigation.navigate("secondScreen")} />
    </View>)
}
  ;

const home = () => {

  const name = "abcdefghijklmnopqrstuvwxyz"

  let reverseString = "";
  for (let i = name.length - 1; i >= 0; i--) {
    reverseString += name[i];
  }

  console.log("reverseString",reverseString)

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SlideItem item={item} />}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',

    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#eee',
    marginTop: 10,
  },
});
export default home;
