import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { CAMERA } from "expo-permissions";
import db from "../config";
export default class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scannedData: "",
      scanned: false,
      buttonState: "normal",
      scannedBookId: "",
      scannedStudentId: "",
    };
  }

  getCameraPermission = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
      scannedData: "scan the data",
      buttonState: id,
      scanned: false,
    });
  };
  handleBarCodeScanner = async ({ data }) => {
    const { buttonState } = this.state;
    if (buttonState === "BookId") {
      this.setState({
        scanned: true,
        scannedBookId: data,
        buttonState: "normal",
      });
    } else if (buttonState === "StudentId") {
      this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: "normal",
      });
    }
  };
  handleTransaction = () => {
    db.collection("books")
      .doc(this.state.scannedBookId)
      .get()
      .then((doc) => {
        console.log(doc.data());
        var book = doc.data();
        if (book.bookAvail) {
          this.initiateBookIssue();
        } else {
          this.initiateBookReturn();
        }
      });
  };
  render() {
    const camPermission = this.state.hasCameraPermission;
    if (this.state.buttonState !== "normal" && camPermission) {
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
          <Image
            source={require("../assets/booklogo.jpg")}
            // style={{ width: 100, height: 100 }}
          />
          <View style={styles.inputView}>
            <TextInput
              placeholder=" Book Id"
              style={styles.inputBox}
              value={this.state.scannedBookId}
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermission("BookId");
              }}
            >
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder=" Student Id"
              style={styles.inputBox}
              value={this.state.scannedStudentId}
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermission("StudentId");
              }}
            >
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.handleTransaction();
            }}
          >
            <Text>Submit</Text>
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
