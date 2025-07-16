import * as React from "react";
import { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import {
  FontSize,
  FontFamily,
  Color,
  Gap,
  Border,
  Padding,
} from "../GlobalStyles";

const questions = [
  "피부가 빨개졌나요?",
  "부어 있나요?",
  "만지면 뜨겁게 느껴지나요?",
  "아프거나 따끔거리나요?",
  "움직이기 어렵거나 사용이 불편한가요?",
];

const CustomCircleCheckbox = ({ checked, onPress }: { checked: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={{ marginLeft: 12 }} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: checked ? Color.colorMediumseagreen100 : '#bbb',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}
    >
      {checked && (
        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: Color.colorMediumseagreen100,
          }}
        />
      )}
    </View>
  </TouchableOpacity>
);

const FrameComponent = () => {
  const [answers, setAnswers] = useState<boolean[]>([false, false, false, false, false]);

  const handleToggle = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[idx] = !newAnswers[idx];
    setAnswers(newAnswers);
  };

  return (
    <View style={styles.investigationParent}>
      <View style={styles.investigation}>
        <Text style={styles.text}>염증 증상 확인</Text>
        <View style={styles.observationPanel}>
          <View style={styles.severityScale}>
            {questions.map((q, idx) => (
              <View style={styles.checkRow} key={q}>
                <Text style={styles.questionText}>{q}</Text>
                <CustomCircleCheckbox checked={answers[idx]} onPress={() => handleToggle(idx)} />
              </View>
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.text5}>
        *상태를 자세히 분석해 드리기 위한 문진입니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // 왼쪽 정렬로 변경
    marginBottom: 10, // 간격은 필요시 조정
    columnGap: 12, // 텍스트와 체크박스 사이 간격 확보
  },
  questionText: {
    fontSize: FontSize.size_16,
    color: Color.colorGray300,
    fontFamily: FontFamily.interMedium,
    flex: 1,
    textTransform: 'uppercase',
  },
  checkedCircle: {
    fontSize: 28,
    color: Color.colorMediumseagreen100,
    marginLeft: 8,
  },
  uncheckedCircle: {
    fontSize: 28,
    color: Color.colorGray200,
    marginLeft: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: Color.colorMediumseagreen100,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginLeft: 8,
    backgroundColor: Color.bgFooter,
  },
  selectedButton: {
    backgroundColor: Color.colorMediumseagreen100,
  },
  selectButtonText: {
    color: Color.colorMediumseagreen100,
    fontFamily: FontFamily.interMedium,
    fontSize: 15,
    fontWeight: '500',
  },
  selectedButtonText: {
    color: Color.bgFooter,
    fontWeight: '700',
  },
  attributeGridValue: {
    color: "#2c2c2c",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  attributeGriddropDownContainer: {
    minHeight: 35,
    height: 35,
    borderWidth: 0,
    borderColor: "",
  },
  attributeGriddropDownContent: {
    borderColor: "",
    borderWidth: 0,
  },
  attributeGrid: {
    zIndex: 6000,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    marginBottom: 6,
  },
  textTypo: {
    display: "flex",
    lineHeight: 35,
    letterSpacing: -0.5,
    fontSize: FontSize.size_16,
    height: 35,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    alignItems: "center",
    textAlign: "left",
    color: Color.colorGray300,
    textTransform: "uppercase",
  },
  text: {
    fontSize: FontSize.size_18,
    letterSpacing: -0.4,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    textAlign: "left",
    color: Color.colorGray300,
    textTransform: "uppercase",
    alignSelf: "stretch",
  },
  dropdownpicker: {
    minHeight: 35,
    height: 35,
    borderWidth: 0,
    borderColor: "",
  },
  attributeGrid1: {
    alignItems: "center",
  },
  text1: {
    width: 86,
  },
  text2: {
    width: 176,
  },
  text3: {
    width: 158,
  },
  text4: {
    width: 251,
  },
  severityScale: {
    width: 300,
    zIndex: 5000,
    gap: Gap.gap_1,
  },
  observationPanel: {
    borderRadius: Border.br_8,
    backgroundColor: Color.bgFooter,
    borderStyle: "solid",
    borderColor: Color.colorLightgray,
    borderWidth: 1,
    height: 190,
    paddingHorizontal: 15,
    paddingRight: 25, // 오른쪽만 10px 추가
    paddingTop: Padding.p_14,
    paddingBottom: 0, // 하단 패딩 최소화
    alignSelf: "stretch",
  },
  investigation: {
    gap: Gap.gap_6,
    alignSelf: "stretch",
  },
  text5: {
    fontSize: FontSize.size_11,
    letterSpacing: -0.2,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "left",
    textTransform: "uppercase",
    alignSelf: "stretch",
  },
  investigationParent: {
    gap: Gap.gap_12,
    alignSelf: "stretch",
  },
});

export default FrameComponent;
