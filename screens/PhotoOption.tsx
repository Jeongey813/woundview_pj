import * as React from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import FrameComponent1 from "../components/FrameComponent1";
import GuidanceArea from "../components/GuidanceArea";
import { Color } from "../GlobalStyles";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Component3 = () => {
  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.scrollView1Content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.captureArea}>
        <FrameComponent1 />
        <GuidanceArea />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView1Content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Math.max(20, screenWidth * 0.05),
    paddingVertical: Math.max(20, screenHeight * 0.05),
    minHeight: screenHeight,
  },
  captureArea: {
    width: Math.min(332, screenWidth * 0.85),
    maxWidth: 332,
    gap: Math.max(Math.min(49, screenHeight * 0.06) - 20, 0),
    alignItems: "center",
  },
  scrollview: {
    width: "100%",
    backgroundColor: Color.bgFooter,
    flex: 1,
  },
});

export default Component3;
