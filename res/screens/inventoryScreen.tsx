// screens/InventoryScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { useInventory } from '../context/InventoryContext';
import fonts from '../assets/fonts/fonts';
import { strings } from '../constants/strings';
import { hp, scaleFont } from '../constants/responsive';
import { colors } from '../constants/colors';
import { useOrderContext } from '../context/orderContext';
import axios from 'axios';

const inventoryScreen: React.FC = () => {
  const { items, fetchItems } = useOrderContext();

  const increment = async (id) => {
    try {
      const item = items.find((i) => i.id === id);
      if (!item) return;

      const updatedQuantity = item.quantity + 1;
      await axios.patch(`http://10.0.2.2:4000/items/${id}`, { quantity: updatedQuantity });
      ToastAndroid.show('Quantity increased ✅', ToastAndroid.SHORT);
      fetchItems();
    } catch (err) {
      console.log('❌ Error incrementing item:', err);
    }
  };

  const decrement = async (id) => {
    try {
      const item = items.find((i) => i.id === id);
      if (!item || item.quantity <= 0) return;

      const updatedQuantity = item.quantity - 1;
      await axios.patch(`http://10.0.2.2:4000/items/${id}`, { quantity: updatedQuantity });
      ToastAndroid.show('Quantity decreased ✅', ToastAndroid.SHORT);
      fetchItems();
    } catch (err) {
      console.log('❌ Error decrementing item:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 {strings.inventory}</Text>
      {items ?
        <FlatList
          data={items}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName} numberOfLines={2}>{item?.itemName}</Text>
              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => decrement(item.id)}
                >
                  <Text style={styles.btnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => increment(item.id)}
                >
                  <Text style={styles.btnText}>＋</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        /> :

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
          <Text style={styles.nodataText}>{strings.nodataFound}</Text>
        </View>}
    </View>
  );
};

export default inventoryScreen;

const styles = StyleSheet.create({
  nodataText: {
    fontSize: scaleFont(14),
    fontFamily: fonts.name.regular,
    color: colors.text
  },
  container: {
    flex: 1,
    backgroundColor: '#303030',
    padding: 16,
  },
  title: {
    color: colors.titleText,
    fontFamily: fonts.name.regular,
    fontSize: scaleFont(22),
    fontWeight: 'bold',
    marginBottom: hp(5),
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#424242',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  itemName: {
    color: 'white',
    fontSize: scaleFont(18),
    width: '60%',
    fontFamily: fonts.name.regular,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFB300',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  btnText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#303030',
  },
  quantity: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 10,
  },
});
