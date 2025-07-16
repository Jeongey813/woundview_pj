import * as React from "react";
import { ScrollView, Text, StyleSheet, View, Animated, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color } from "../GlobalStyles";
import { generateAdvice } from "../services/api";

const Component8 = () => {
  const navigation = useNavigation() as any;
  const route = useRoute();
  
  // 업로드된 이미지 URI와 체크리스트 데이터 받기
  const selectedImageUri = (route.params as any)?.selectedImageUri;
  const checklistData = (route.params as any)?.checklistData;
  const analysisResult = (route.params as any)?.analysisResult;

  const [advice, setAdvice] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "전문 AI가 상처를\n분석하고 있습니다";
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;
  const imageFadeAnim = useRef(new Animated.Value(0)).current;

  // 로딩/에러 UI 처리
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.bgFooter}}>
        <ActivityIndicator size="large" color={Color.colorMediumseagreen100} />
        <Text style={{marginTop: 16, color: Color.colorBlack}}>AI가 상처를 분석하고 있습니다...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.bgFooter}}>
        <Text style={{color: 'red', marginBottom: 16}}>{error}</Text>
        <Text style={{color: Color.colorBlack}}>잠시 후 다시 시도해 주세요.</Text>
      </View>
    );
  }

  useEffect(() => {
    // 타이핑 애니메이션
    let idx = 0;
    Animated.timing(imageFadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
    const typingInterval = setInterval(() => {
      setDisplayedText(fullText.slice(0, idx + 1));
      idx++;
      if (idx === fullText.length) {
        clearInterval(typingInterval);
      }
    }, 60);

    // 점들 순차 애니메이션
    const dotAnimation = () => {
      Animated.sequence([
        Animated.timing(dotAnim1, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim2, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim3, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        dotAnim1.setValue(0);
        dotAnim2.setValue(0);
        dotAnim3.setValue(0);
        setTimeout(dotAnimation, 1000);
      });
    };
    setTimeout(dotAnimation, 1500);

    // generateAdvice 호출 및 결과 화면 이동
    let cancelled = false;
    const fetchAdvice = async () => {
      if (analysisResult && checklistData) {
        setLoading(true);
        setError(null);
        try {
          const adviceRes = await generateAdvice({
            prediction: analysisResult.prediction,
            wound_width: analysisResult.wound_width,
            wound_height: analysisResult.wound_height,
            wound_area: analysisResult.wound_area,
            date: checklistData.date,
            bodyPart: checklistData.bodyPart,
            classification: checklistData.classification,
            cause: checklistData.directInput || checklistData.cause,
          }) as { data: { advice: string[] } };
          if (!cancelled) {
            setAdvice(adviceRes.data?.advice || []);
            navigation.replace("Result", {
              selectedImageUri,
              checklistData,
              analysisResult,
              advice: adviceRes.data?.advice || [],
            });
          }
        } catch (e) {
          if (!cancelled) setError("조언 생성에 실패했습니다. 다시 시도해 주세요.");
        } finally {
          if (!cancelled) setLoading(false);
        }
      }
    };
    fetchAdvice();

    return () => {
      clearInterval(typingInterval);
      cancelled = true;
    };
  }, [navigation, dotAnim1, dotAnim2, dotAnim3, imageFadeAnim, selectedImageUri, checklistData, analysisResult]);

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.scrollView1Content}
    >
      <View style={styles.aiParent}>
        <Text style={styles.ai}>{displayedText}</Text>
        <View style={styles.dotsContainer}>
          <Animated.Text style={[styles.dot, { opacity: dotAnim1 }]}>.</Animated.Text>
          <Animated.Text style={[styles.dot, { opacity: dotAnim2 }]}>.</Animated.Text>
          <Animated.Text style={[styles.dot, { opacity: dotAnim3 }]}>.</Animated.Text>
        </View>
        <Animated.View style={{opacity: imageFadeAnim}}>
          <Image
            style={styles.group11}
            contentFit="cover"
            source={require("../assets/group-1-1.png")}
          />
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView1Content: {
    flexDirection: "row",
    paddingHorizontal: 59,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
    flex: 1,
  },
  ai: {
    alignSelf: "stretch",
    fontSize: FontSize.size_30,
    letterSpacing: -0.6,
    lineHeight: 42,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    textAlign: "center",
  },
  group11: {
    width: 196,
    height: 206,
  },
  aiParent: {
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  dot: {
    fontSize: FontSize.size_30,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    marginHorizontal: 2,
  },
  scrollview: {
    width: "100%",
    backgroundColor: Color.bgFooter,
    flex: 1,
    maxWidth: "100%",
  },
});

export default Component8;
