import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import theme from "./src/utils/theme";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import InfoBar from "./src/components/InfoBar";
import DailyTemperature from "./src/components/DailyTemperature";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [whetherDetails, setWhetherDetails] = useState({});
  const [whetherHistory, setWhetherHistory] = useState({});
  const [marinData, setMarinData] = useState({});

  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status", status);

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("location", location);
    getWhether();
    setLocation(location);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getWhether = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?q=${location?.coords.latitude}%2C${location?.coords.longitude}&key=04267816411547ae95b124656231902`
      )
      .then(function (response) {
        console.log("whetherData---------------------", response.data);
        setWhetherDetails(response.data);
        getHistory();
        getMarinData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // setTimeout(() => {
  //   getWhether()
  // }, 100);

  const getHistory = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/history.json?q=${
          location?.coords.latitude
        }%2C${location?.coords.longitude}&dt=${dayjs().format(
          "YYYY-MM-DD"
        )}&key=04267816411547ae95b124656231902`
      )
      .then(function (response) {
        console.log("history data", response.data);
        setWhetherHistory(response.data.forecast);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("history error", error);
        setErrorMsg(error);
      });
  };

  const getMarinData = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/astronomy.json?q=${
          location?.coords.latitude
        }%2C${location?.coords.longitude}&dt=${dayjs().format(
          "YYYY-MM-DD"
        )}&key=04267816411547ae95b124656231902`
      )
      .then(function (response) {
        console.log("history data", response.data);
        setMarinData(response.data.forecast);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("history error", error);
        setErrorMsg(error);
      });
  };

  return (
    <>
      <Image
        source={require("./assets/splash.png")}
        style={{
          height: "100%",
          width: "100%",
          opacity: 0.5,
          position: "absolute",
        }}
      />
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: theme.dark,
              fontStyle: "italic",
              textAlignVertical: "bottom",
            }}
          >
            {whetherDetails?.location?.name},{whetherDetails?.location?.region}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: theme.dark,
              fontStyle: "italic",
            }}
          >
            {dayjs().date()}-{dayjs().format("MMM")}-{dayjs().year()}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            minHeight: "30%",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 250,
              height: 250,
              borderRadius: 250 / 2,
              backgroundColor: theme.accent,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
              justifyContent: "center",
              alignItems: "center",
              borderColor: theme.light,
              borderWidth: 0.5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                getLocation();
              }}
              style={{
                width: 250 - 30,
                height: 250 - 30,
                borderRadius: 250 - 30 / 2,
                backgroundColor: theme.accent,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderColor: theme.light,
                borderWidth: 0.5,
              }}
            >
              <Text
                style={{
                  fontSize: 70,
                  fontWeight: 700,
                  color: theme.light,
                  fontStyle: "italic",
                }}
              >
                {whetherDetails?.current?.temp_c}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <InfoBar whetherDetails={whetherDetails} />
        {/* <DailyTemperature whetherHistory={whetherHistory} /> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: theme.dark,
              fontStyle: "italic",
              textAlignVertical: "bottom",
            }}
          >
            Other Locations
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.dark,
              fontStyle: "italic",
            }}
          >
            Add More
          </Text>
        </View>
        <View
          style={{
            minWidth: "100%",
            minHeight: "20%",
            borderRadius: 20,
            backgroundColor: theme.lightBlue,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: theme.dark,
                fontStyle: "italic",
                textAlignVertical: "bottom",
              }}
            >
              Other Locations
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.dark,
                fontStyle: "italic",
              }}
            >
              Add More
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.light,

    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
    // borderColor: "red",
    // borderWidth: 1,
  },
  image: {
    flex: 1,
    width: "50%",
    height: "50%",
    opacity: 0.8,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  CircleShape: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#FF9800",
  },
});
