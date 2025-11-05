import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Modal } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const initialData = [
  { id: "1", name: "Red Silk Saree", price: "₹2500", desc: "Beautiful red silk saree with golden border.", image: "https://picsum.photos/200/300" },
  { id: "2", name: "Green Cotton Saree", price: "₹1800", desc: "Soft cotton saree for daily wear.", image: "https://picsum.photos/200/301" },
  { id: "3", name: "Blue Designer Saree", price: "₹3500", desc: "Modern designer saree with embroidery.", image: "https://picsum.photos/200/302" },
  // add 15–20 items like this...
];

const flatlistScreen=() =>{
  const [sarees, setSarees] = useState(initialData);
  const [selectedSaree, setSelectedSaree] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  


  // Delete saree
  const handleDelete = (id) => {
    setSarees(sarees.filter((item) => item.id !== id));
  };

  // Render right swipe action
  const renderRightActions = (id) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  // Render single saree item
  const renderItem = ({ item}:any) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <TouchableOpacity style={styles.card} onPress={() => setSelectedSaree(item)}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Saree Collection</Text>

      {/* {selectedSaree ? (
        <View style={styles.detailContainer}>
          <Image source={{ uri: selectedSaree.image }} style={styles.detailImage} />
          <Text style={styles.detailTitle}>{selectedSaree.name}</Text>
          <Text style={styles.detailPrice}>{selectedSaree.price}</Text>
          <Text style={styles.detailDesc}>{selectedSaree.desc}</Text>

          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedSaree(null)}>
            <Text style={styles.backText}>⬅ Back</Text>
          </TouchableOpacity>
        </View>
      ) : ( */}
        <FlatList
          data={sarees}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      {/* )} */}

       {/* Bottom Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Saree Name</Text>
            <Text style={styles.modalValue}>{selectedItem?.name}</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  screenTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#333" },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  info: { marginLeft: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "green" },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    marginVertical: 6,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
  detailContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  detailImage: { width: 250, height: 300, borderRadius: 15, marginBottom: 20 },
  detailTitle: { fontSize: 22, fontWeight: "bold" },
  detailPrice: { fontSize: 20, color: "green", marginVertical: 8 },
  detailDesc: { fontSize: 16, textAlign: "center", marginHorizontal: 20 },
  backButton: { marginTop: 20, padding: 10, backgroundColor: "#333", borderRadius: 8 },
  backText: { color: "#fff", fontSize: 16 },
   modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalValue: { fontSize: 16, color: "green", marginBottom: 20 },
  closeButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: { color: "#fff", fontSize: 16 },

});

export default flatlistScreen