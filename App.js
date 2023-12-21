import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import theme from "./src/utils/theme";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import InfoBar from "./src/components/InfoBar";
import DailyTemperature from "./src/components/DailyTemperature";

export default function App() {
  const [currentHour, setCurrentHour] = useState(Number(dayjs().format("HH")));
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [whetherDetails, setWhetherDetails] = useState({});
  const [whetherHistory, setWhetherHistory] = useState({});
  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status", status);

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    getWhether();
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
        console.log(response.data);
        setWhetherDetails(response.data);
        getHistory();
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

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
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 10 }}>
        <Text
          style={{
            fontSize: 26,
            color: theme.accent,
            fontStyle: "italic",
          }}
        >
          Good
          {currentHour > 5 && currentHour < 12
            ? " Morning"
            : currentHour > 12 && currentHour < 17
            ? " Afternoon"
            : currentHour > 17 && currentHour < 24
            ? " Evening"
            : " Night"}
        </Text>
      </View>
      {/* <View
        style={{
          minHeight: "30%",
          backgroundColor: theme.accent,
          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          padding: 10,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 75,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          {whetherDetails?.current?.temp_c}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: theme.light,
            fontStyle: "italic",
            marginBottom: 5,
          }}
        >
          {whetherDetails?.location?.name},{whetherDetails?.location?.region},
          {whetherDetails?.location?.country}
        </Text>
        <InfoBar whetherDetails={whetherDetails} />
      </View> */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "30%",
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
          <View
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
          </View>
        </View>
      </View>

      {loading ? (
        <View>
          <Text>Waiting...</Text>
        </View>
      ) : (
        <View
          style={{
            minHeight: "10%",
            backgroundColor: theme.accent,
            borderRadius: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            padding: 10,
            borderColor: theme.light,
            borderWidth: 0.5,
          }}
        >
          <DailyTemperature whetherHistory={whetherHistory} />
          {/* <View
            style={{
              minHeight: "10%",
              backgroundColor: theme.accent,
              borderRadius: 30,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              padding: 10,
            }}
          >
            
          </View> */}
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light,

    paddingTop: 40,
    paddingHorizontal: 10,
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
