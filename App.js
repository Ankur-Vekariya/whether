import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import theme from "./src/utils/theme";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function App() {
  const [currentHour, setCurrentHour] = useState(Number(dayjs().format("HH")));

  useEffect(() => {
    setCurrentHour(Number(dayjs().format("HH")));
  }, [currentHour]);

  return (
    <View style={styles.container}>
      <View style={{ color: theme.ligh }}>
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
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
