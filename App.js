import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Picker,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import Header from "./components/header";
import RequestItem from "./components/RequestItem";
import { Swipeable } from "react-native-gesture-handler";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffChosen: false,
    };
  }

  deleteItemById = (id) => {
    const filteredData = this.state.currData.filter((item) => item._id !== id);
    this.setState({ currData: filteredData });
  };

  filterByStaff = (key) => {
    const filteredData = this.state.dataSource.filter(
      (item) => item.staff == key && item.completed == false
    );
    this.setState({ currData: filteredData });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/requests/")
      .then((response) => {
        this.setState({
          isLoading: false,
          dataSource: response.data,
          currData: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/staffs/")
      .then((response) => {
        this.setState({
          staffs: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  completedItem(item) {
    const request = {
      name: item.name,
      bed: item.bed,
      description: item.description,
      staff: item.staff,
      date: item.date,
      status: item.status,
      completed: true,
    };
    axios
      .post("http://localhost:5000/requests/update/" + item._id, request)
      .then((res) => console.log(res.data));
  }

  render() {
    const RightAction = () => (
      <View style={styles.rightAction}>
        <Text style={styles.textAction}>Completed!</Text>
      </View>
    );
    if (!this.state.staffChosen) {
      return (
        <View style={styles.container}>
          <Header item={this.state.selectedStaff} />
          <View style={styles.content}>
            <Text style={styles.pickerHeaderText}>Select Staff</Text>
            <View style={styles.pickerContainer}>
              <Picker
                data={this.state.staffs}
                selectedValue={this.state.selectedStaff}
                style={[styles.picker]}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue) => {
                  this.filterByStaff(itemValue);
                  this.setState({
                    selectedStaff: itemValue,
                    staffChosen: true,
                  });
                }}
              >
                <Picker.Item label="SELECT ONE" value="" />
                <Picker.Item label="Andrea" value="Andrea" />
                <Picker.Item label="Bohkee" value="Bohkee" />
                <Picker.Item label="Steve" value="Steve" />
                <Picker.Item label="Anush" value="Anush" />
              </Picker>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header item={this.state.selectedStaff} />
        <View style={styles.content}>
          <FlatList
            data={this.state.currData}
            renderItem={({ item }) => (
              <Swipeable
                renderRightActions={RightAction}
                onSwipeableRightOpen={() => {
                  this.deleteItemById(item._id);
                  this.completedItem(item);
                }}
              >
                <RequestItem item={item} />
              </Swipeable>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d3557",
  },
  content: {
    paddingTop: 0,
    paddingHorizontal: 10,
    marginTop: 0,
    borderRadius: 10,
  },
  textAction: {
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: 40,
    color: "#f1faee",
    alignSelf: "center",
  },
  rightAction: {
    backgroundColor: "#02c39a",
    justifyContent: "center",
    width: 100,
    flex: 1,
    flexDirection: "row",
    height: 120,
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
  },
  picker: {
    width: "95%",
    height: "85%",
    backgroundColor: "#457b9d",
    borderRadius: 5,
  },
  pickerItem: {
    color: "#f1faee",
    fontSize: 30,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  pickerContainer: {
    paddingTop: 10,
    alignItems: "center",
  },
  pickerHeaderText: {
    textAlign: "center",
    fontSize: 40,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

// color scheme:
// red #e63946,
// white #f1faee,
// baby blue #a8dadc,
// cerulean #457b9d,
// navy #1d3557

// fbed2720-176f-495d-b481-0725ef9a4fa3
