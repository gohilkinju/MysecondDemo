import React, { useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { images } from "../assets/images/images";
import { strings } from "../constants/strings";
import fonts from "../assets/fonts/fonts";
import { hp, scaleFont } from "../constants/responsive";
import { useOrderContext } from "../context/orderContext";



const orderDetailsScreen:React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const routeOrder = route.params?.orders;
const [loading, setLoading] = useState(false);

  const { updateOrderStatus, orders } = useOrderContext();

  
  const order =
    orders.find((o) => o.orderId === routeOrder?.orderId) || routeOrder;


const isDelivered = order?.orderStatus === "Delivered";

const handleStatusChange = async () => {
   try {
      setLoading(true);
      await updateOrderStatus(order.orderId);
      ToastAndroid.show("✅ Order status updated!", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("❌ Failed to update status", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  }


    return(
        <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#303030" />

      <View style={styles.header}>
        <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🍽 {strings.orderDetails}</Text>
      </View>

      <Image 
      source={{ uri: order.image }} 
      style={styles.image} />

      {order ?
      <View style={styles.details}>
        <Text style={styles.itemName}>{order.itemName}</Text>
        <Text style={styles.category}>Category: {order.category}</Text>
        <Text style={styles.description}>{order.description}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>👤 Customer: {order.customerName}</Text>
          <Text style={styles.infoText}>🧾 Order ID: #{order.orderId}</Text>
          <Text style={styles.infoText}>📦 Quantity: {order.quantity}</Text>
          <Text style={styles.infoText}>💵 Price: ${order.price.toFixed(2)}</Text>
          <Text style={styles.infoText}>💰 Total: ${order.totalPrice.toFixed(2)}</Text>
          <Text
            style={[
              styles.status,
              { color: order.orderStatus === "Delivered" ? "green" : "#FF9500" },
            ]}
          >
            🚚 Status: {order.orderStatus}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, isDelivered && styles.buttonDisabled]}
          onPress={() => {
            handleStatusChange();
          }}
          disabled={isDelivered}
        >
          <Text style={styles.buttonText}>
            {isDelivered ? "✅ Delivered" : "Update Status"}
          </Text>
        </TouchableOpacity>
      </View>
      :
      <View style={{flex:1,justifyContent:"center",alignItems:"center",}}>
        <Text style={{fontSize:scaleFont(14),fontFamily:fonts.name.regular,
          color:colors.text
        }}>{strings.nodataFound}</Text>
      </View>}
    </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 10,
  },
  backArrow: {
    color: "#FF6B00",
    fontSize: scaleFont(22),
    fontWeight: "bold",
  },
  title: {
    fontSize: scaleFont(22),
    fontWeight: "700",
    color: "#FF6B00",
    textAlign: "center",
    alignSelf: "center",
    fontFamily:fonts.name.regular,
  },
  image: {
    width: "75%",
    height: hp(40),
    resizeMode:"stretch",
    alignSelf: "center",
    borderRadius: 16,
    marginTop:10,
    marginVertical: 12,
    elevation:10,
    padding:10,
    backgroundColor: colors.orderItem,
  },
  details: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  itemName: {
    fontSize: scaleFont(24),
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
    fontFamily:fonts.name.regular,
  },
  category: {
    fontSize: scaleFont(14),
    color: "#888",
    marginBottom: 8,
    fontFamily:fonts.name.regular,
  },
  description: {
    fontSize: scaleFont(15),
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
    fontFamily:fonts.name.regular,
  },
  infoBox: {
    
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  infoText: {
    fontSize: scaleFont(16),
    color: colors.text,
    marginVertical: 8,
    fontFamily:fonts.name.regular,
  },
  status: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    marginTop: 6,
    fontFamily:fonts.name.regular,
  },
  button: {
  backgroundColor: "#FF6B00",
  borderRadius: 10,
  paddingVertical: 12,
  marginTop: 18,
  alignItems: "center",
},
buttonDisabled: {
  backgroundColor: "#999",
},
buttonText: {
  color: "#fff",
  fontSize: scaleFont(16),
  fontWeight: "600",
  fontFamily:fonts.name.regular,
},
})
export default orderDetailsScreen;