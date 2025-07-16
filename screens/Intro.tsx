import * as React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Color, Padding, FontFamily, Gap } from "../GlobalStyles";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const Intro = () => {
  const navigation = useNavigation() as any;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000); // 5초 후 Login 화면으로 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigation]);

  return (
    <ScrollView
      style={[styles.intro, styles.introLayout]}
      contentContainerStyle={styles.introScrollViewContent}
    >
      <View style={styles.frameParent}>
        <View style={styles.figureWrapper}>
          <Image
            style={[styles.figureIcon, styles.introLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-1-10.png")}
          />
        </View>
        <View style={styles.presentation}>
          <Text style={[styles.ai, styles.aiFlexBox]}>
            당신의 상처, AI가 말해줍니다.
          </Text>
          <Text style={[styles.text, styles.aiFlexBox]}>{`사진 한 장으로,
상처의 상태와 다음 행동을
알려주는 스마트 상처 케어.`}</Text>
        </View>
      </View>
      <Text style={styles.woundView}>WOUND VIEW</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  introScrollViewContent: {
    flexDirection: "row",
    paddingHorizontal: 58,
    paddingVertical: 262,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    height: 844,
  },
  introLayout: {
    maxWidth: "100%",
    width: "100%",
  },
  aiFlexBox: {
    textAlign: "center",
    color: Color.colorBlack,
  },
  figureIcon: {
    overflow: "hidden",
    height: 92,
    alignSelf: "stretch",
  },
  figureWrapper: {
    padding: Padding.p_10,
    alignSelf: "stretch",
  },
  ai: {
    fontSize: 25,
    lineHeight: 35,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
  },
  text: {
    fontSize: 17,
    lineHeight: 25,
    fontFamily: FontFamily.interRegular,
    alignSelf: "stretch",
  },
  presentation: {
    width: 192,
    gap: 17,
    alignItems: "center",
  },
  frameParent: {
    width: 273,
    gap: Gap.gap_12,
    zIndex: 0,
    alignItems: "center",
  },
  woundView: {
    position: "absolute",
    marginLeft: -127,
    top: 285,
    left: "50%",
    fontSize: 38,
    letterSpacing: -1.9,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    color: Color.colorMediumseagreen100,
    textAlign: "left",
    display: "none",
    zIndex: 1,
  },
  intro: {
    backgroundColor: Color.bgFooter,
    flex: 1,
  },
});

export default Intro;
