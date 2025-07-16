import * as React from "react";
import { ScrollView, Text, StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FontFamily,
  Color,
  Padding,
  FontSize,
  Gap,
  Border,
} from "../GlobalStyles";

type RootStackParamList = {
  Result: undefined;
  RecordEdit: undefined;
  Home: undefined;
  Timelinemain: { 
    selectedImageUri?: string;
    recordDate?: string;
    recordClassification?: string;
    recordBodyPart?: string;
    recordEmergencyLevel?: string;
  };
  Timelinerecord: { 
    selectedImageUri?: string;
    checklistData?: {
      date?: Date;
      bodyPart?: string;
      classification?: string;
      cause?: string;
    };
  };
  Community: undefined;
  Mypage: undefined;
  // ... 다른 스크린들
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Component1 = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  
  // 기록 데이터 받기
  const selectedImageUri = (route.params as any)?.selectedImageUri;
  const recordDate = (route.params as any)?.recordDate;
  const recordClassification = (route.params as any)?.recordClassification;
  const recordBodyPart = (route.params as any)?.recordBodyPart;
  const recordEmergencyLevel = (route.params as any)?.recordEmergencyLevel;
  
  return (
    <ScrollView
      style={[styles.scrollview, styles.scrollviewLayout]}
      contentContainerStyle={styles.scrollView1Content}
    >
      <View style={{ ...styles.frameParent, marginTop: -30 }}>
        {/* 상단 headerContainer, text1, backButton 삭제됨 */}
        <View style={styles.frameGroup}>
          <View style={styles.frameContainer}>
            <View style={styles.frameView}>
              <View style={styles.group}>
                <Text style={[styles.text2, styles.textTypo2]}>호전그래프</Text>
                <Text style={[styles.text3, styles.textTypo1]}>
                  상처가 호전 중입니다.
                </Text>
              </View>
              <Image
                style={[styles.image23Icon, styles.scrollviewLayout]}
                contentFit="cover"
                source={require("../assets/image-23.png")}
              />
            </View>
            <View style={styles.frameParent1}>
              <View style={[styles.container, styles.parentFlexBox]}>
                <Text style={[styles.text4, styles.textTypo2]}>기록</Text>
                <TouchableOpacity style={styles.wrapper} onPress={() => {
                  // 현재 데이터를 Timelinerecord로 전달
                  const checklistData = {
                    date: recordDate ? new Date(recordDate.replace(/월|일/g, '').trim()) : undefined,
                    bodyPart: recordBodyPart,
                    classification: recordClassification,
                    cause: recordEmergencyLevel
                  };
                  
                  navigation.navigate('Timelinerecord', {
                    selectedImageUri,
                    checklistData
                  });
                }}>
                  <Text style={styles.text5}>기록편집</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.frameParent2}>
                <View style={styles.frameWrapper}>
                  <View style={styles.frameParent3}>
                    <View style={styles.parent1}>
                      <Text style={[styles.text6, styles.textTypo1]}>
                        {recordDate || "7월 9일"}
                      </Text>
                      <Text style={[styles.text7, styles.textTypo1]}>
                        {recordClassification && recordBodyPart ? `${recordClassification} / ${recordBodyPart}` : "열상 / 손"}
                      </Text>
                    </View>
                    <Image
                      style={styles.emptySpacerIcon}
                      contentFit="cover"
                      source={selectedImageUri ? { uri: selectedImageUri } : require("../assets/2.png")}
                    />
                    <View style={[
                      styles.frame, 
                      styles.frameFlexBox,
                      recordEmergencyLevel === "고위험" && { backgroundColor: "#FF6B6B" },
                      recordEmergencyLevel === "중위험" && { backgroundColor: "#FFA726" }
                    ]}>
                      <Text style={[
                        styles.text8, 
                        styles.textTypo,
                        (recordEmergencyLevel === "고위험" || recordEmergencyLevel === "중위험") && { color: "#FFFFFF" }
                      ]}>
                        {recordEmergencyLevel || "저위험"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.frameWrapper}>
                  <View style={styles.frameParent3}>
                    <View style={styles.parent1}>
                      <Text style={[styles.text6, styles.textTypo1]}>
                        7월 5일
                      </Text>
                      <Text style={[styles.text7, styles.textTypo1]}>
                        열상 / 손
                      </Text>
                    </View>
                    <Image
                      style={styles.emptySpacerIcon}
                      contentFit="cover"
                      source={require("../assets/2.png")}
                    />
                    <View style={[styles.wrapper1, styles.frameFlexBox]}>
                      <Text style={[styles.text11, styles.textTypo]}>
                        중위험
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.frameWrapper}>
                  <View style={styles.frameParent3}>
                    <View style={styles.parent1}>
                      <Text style={[styles.text6, styles.textTypo1]}>
                        7월 3일
                      </Text>
                      <Text style={[styles.text7, styles.textTypo1]}>
                        열상 / 손
                      </Text>
                    </View>
                    <Image
                      style={styles.emptySpacerIcon}
                      contentFit="cover"
                      source={require("../assets/2.png")}
                    />
                    <View style={[styles.wrapper1, styles.frameFlexBox]}>
                      <Text style={[styles.text11, styles.textTypo]}>
                        중위험
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.aiWrapper, styles.textFlexBox]}>
            <Text style={[styles.ai, styles.aiTypo, { position: 'relative', top: -15 }]}>
              AI 상처분석은 상처 처치 혹은 정보 전달을 위한 참고용으로 정확한
              진단과 치료를 위해서는 전문의료진의 도움을 받으시기 바랍니다.
            </Text>
          </View>
        </View>
      </View>
      {/* 하단 네비게이션 */}
      <View style={[styles.navigation, styles.actionAreaFlexBox, { height: 100, marginTop: 20 }]}> 
        <TouchableOpacity 
          style={[styles.navItems, styles.navFlexBox1]}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            style={[styles.home2Icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/home-2.png")}
          />
          <Text style={styles.text11}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItems1, styles.navFlexBox1]}
          onPress={() => {
            // 현재 화면이므로 아무것도 하지 않음
          }}
        >
          <Image
            style={[styles.timelineIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/timeline.png")}
          />
          <Text style={styles.text11}>타임라인</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItems2, styles.navFlexBox]}
          onPress={() => navigation.navigate("Community")}
        >
          <Image
            style={[styles.timelineIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/community.png")}
          />
          <Text style={styles.text11}>커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItems3, styles.navFlexBox]}
          onPress={() => navigation.navigate("Mypage")}
        >
          <Image
            style={styles.user1Icon}
            contentFit="cover"
            source={require("../assets/user-1.png")}
          />
          <Text style={styles.text11}>마이페이지</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView1Content: {
    flexDirection: "row",
    paddingHorizontal: 24,
    alignItems: "center",
    minHeight: 844,
    flexGrow: 1,
    justifyContent: "center",
  },
  scrollviewLayout: {
    maxWidth: "100%",
    width: "100%",
  },
  parentFlexBox: {
    gap: 0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo2: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    color: Color.colorBlack,
  },
  textTypo1: {
    letterSpacing: -0.3,
    alignSelf: "stretch",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  frameFlexBox: {
    paddingHorizontal: Padding.p_10,
    width: 59,
    paddingVertical: Padding.p_5,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textTypo: {
    width: 42,
    fontSize: FontSize.size_14,
    height: 17,
    letterSpacing: -0.3,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    textTransform: "uppercase",
    alignItems: "center",
  },
  aiTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  text: {
    width: 17,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -0.4,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_20,
    height: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    height: 50,
    paddingTop: 0,
    marginTop: -25,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  text1: {
    height: 27,
    width: '100%',
    fontSize: FontSize.size_22,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -0.4,
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  parent: {
    width: 205,
  },
  text2: {
    fontSize: 26,
    letterSpacing: -0.5,
    textAlign: "left",
    alignSelf: "stretch",
  },
  text3: {
    fontSize: FontSize.size_15,
    textAlign: "left",
    color: Color.colorBlack,
  },
  group: {
    width: 134,
    gap: 9,
  },
  image23Icon: {
    overflow: "hidden",
    height: 218,
    alignSelf: "stretch",
  },
  frameView: {
    gap: Gap.gap_4,
    alignSelf: "stretch",
  },
  text4: {
    width: 40,
    textAlign: "left",
    letterSpacing: -0.4,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_20,
    height: 24,
  },
  text5: {
    width: 54,
    color: Color.bgFooter,
    fontSize: FontSize.size_14,
    height: 17,
    letterSpacing: -0.3,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  wrapper: {
    width: 74,
    backgroundColor: Color.colorMediumseagreen100,
    paddingHorizontal: Padding.p_8,
    paddingVertical: Padding.p_5,
    height: 28,
    borderRadius: Border.br_8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    alignSelf: "stretch",
  },
  text6: {
    fontSize: FontSize.size_16,
    color: Color.colorGray300,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -0.3,
  },
  text7: {
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -0.3,
    color: Color.colorBlack,
  },
  parent1: {
    width: 53,
    gap: Gap.gap_6,
  },
  emptySpacerIcon: {
    width: 116,
    borderRadius: Border.br_10,
    height: 73,
  },
  text8: {
    color: Color.colorMediumseagreen100,
  },
  frame: {
    backgroundColor: Color.colorHoneydew,
  },
  frameParent3: {
    gap: 39,
    alignItems: "center",
    flexDirection: "row",
  },
  frameWrapper: {
    backgroundColor: Color.colorGray600,
    borderStyle: "solid",
    borderColor: Color.colorLightgray,
    borderWidth: 1,
    height: 90,
    paddingHorizontal: Padding.p_12,
    paddingVertical: Padding.p_8,
    borderRadius: Border.br_8,
    alignSelf: "stretch",
  },
  text11: {
    fontSize: 12,
    color: Color.colorDarkslategray100,
    textAlign: "center",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textTransform: "uppercase",
    alignSelf: "stretch",
  },
  wrapper1: {
    backgroundColor: Color.colorGainsboro100,
  },
  frameParent2: {
    gap: Gap.gap_10,
    alignSelf: "stretch",
  },
  frameParent1: {
    gap: Gap.gap_6,
    alignSelf: "stretch",
  },
  frameContainer: {
    gap: Gap.gap_28,
    alignSelf: "stretch",
    alignItems: "center",
  },
  ai: {
    width: 299,
    fontSize: FontSize.size_10,
    letterSpacing: -0.2,
    lineHeight: 15,
    color: Color.colorSilver200,
    textAlign: "left",
  },
  aiWrapper: {
    padding: Padding.p_10,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  frameGroup: {
    gap: 18,
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameParent: {
    width: "100%",
    maxWidth: 338,
    alignSelf: "center",
    gap: Gap.gap_28,
  },
  scrollview: {
    backgroundColor: Color.bgFooter,
    flex: 1,
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: Color.bgFooter,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Color.colorLightgray,
    paddingTop: 0,
  },
  actionAreaFlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navFlexBox: {
    gap: 3,
    alignItems: "center",
  },
  navFlexBox1: {
    gap: 2,
    alignItems: "center",
  },
  navItems: {
    width: 41,
    marginTop: -10,
  },
  navItems1: {
    width: 45,
    marginTop: -10,
  },
  navItems2: {
    width: 45,
    marginTop: -10,
  },
  navItems3: {
    width: 56,
    marginTop: -10,
  },
  home2Icon: {
    height: 41,
  },
  timelineIcon: {
    height: 45,
  },
  user1Icon: {
    width: 40,
    height: 40,
  },
  iconLayout: {
    overflow: "hidden",
    alignSelf: "stretch",
    maxWidth: "100%",
    width: "100%",
  },
});

export default Component1;
