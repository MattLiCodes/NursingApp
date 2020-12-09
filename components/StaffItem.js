import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function StaffItem({ item }) {
  return (
    <View>
      <View>
        <Text style={styles.text}>{item.username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "#1d3557",
    fontSize: 30,
  },
});
