import * as React from "react";
import { ScrollView, StyleSheet, View, Pressable, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Container from "../components/Container";
import FrameComponent from "../components/FrameComponent";
import { FontFamily, Color, Border, Gap, FontSize, Padding } from "../GlobalStyles";

const Component2 = () => {
  const navigation = useNavigation() as any;

  // 체크리스트 데이터 상태
  const [checklistData, setChecklistData] = React.useState({
    date: null as Date | null,
    bodyPart: null as string | null,
    classification: null as string | null,
    cause: null as string | null,
    directInput: ""
  });

  // FrameComponent state and logic (moved to top)
  const questions = [
    "피부가 빨개졌나요?",
    "부어 있나요?",
    "만지면 뜨겁게 느껴지나요?",
    "아프거나 따끔거리나요?",
    "움직이기 어렵거나 사용이 불편한가요?",
  ];
  const [answers, setAnswers] = React.useState<boolean[]>([false, false, false, false, false]);
  const handleToggle = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[idx] = !newAnswers[idx];
    setAnswers(newAnswers);
  };
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

  const handleCheckComplete = () => {
    navigation.navigate("PhotoOption", { checklistData }); // PhotoOption 화면으로 이동하면서 체크리스트 데이터 전달
  };

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={{ ...styles.scrollView1Content, paddingBottom: 350 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.frameParent}>
        <View style={{ zIndex: 3000 }}>
          <Container onDataChange={setChecklistData} />
        </View>
        <View style={{ zIndex: 2000 }}>
          <FrameComponent />
        </View>
        <Pressable 
          style={[styles.wrapper, styles.wrapperFlexBox]}
          onPress={handleCheckComplete}
        >
          <Text style={styles.buttonText}>체크완료</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView1Content: {
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingVertical: 29,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  wrapperFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  text: {
    height: 25,
    fontSize: 21,
    letterSpacing: -0.4,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorGray300, // 염증 증상 확인 타이틀용
    textAlign: "left",
  },
  buttonText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    textAlign: "left",
  },
  wrapper: {
    borderRadius: Border.br_10,
    backgroundColor: Color.colorMediumseagreen100,
    justifyContent: "center",
    paddingHorizontal: 32, // 한 줄로 나오도록 수정
    paddingVertical: 13, // 23 - 10 = 13
    alignItems: "center",
    alignSelf: "center",
  },
  frameParent: {
    gap: Gap.gap_16,
    flex: 1,
    paddingHorizontal: 0, // 좌우 패딩 제거
    alignItems: "stretch",
  },
  scrollview: {
    width: "100%",
    backgroundColor: Color.bgFooter,
    maxWidth: "100%",
    flex: 1,
  },
  // FrameComponent 스타일 추가 (겹치지 않게 주의)
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    columnGap: 12,
  },
  questionText: {
    fontSize: FontSize.size_16,
    color: Color.colorGray300,
    fontFamily: FontFamily.interMedium,
    flex: 1,
    textTransform: 'uppercase',
  },
  severityScale: {
    alignSelf: 'stretch',
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
    paddingTop: Padding.p_15,
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

export default Component2;
