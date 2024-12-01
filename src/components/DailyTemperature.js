import { StyleSheet, Text, View, FlatList } from "react-native";
import theme from "../utils/theme";
import dayjs from "dayjs";
import { FontAwesome5 } from "@expo/vector-icons";

export default function DailyTemperature({ whetherHistory }) {
  // console.log("==========", whetherHistory?.forecastday);
  let hours;
  if (!!whetherHistory) {
    let hour = whetherHistory?.forecastday?.map((item) => item?.hour);
    hours = hour?.map((item) => item);
  }

  return (
    <View
      style={{
        maxHeight: "15%",
      }}
    >
      {hours?.map((item, index) => {
        return (
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={item}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 8,
                  }}
                >
                  <View
                    key={index}
                    style={{
                      width: 100,
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",
                      backgroundColor: theme.secondary,
                      borderRadius: 30,

                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}
                  >
                    <FontAwesome5
                      name="temperature-high"
                      size={24}
                      color="black"
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: theme.main,
                        fontStyle: "italic",
                      }}
                    >
                      {item.temp_c}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: theme.main,
                        fontStyle: "italic",
                      }}
                    >
                      {dayjs(item.time).format("HH")}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  whetherDetailItem: {
    width: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: theme.accent,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  whetherDetailItemText: {
    fontSize: 10,
    fontWeight: 700,
    color: theme.light,
    fontStyle: "italic",
  },
});
