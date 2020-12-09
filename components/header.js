import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Header({ item }) {
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={require("../assets/logoLong2.png")} />
      {/* <Text style={styles.title}>App Name</Text> */}
      <Text style={styles.subtitle}>Nurse {item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 190,
    borderRadius: 3,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#1d3557",
  },
  title: {
    textAlign: "center",
    color: "#f1faee",
    fontSize: 40,
    fontFamily: "Trebuchet MS",
    fontWeight: "bold",
  },
  image: {
    width: 270,
    height: 108,
  },
  subtitle: {
    alignSelf: "flex-start",
    color: "#f1faee",
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 15,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
});
