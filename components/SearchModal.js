import React from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
const windowHeight = Dimensions.get("window").height;


export const SearchModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.searchHeader}>
            <Ionicons name="search" size={24} color="#003859" />
            <TextInput
              style={styles.searchInput}
              placeholder="¿Hacia donde se dirige?"
              placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={24} color="#003859" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Sede norte del cauca</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Jamundí</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Menu item</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Menu item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",

  },
  modalContent: {
    backgroundColor: "#003859",
    padding: 20,
    width: "80%",
    height: "100%",
    paddingTop: 0.07 * windowHeight,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  menuItemText: {
    color: "#fff",
    fontSize: 16,
  },
});
