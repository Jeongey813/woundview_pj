import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import {
  Color,
  FontFamily,
  FontSize,
  Gap,
  Border,
  Padding,
} from "../GlobalStyles";

const GuidanceArea = () => {
  return (
    <View style={styles.guidanceArea}>
      <View style={styles.frameParent}>
        <View style={styles.parent}>
          <Text style={[styles.text, styles.textFlexBox]}>방법안내</Text>
          <Text style={[styles.text1, styles.textFlexBox]}>
            <Text
              style={styles.text2}
            >{`1.단색배경과 밝은 좀여 아래에서 상처가 잘 보이게 촬영해주세요.
2.팬드, 폼이나 연고는 상처를 가리지 않도록 제거해주세요.
3.초점이 흔들려 상처가 선명하지 않을경우 재촬영해 주세요.
4.상처 크기를 판별하기 위해서 `}</Text>
            <Text style={[styles.text2, styles.redText]}>{`신용카드(체크,교통등)를
   상처 옆에 두고 같이`}</Text>
            <Text style={[styles.text2, styles.redText]}>
              {" "}
              촬영해 주세요.(카드정보는 가려주세요.)
            </Text>
          </Text>
        </View>
        <View style={styles.woundDisplay}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/-1.png")}
          />
          <View style={[styles.exampleContainer, styles.text5FlexBox]}>
            <Text style={[styles.text5, styles.text5FlexBox]}>예시사진</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textFlexBox: {
    textAlign: "left",
    textTransform: "uppercase",
    alignSelf: "stretch",
  },
  text5FlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Color.colorTomato,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    letterSpacing: -0.3,
    fontSize: FontSize.size_16,
    textAlign: "left",
  },
  text2: {
    fontFamily: FontFamily.interRegular,
  },
  redText: {
    color: Color.colorTomato,
  },
  text1: {
    fontSize: FontSize.size_11,
    letterSpacing: -0.2,
    lineHeight: 17,
  },
  parent: {
    gap: Gap.gap_6,
    alignSelf: "stretch",
  },
  icon: {
    borderRadius: Border.br_8,
    maxWidth: "100%",
    overflow: "hidden",
    height: 207,
    width: "100%",
    alignSelf: "stretch",
  },
  text5: {
    height: 19,
    width: 61,
    color: Color.colorSilver300,
    textAlign: "center",
    display: "flex",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    letterSpacing: -0.3,
    fontSize: FontSize.size_16,
    textTransform: "uppercase",
    justifyContent: "center",
  },
  exampleContainer: {
    padding: Padding.p_10,
    flexDirection: "row",
  },
  woundDisplay: {
    width: 244,
    alignItems: "center",
  },
  frameParent: {
    width: 287,
    gap: Gap.gap_32,
    alignItems: "center",
  },
  guidanceArea: {
    borderRadius: Border.br_5,
    backgroundColor: Color.colorWhitesmoke100,
    height: 416,
    paddingHorizontal: Padding.p_20,
    paddingVertical: Padding.p_8,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
});

export default GuidanceArea;
