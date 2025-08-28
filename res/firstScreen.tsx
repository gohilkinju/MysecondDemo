import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native"
import React from 'react'

const { height } = Dimensions.get('window');
const firstScreen =()=>{
    
    const items = [
        { id: 1, color: '#FF5733', text: 'Slide 1' },
        { id: 2, color: '#33FF57', text: 'Slide 2' },
        { id: 3, color: '#3357FF', text: 'Slide 3' },
        { id: 4, color: '#F333FF', text: 'Slide 4' },
      ];
    
      const renderItem = ({ item }) => (
        <View style={[styles.slide, { backgroundColor: item.color }]}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      );
    
      return (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled
          showsVerticalScrollIndicator={false}
        />
      );
    };
    
    const styles = StyleSheet.create({
      slide: {
        width: '100%',
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
      },
    });
    
export default firstScreen