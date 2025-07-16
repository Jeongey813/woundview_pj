import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontFamily, Color } from "../GlobalStyles";

export type TimestampType = {
  timeStamp?: string;
};

const Timestamp = ({ timeStamp = "7:20" }: TimestampType) => {
  return (
    <View style={styles.timestamp}>
      <Text style={styles.timestamp1}>{timeStamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timestamp1: {
    width: 18,
    fontSize: 8,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray100,
    textAlign: "left",
  },
  timestamp: {
    width: 17,
    height: 6,
    flexDirection: "row",
    paddingRight: 0,
    paddingBottom: 0,
  },
});

export default Timestamp;
