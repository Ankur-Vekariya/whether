import { StyleSheet, Text, View, FlatList } from "react-native";
import theme from "../utils/theme";
import dayjs from "dayjs";
import { FontAwesome5 } from "@expo/vector-icons";

export default function DailyTemperature({ whetherHistory }) {
  let hours;
  if (!!whetherHistory) {
    let hour = whetherHistory.forecastday.map((item) => item?.hour);
    hours = hour.map((item) => item);
  }

  return (
    <View
      style={{
        minHeight: "10%",
      }}
    >
      <View
      // style={{
      //   minHeight: "15%",
      // }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: theme.dark,
            fontStyle: "italic",
          }}
        >
          Every Hour
        </Text>
      </View>
      <View>
        {hours?.map((item, index) => {
          console.log("item", item);

          return (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={item}
              renderItem={({ item }) => {
                console.log(dayjs(item.time).format("HH"));
                return (
                  <View style={styles.whetherDetailItem} key={index}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: theme.light,
                        fontStyle: "italic",
                      }}
                    >
                      {item.temp_c}
                      {/* <FontAwesome5
                        name="temperature-high"
                        size={24}
                        color="black"
                      /> */}
                    </Text>
                    {/* <Ionicons name="water-outline" size={24} color="black" /> */}
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: theme.light,
                        fontStyle: "italic",
                      }}
                    >
                      {dayjs(item.time).format("HH")}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  whetherDetailItem: {
    width: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginHorizontal: 5,
    marginVertical: 10,
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
