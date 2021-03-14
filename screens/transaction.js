import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { CAMERA } from "expo-permissions";

export default class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scannedData: "",
      scanned: false,
      buttonState: "normal",
    };
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
      scannedData: "scan the data",
      buttonState: "clicked",
      scanned: false,
    });
  };
  handleBarCodeScanner = async ({ type, data }) => {
    this.setState({
      buttonState: "normal",
      scanned: true,
      scannedData: data,
    });
  };
  render() {
    const camPermission = this.state.hasCameraPermission;
    if (this.state.buttonState == "clicked" && camPermission) {
      return (
        <BarCodeScanner
          onBarCodeScanned={
            this.state.scanned ? undefined : this.handleBarCodeScanner
          }
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (this.state.buttonState === "normal") {
      return (
        <View style={styles.container}>
          <Text>
            {camPermission === true
              ? this.state.scannedData
              : "request camera permission"}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "lightblue",
              width: 100,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              this.getCameraPermission();
            }}
          >
            <Text>scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  displayText: {
    fontSize: 15,
    textDecorationLine: "underline",
  },
  scanButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },
  inputView: {
    flexDirection: "row",
    margin: 20,
  },
  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20,
  },
  scanButton: {
    backgroundColor: "#66BB6A",
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0,
  },
});
