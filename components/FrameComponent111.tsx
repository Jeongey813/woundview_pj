import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import {
  Padding,
  Color,
  Border,
  FontFamily,
  FontSize,
  Gap,
} from "../GlobalStyles";

const FrameComponent111 = () => {
  return (
    <View style={styles.frameParent}>
      <View style={styles.parent}>
        <Text style={[styles.text, styles.textText]}>주의 사항</Text>
        <View style={[styles.wrapper, styles.wrapperFlexBox]}>
          <Text
            style={[styles.text1, styles.textText]}
          >{`• 상처 부위를 자극하지 않도록 주의
• 물에 닿은 경우 즉시 건조 및 소독
• 이물질이 들어가지 않도록 청결 유지
• 연고나 밴드 교체는 하루 1회 또는 오염 시`}</Text>
        </View>
      </View>
      <View style={[styles.frameGroup, styles.wrapperFlexBox]}>
        <Pressable style={[styles.container, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.textTypo]}>기록 저장</Text>
        </Pressable>
        <Pressable style={[styles.frame, styles.frameFlexBox]}>
          <Text style={[styles.text3, styles.textTypo]}>재진단 하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textText: {
    textAlign: "left",
    textTransform: "uppercase",
  },
  wrapperFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  frameFlexBox: {
    paddingVertical: Padding.p_20,
    justifyContent: "center",
    height: 63,
    backgroundColor: Color.colorMediumseagreen100,
    width: 160,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_10,
  },
  textTypo: {
    color: Color.bgFooter,
    height: 22,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    letterSpacing: -0.4,
    fontSize: FontSize.size_18,
  },
  text: {
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    letterSpacing: -0.4,
    fontSize: FontSize.size_18,
    textAlign: "left",
    textTransform: "uppercase",
    alignSelf: "stretch",
  },
  text1: {
    fontSize: 14,
    letterSpacing: -0.6,
    lineHeight: 22,
    fontFamily: FontFamily.interRegular,
    color: Color.colorTomato,
    textAlign: "left",
    textTransform: "uppercase",
  },
  wrapper: {
    backgroundColor: Color.colorGray600,
    borderStyle: "solid",
    borderColor: Color.colorTomato,
    borderWidth: 1,
    height: 121,
    paddingHorizontal: Padding.p_19,
    paddingVertical: Padding.p_16,
    borderRadius: Border.br_10,
    alignItems: "center",
    flexDirection: "row",
  },
  parent: {
    gap: 9,
    alignSelf: "stretch",
  },
  text2: {
    width: 73,
  },
  container: {
    paddingHorizontal: 43,
  },
  text3: {
    width: 89,
  },
  frame: {
    paddingHorizontal: Padding.p_36,
  },
  frameGroup: {
    gap: Gap.gap_15,
  },
  frameParent: {
    width: 335,
    alignItems: "flex-end",
    gap: Gap.gap_18,
  },
});

export default FrameComponent111;
