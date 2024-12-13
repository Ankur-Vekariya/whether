import { StyleSheet, Text, View } from "react-native";
import theme from "../utils/theme";
import dayjs from "dayjs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function InfoBar({ whetherDetails }) {
  let data = [
    {
      name: "Humidity",
      icon: <Ionicons name="water-outline" size={24} color="black" />,
      value: whetherDetails?.current?.humidity,
    },
    {
      name: "cloud",
      icon: <AntDesign name="cloudo" size={24} color="black" />,
      value: whetherDetails?.current?.humidity,
    },
    {
      name: "Wind",
      icon: <Feather name="wind" size={24} color="black" />,
      value: whetherDetails?.current?.wind_kph,
    },
    {
      name: "UV",
      icon: <FontAwesome name="arrows" size={24} color="black" />,
      value: whetherDetails?.current?.uv,
    },
    {
      name: "Pressure",
      icon: <MaterialIcons name="compress" size={24} color="black" />,
      value: whetherDetails?.current?.pressure_mb,
    },
  ];
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 15,
        padding: 10,
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: theme.secondary,
        borderRadius: 30,
      }}
    >
      {data?.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              minWidth: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              {item.name}
            </Text>
            {item.icon}
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: theme.dark,
                fontStyle: "italic",
              }}
            >
              {item.value}
            </Text>
          </View>
        );
      })}
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
