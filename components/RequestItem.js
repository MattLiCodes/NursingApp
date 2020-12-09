import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import { format } from "date-fns";

export default function RequestItem({ item }) {
  const [status, setStatus] = useState(item.status);
  const request = {
    name: item.name,
    bed: item.bed,
    description: item.description,
    staff: item.staff,
    date: item.date,
    status: item.status,
    completed: item.completed,
  };

  const changeSeenStatus = () => {
    request.status = !request.status;
    axios
      .post("http://localhost:5000/requests/update/" + item._id, request)
      .then((res) => console.log(res.data));
  };

  const time = new Date(item.date);
  const formattedTime = format(time, "hh:mm aa");

  return (
    <View>
      <View style={styles.item}>
        <View style={styles.left}>
          <Text style={styles.text}>
            {item.name} | {item.bed}
          </Text>
          <Text style={styles.bodyText}>{formattedTime}</Text>
          <Text style={styles.descText}>{item.description}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            style={status ? styles.button : styles.clickedButton}
            onPress={() => {
              setStatus(!status);
              changeSeenStatus();
              console.log("Button Pressed.");
            }}
          >
            <Text style={styles.buttonText}>{status ? "Seen" : ""}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    height: 130,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    borderColor: "#bbb",
    backgroundColor: "#f1faee",
    borderWidth: 1,
    borderStyle: "solid",
  },
  bodyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1d3557",
  },
  descText: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontWeight: "bold",
    color: "#1d3557",
    fontSize: 25,
  },
  left: {
    width: 270,
  },
  right: {},
  button: {
    alignSelf: "flex-end",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#ffbe0b",
    borderRadius: 10,
  },
  clickedButton: {
    alignSelf: "flex-end",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#e63946",
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#f1faee",
    alignSelf: "center",
    fontSize: 30,
    fontFamily: "Avenir",
  },
});
