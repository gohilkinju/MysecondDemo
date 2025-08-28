import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', time: '09:00 AM', details: 'Daily Standup Meeting' },
  { id: '2', time: '10:00 AM', details: 'Client Presentation' },
  { id: '3', time: '11:00 AM', details: 'Project Planning' },
  { id: '4', time: '12:00 PM', details: 'Lunch Break' },
];

const secondScreen = () => {
  const [expandedId, setExpandedId] = useState(null);

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setExpandedId(isExpanded ? null : item.id)}
      >
        <Text style={styles.timeText}>🕒 {item.time}</Text>
        {isExpanded && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>{item.details}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={expandedId}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  detailsText: {
    fontSize: 16,
    color: '#444',
  },
});

export default secondScreen;
