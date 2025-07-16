import * as React from "react";
import { ScrollView, Text, StyleSheet, Pressable, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { analyzeImage } from '../services/api';
import {
  FontFamily,
  FontSize,
  Color,
  Border,
  Padding,
  Gap,
} from "../GlobalStyles";

const Component6 = () => {
  const navigation = useNavigation() as any;
  const route = useRoute();
  
  // 간단한 파라미터 추출
  const selectedImageUri = (route.params as any)?.selectedImageUri;
  const checklistData = (route.params as any)?.checklistData;

  const handleAIAnalysis = async () => {
    try {
      console.log('AI 분석 시작:', { selectedImageUri, checklistData });
 
      // 2. CNN 기반 상처 분석 요청
      const analysisResponse = await analyzeImage(selectedImageUri);
      const { stage, riskLevel, confidence, recommendations } = (analysisResponse as any).data;

      console.log('AI 분석 성공:', { stage, riskLevel, confidence, recommendations });

      // 3. Ailoading 화면으로 이동 (YOLO 결과와 분석 결과 모두 전달)
      navigation.navigate("Ailoading", { 
        selectedImageUri, 
        checklistData,
        analysisResult: {
          stage,
          riskLevel,
          confidence,
          recommendations
        }
      });
    } catch (error: any) {
      console.error('분석 실패 상세:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });

      let errorMessage = 'AI 분석 요청 중 오류가 발생했습니다.';
      
      // 구체적인 에러 메시지 제공
      if (error.response?.status === 403) {
        errorMessage = '서버 접근 권한이 없습니다. 관리자에게 문의하세요.';
      } else if (error.response?.status === 401) {
        errorMessage = '인증이 필요합니다. 다시 로그인해주세요.';
      } else if (error.response?.status === 404) {
        errorMessage = '분석 서비스를 찾을 수 없습니다.';
      } else if (error.response?.status >= 500) {
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = '요청 시간이 초과되었습니다. 네트워크를 확인해주세요.';
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = '네트워크 연결을 확인해주세요.';
      }

      Alert.alert(
        '분석 실패', 
        errorMessage,
        [
          {
            text: '취소',
            style: 'cancel'
          },
          {
            text: '다시 시도',
            onPress: handleAIAnalysis
          }
        ]
      );
    }
  };

  const handlePhotoChange = () => {
    navigation.navigate("PhotoOption");
  };

  const handleClose = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.scrollView1Content}
    >
      <View style={styles.aiParent}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.images11Parent}>
          <Image
            style={styles.images11}
            contentFit="cover"
            source={selectedImageUri ? { uri: selectedImageUri } : require("../assets/images-1-1.png")}
          />
          <Pressable 
            style={[styles.wrapper, styles.wrapperFlexBox]}
            onPress={handlePhotoChange}
          >
            <Text style={[styles.text, styles.ai1Typo]}>상처 사진 변경</Text>
          </Pressable>
        </View>
        <Pressable 
          style={[styles.aiWrapper, styles.wrapperFlexBox]}
          onPress={handleAIAnalysis}
        >
          <Text style={[styles.ai1, styles.ai1Typo]}>AI 상처분석 시작</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView1Content: {
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
    flex: 1,
  },
  wrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  ai1Typo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    letterSpacing: -0.4,
  },
  ai: {
    fontSize: FontSize.size_18,
    letterSpacing: -0.5,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    color: Color.colorMediumseagreen100,
    alignSelf: "stretch",
    marginTop: 20,
  },
  images11: {
    overflow: "hidden",
    height: 313,
    borderRadius: Border.br_10,
    alignSelf: "stretch",
    maxWidth: "100%",
    width: "100%",
    borderWidth: 1,
    borderColor: Color.colorMediumseagreen100,
  },
  text: {
    height: 24,
    width: 121,
    fontSize: FontSize.size_20,
    textTransform: "uppercase",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: Color.colorMediumseagreen100,
  },
  wrapper: {
    backgroundColor: Color.colorMintcream100,
    borderStyle: "solid",
    borderColor: Color.colorMediumseagreen100,
    borderWidth: 1,
    height: 64,
    paddingHorizontal: 107,
    paddingVertical: Padding.p_20,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: Border.br_10,
    alignSelf: "stretch",
  },
  images11Parent: {
    gap: Gap.gap_16,
    alignItems: "center",
    alignSelf: "stretch",
  },
  ai1: {
    height: 25,
    width: 147,
    fontSize: 21,
    color: Color.bgFooter,
    textAlign: "left",
  },
  aiWrapper: {
    backgroundColor: Color.colorMediumseagreen100,
    height: 70,
    paddingHorizontal: 94,
    paddingVertical: Padding.p_22,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: Border.br_10,
    alignSelf: "stretch",
    marginTop: -50,
  },
  aiParent: {
    width: "100%",
    maxWidth: 333,
    gap: 144,
    alignItems: "center",
  },
  scrollview: {
    backgroundColor: Color.bgFooter,
    flex: 1,
    maxWidth: "100%",
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    marginTop: 10,
    marginRight: -10,
  },
  closeText: {
    fontSize: FontSize.size_20,
    fontWeight: "bold",
    color: Color.colorBlack,
  },
});

export default Component6; 