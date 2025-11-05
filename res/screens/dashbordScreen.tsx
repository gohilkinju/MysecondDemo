import React, { useEffect, useState } from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { images } from "../assets/images/images";
import orderDetailsScreen from "./orderDetailsScreen";
import fonts from "../assets/fonts/fonts";
import { hp, scaleFont, wp } from "../constants/responsive";
import { strings } from "../constants/strings";
import apiServices from "../API/apiServices";
import { useNavigation } from "@react-navigation/native";
import { useOrderContext } from "../context/orderContext";
// import { useOrderContext } from "../context/OrderContext";

type Order = {
  orderId: number;
  customerName: string;
  itemName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  category: string;
  orderStatus: string;
  description: string;
  image: string;
};
const dashbordScreen:React.FC=()=>{
  const navigation = useNavigation();
  
    // const [orders, setOrders] = useState([]);
  const { orders } = useOrderContext();

const renderItem = ({ item }:{ item: Order }) => (
  console.log("item in dashbord",item),
 <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('orderDetailsScreen',{orders:item})}
 >  
 <View style={{backgroundColor:'black',width:"100%",alignItems:"center"}}>
      <Image
      source={images.dish1}
      // source={{ uri: item.image }} 
      style={styles.image}  /></View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {item.itemName}
        </Text>
        <Text style={styles.price}>{"$"}{item.totalPrice}</Text>
      </View>
    </TouchableOpacity>
  );
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#303030" />
      <Text style={styles.title}>🍽 {strings.foodOrders}</Text>
      
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 5 }}
      />
    </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background
  },
  title: {
    fontSize: scaleFont(26),
    fontWeight: 'bold',
    marginBottom: hp(10),
    color: colors.titleText,
    textAlign: 'center',
    fontFamily:fonts.name.regular
  },

  row: {
    justifyContent: "space-between",
  },
  card: {
    borderRadius: 5,
    marginBottom: hp(2),
    width: "48%",
    overflow: "hidden",
    elevation: 2,
    alignItems:"center",
    padding:2
  },
  image: {
    height: hp(20),
    width: wp(35),
    borderRadius:180,
    
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    color: colors.text,
    fontSize: scaleFont(14),
    fontWeight: "600",
    marginBottom: hp(1),
    textAlign:"center",
    fontFamily:fonts.name.regular
  },
  price: {
    color: colors.text,
    fontSize: scaleFont(16),
    fontWeight: "bold",
    textAlign:"center",
    fontFamily:fonts.name.regular
  },
});
export default dashbordScreen;