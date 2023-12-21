import { StyleSheet, Text, View } from "react-native";
import theme from "../utils/theme";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function InfoBar({ whetherDetails }) {
  return (
    <View
      style={{
        minHeight: "10%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.whetherDetailItem}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          Humidity
        </Text>
        <Ionicons name="water-outline" size={24} color="black" />
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          {whetherDetails?.current?.humidity}
        </Text>
      </View>
      <View style={styles.whetherDetailItem}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          Cloud
        </Text>
        <AntDesign name="cloudo" size={24} color="black" />
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          {whetherDetails?.current?.cloud}
        </Text>
      </View>
      <View style={styles.whetherDetailItem}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          Wind
        </Text>
        <Feather name="wind" size={24} color="black" />
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          {whetherDetails?.current?.wind_kph}km/h
        </Text>
      </View>
      <View style={styles.whetherDetailItem}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          UV
        </Text>
        <Ionicons name="md-sunny-outline" size={24} color="black" />
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          {whetherDetails?.current?.uv}
        </Text>
      </View>
      <View style={styles.whetherDetailItem}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          Pressure
        </Text>
        <MaterialIcons name="compress" size={24} color="black" />
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.light,
            fontStyle: "italic",
          }}
        >
          {whetherDetails?.current?.pressure_mb}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  whetherDetailItem: {
    minWidth: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: theme.lightBlue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
  whetherDetailItemText: {
    fontSize: 10,
    fontWeight: 700,
    color: theme.light,
    fontStyle: "italic",
  },
});
