import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import theme from "./src/utils/theme";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { Image } from "expo-image";

export default function App() {
  const [currentHour, setCurrentHour] = useState(Number(dayjs().format("HH")));
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [whetherDetails, setWhetherDetails] = useState({});

  useEffect(() => {
    setCurrentHour(Number(dayjs().format("HH")));
  }, [currentHour]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getWhether = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?q=${location?.coords.latitude}%2C${location?.coords.longitude}&key=04267816411547ae95b124656231902`
      )
      .then(function (response) {
        console.log(response.data);
        setWhetherDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // getWhether();
    console.log("in if", location?.coords.latitude, location?.coords.longitude);
  }

  setTimeout(() => {
    if (location) {
      getWhether();
    }
  }, 10000);

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 10 }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          Good
          {currentHour > 5 && currentHour < 12
            ? " Morning"
            : currentHour > 12 && currentHour < 17
            ? " Afternoon "
            : currentHour > 17 && currentHour < 24
            ? " Evening"
            : " Night"}
        </Text>
      </View>
      <View
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
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 75,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
            paddingHorizontal: 10,
          }}
        >
          {whetherDetails?.current?.temp_c}
        </Text>
        <Image
          style={styles.image}
          source={require("./assets/sun.png")}
          placeholder={"sun"}
          contentFit="cover"
          transition={1000}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Number(dayjs().format("HH")) > 5 && Number(dayjs().format("HH")) < 12
        ? theme.light
        : Number(dayjs().format("HH")) > 12 && Number(dayjs().format("HH")) < 17
        ? theme.accent
        : Number(dayjs().format("HH")) > 17 && Number(dayjs().format("HH")) < 24
        ? theme.lightBlue
        : theme.dark,

    paddingTop: 40,
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    width: "50%",
    height: "50%",
  },
});
