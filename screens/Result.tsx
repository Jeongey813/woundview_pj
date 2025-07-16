import * as React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import Ellipse2 from "../assets/ellipse-2.svg";
import FrameComponent111 from "../components/FrameComponent111";
import Logo from "../components/Logo";
import Rectangle1 from "../assets/rectangle-1.svg";
import Timestamp from "../components/Timestamp";
import Logo11 from "../assets/logo1.svg";
import Frame101 from "../assets/frame-101.svg";
import Frame102 from "../assets/frame-102.svg";
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  Gap,
  Padding,
} from "../GlobalStyles";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  UploadComplete: undefined;
  Timelinerecord: { selectedImageUri?: string; checklistData?: any };
  PhotoOption: undefined;
  Home: undefined;
  Result: { selectedImageUri?: string; checklistData?: any };
  // ... 다른 스크린들
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Component = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  
  // 업로드된 이미지 URI와 체크리스트 데이터 받기
  const selectedImageUri = (route.params as any)?.selectedImageUri;
  const checklistData = (route.params as any)?.checklistData;
  
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      type: 'ai',
      text: '안녕하세요! 저는 상처 상태를 분석하고 관리에 도움을 주는 AI 헬퍼예요. 궁금한 점이 있다면 언제든지 물어보세요! 😊',
      timestamp: '7:20'
    },
    {
      id: 2,
      type: 'user',
      text: '열상은 어떤 상처예요?',
      timestamp: '7:20'
    }
  ]);
  const [inputText, setInputText] = React.useState('');
  const scrollViewRef = React.useRef<ScrollView>(null);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        text: inputText.trim(),
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // 스크롤을 맨 아래로 이동
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Enter') {
      sendMessage();
    }
  };

  const handleClose = () => {
    navigation.navigate("Home"); // Home으로 이동
  };

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.scrollView1Content}
    >
      <View style={styles.frameParent}>
        <View style={[styles.parent, styles.groupFlexBox]}>
          <TouchableOpacity onPress={() => navigation.navigate('UploadComplete')}>
            <Text style={[styles.text, styles.textFlexBox]}>{`<`}</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.text1}>분석결과</Text>
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.frameGroup}>
          <View style={styles.frameContainer}>
            <View style={styles.frameView}>
              <View style={styles.frameParent1}>
                <View style={styles.frameParent2}>
                  <View style={[styles.group, styles.groupFlexBox]}>
                    <Text style={styles.text2}>열상 / 손</Text>
                    <Text style={styles.text3}>2025.07.05</Text>
                  </View>
                  <View style={styles.aiAndImageWrapper}>
                    <Text style={styles.ai}>
                      {`AI 상처분석은 상처 처치 혹은 정보 전달을 위한 참고용으로 정확한 진단과 치료를 
위해서는 전문의료진의 도움을 받으시기 바랍니다.`}
                    </Text>
                    <ImageBackground
                      style={styles.resultImage}
                      resizeMode="cover"
                      source={selectedImageUri ? { uri: selectedImageUri } : require("../assets/frame79.png")}
                    >
                      <View style={styles.frameItem} />
                    </ImageBackground>
                  </View>
                </View>
                <View style={styles.ellipseParent}>
                  <Ellipse2 style={styles.frameChild} width={16} height={16} />
                  <Text style={[styles.text4, styles.textTypo]}>저위험</Text>
                </View>
                <View style={[styles.cmWrapper, styles.wrapperLayout]}>
                  <Text style={[styles.cmContainer, styles.exTypo]}>
                    <Text style={styles.text5}>{`이 상처는 `}</Text>
                    <Text style={styles.text5}>열상</Text>
                    <Text style={styles.text5}>{`으로 크기는 약 `}</Text>
                    <Text style={styles.text5}>1.2× 0.4cm</Text>
                    <Text style={styles.text5}>{`입니다.\n현재 이미지로는 조직의 손상 깊이나 내부 상태를 정확히\n판단할 수 없으나, 피부의 열림 정도, 출혈 및 염증 반응의\n외형적 상태를 고려할 때 `}</Text>
                    <Text style={styles.text5}>저위험 등급의 상처</Text>
                    <Text style={styles.text5}>{`로 보입니다.\n감염 가능성을 완전히 배제할 수 없으므로, `}</Text>
                    <Text style={styles.text5}>{`기초적인\n소독과 보호 조치`}</Text>
                    <Text style={styles.text5}>{`를 취하는 것을 추천합니다.\n`}</Text>
                    <Text style={styles.text5}>회복 예상 기간:</Text>
                    <Text style={styles.text5}>{` `}</Text>
                    <Text style={styles.text5}>5~7일 이내</Text>
                    <Text style={styles.text5}>{`로 무리 없이 회복될\n가능성이 높습니다.`}</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <Text style={[styles.text17, styles.textTypo]}>관리가이드</Text>
              <View style={[styles.exWrapper, styles.wrapperLayout]}>
                <Text
                  style={[styles.ex, styles.exTypo]}
                >{`• 흐르는 깨끗한 물 또는 생리식염수로 세척
• 순한 소독제(포비돈 요오드 등)로 1차 소독
• 멸균 거즈 또는 밴드로 상처 보호
• 연고 사용 시, 시카/판테놀 계열 흉터 완화 제품 추천
   (ex. 마데카솔, 리엔케이 시카밤)
• 자극, 마찰, 물 접촉 피하기`}</Text>
              </View>
            </View>
            
            {/* 주의사항 */}
            <View style={styles.warningContainer}>
              <Text style={[styles.warningTitle, styles.warningTitleRed]}>주의사항</Text>
              <View style={styles.warningWrapperRed}>
                <Text style={[styles.warningText, styles.warningTextRed]}>
                  • 상처 부위를 자극하지 않도록 주의{'\n'}
                  • 물에 닿은 경우 즉시 건조 및 소독{'\n'}
                  • 이물질이 들어가지 않도록 청결 유지{'\n'}
                  • 연고나 밴드 교체는 하루 1회 또는 오염 시
                </Text>
              </View>
            </View>
            
            {/* 버튼 영역 */}
            <View style={styles.buttonContainer}>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.recordButton} onPress={() => navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  })
                )}>
                  <Text style={styles.recordButtonText}>기록저장</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rediagnosisButton} onPress={() => navigation.navigate('PhotoOption')}>
                  <Text style={styles.rediagnosisButtonText}>재진단하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 챗봇 섹션 */}
      <View style={styles.chatSection}>
        <View style={[styles.frameWrapper, styles.footer4ShadowBox, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
          <View style={styles.logoWrapper}>
            <Logo shape="emblem only" />
          </View>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, marginLeft: 12 }}>
            상처 전문 AI 헬퍼 챗봇
          </Text>
        </View>
        
        {/* 메시지 영역 */}
        <View style={styles.chatMessagesContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesScrollView}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <View key={message.id} style={styles.messageContainer}>
                {message.type === 'ai' ? (
                  <View style={styles.aiMessageContainer}>
                    <View style={styles.aiMessageMetaRow}>
                      <View style={styles.aiWCircle}>
                        <Text style={styles.aiWText}>W</Text>
                      </View>
                      <View style={styles.aiMessageBubble}>
                        <Text style={styles.aiMessageText}>{message.text}</Text>
                      </View>
                      <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.userMessageContainer}>
                    <View style={styles.userMessageBubble}>
                      <Text style={styles.userMessageText}>{message.text}</Text>
                    </View>
                    <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
        
        {/* 입력 영역 */}
        <View style={styles.chatFooterBox}>
          <View style={styles.chatInputContainer}>
            <TextInput
              style={styles.chatInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="질문을 입력하세요....."
              placeholderTextColor="#444"
              onSubmitEditing={sendMessage}
              onKeyPress={handleKeyPress}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView1Content: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    paddingVertical: 25,
    marginTop: 30,
  },
  groupFlexBox: {
    gap: 0,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    fontSize: FontSize.size_18,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    color: Color.colorBlack,
    textTransform: "uppercase",
    letterSpacing: -0.4,
  },
  wrapperLayout: {
    borderRadius: Border.br_10,
    alignSelf: "stretch",
  },
  exTypo: {
    lineHeight: 22,
    fontSize: 14,
    textAlign: "left",
    letterSpacing: -0.6,
    textTransform: "uppercase",
  },
  text: {
    height: 24,
    width: 17,
    fontSize: FontSize.size_20,
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: -0.4,
    justifyContent: "center",
  },
  text1: {
    height: 27,
    fontSize: 20,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    width: 83,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    textTransform: "uppercase",
    letterSpacing: -0.4,
  },
  parent: {
    width: "100%",
    marginTop: 10,
  },
  text2: {
    height: 35,
    width: 106,
    fontSize: 29,
    letterSpacing: -0.6,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    textTransform: "uppercase",
  },
  text3: {
    height: 18,
    fontSize: FontSize.size_15,
    letterSpacing: -0.3,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    width: 83,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    textTransform: "uppercase",
  },
  group: {
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: -10,
  },
  ai: {
    fontSize: FontSize.size_10,
    color: Color.colorSilver100,
    textAlign: "left",
    letterSpacing: -0.3,
    alignSelf: "stretch",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  aiAndImageWrapper: {
    width: "100%",
  },
  frameParent2: {
    gap: Gap.gap_4,
    alignSelf: "stretch",
  },
  frameChild: {},
  text4: {
    height: 22,
    width: 52,
    alignItems: "center",
    display: "flex",
  },
  ellipseParent: {
    gap: 5,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  frameParent1: {
    gap: -17,
    alignSelf: "stretch",
  },
  frameItem: {
    width: 172,
    backgroundColor: Color.colorGray600,
    borderColor: Color.colorMediumseagreen100,
    borderWidth: 2,
    height: 65,
    transform: [
      {
        rotate: "180deg",
      },
    ],
    borderStyle: "solid",
  },
  rectangleWrapper: {
    height: 205,
    paddingHorizontal: 84,
    paddingVertical: 67,
    justifyContent: "center",
    alignItems: "center",
  },
  frameView: {
    gap: 9,
    alignSelf: "stretch",
    alignItems: "center",
  },
  text5: {
    fontFamily: FontFamily.interRegular,
  },
  cmContainer: {
    color: Color.colorDarkslategray300,
  },
  cmWrapper: {
    backgroundColor: Color.colorMintcream200,
    height: 201,
    paddingHorizontal: 21,
    paddingVertical: 11,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  frameContainer: {
    gap: Gap.gap_14,
    alignSelf: "stretch",
  },
  text17: {
    alignSelf: "stretch",
  },
  ex: {
    color: Color.colorDarkslategray200,
    fontFamily: FontFamily.interRegular,
  },
  exWrapper: {
    borderColor: Color.colorGainsboro100,
    borderWidth: 1,
    height: 160,
    paddingHorizontal: Padding.p_22,
    paddingVertical: 13,
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.bgFooter,
  },
  container: {
    gap: Gap.gap_6,
    alignSelf: "stretch",
  },
  frameGroup: {
    gap: 23,
    alignSelf: "stretch",
  },
  frameParent: {
    width: 338,
    gap: Gap.gap_28,
  },
  scrollview: {
    width: "100%",
    flex: 1,
    maxWidth: "100%",
    backgroundColor: Color.bgFooter,
  },
  warningContainer: {
    width: 338,
    gap: Gap.gap_6,
    alignSelf: "stretch",
  },
  warningTitle: {
    height: 27,
    fontSize: FontSize.size_22,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    width: 83,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    textTransform: "uppercase",
    letterSpacing: -0.4,
  },
  warningWrapper: {
    backgroundColor: Color.colorMintcream200,
    height: 160,
    paddingHorizontal: 21,
    paddingVertical: 11,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  warningText: {
    fontFamily: FontFamily.interRegular,
  },
  buttonContainer: {
    width: 338,
    gap: Gap.gap_14,
    alignSelf: "stretch",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recordButton: {
    width: 160,
    height: 50,
    backgroundColor: Color.colorMediumseagreen100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  recordButtonText: {
    color: Color.bgFooter,
    fontSize: 18,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  rediagnosisButton: {
    width: 160,
    height: 50,
    backgroundColor: Color.colorMediumseagreen100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rediagnosisButtonText: {
    color: Color.bgFooter,
    fontSize: 18,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  warningTitleRed: {
    fontSize: FontSize.size_18,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    color: Color.colorTomato,
    textTransform: "uppercase",
    letterSpacing: -0.4,
  },
  warningWrapperRed: {
    borderRadius: Border.br_10,
    alignSelf: "stretch",
    backgroundColor: Color.bgFooter,
    height: 120,
    paddingHorizontal: Padding.p_22,
    paddingVertical: 13,
    borderColor: Color.colorTomato,
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  warningTextRed: {
    lineHeight: 22,
    fontSize: 14,
    textAlign: "left",
    letterSpacing: -0.6,
    textTransform: "uppercase",
    fontFamily: FontFamily.interRegular,
    color: Color.colorTomato,
    alignSelf: "flex-start",
  },
  
  // 챗봇 스타일
  chatSection: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    position: "relative",
    minHeight: 400,
  },
  footer4ShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    width: 337,
  },
  hTypo: {
    color: Color.bgFooter,
    fontSize: 20,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  messageFlexBox: {
    gap: 5,
    justifyContent: "flex-end",
  },
  bubblePosition: {
    gap: 8,
    paddingBottom: 26,
    paddingTop: 13,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    zIndex: 0,
    flexDirection: "row",
  },
  messagesFlexBox: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  logoPosition1: {
    left: 0,
    zIndex: 1,
  },
  logoPosition: {
    gap: Gap.gap_10,
    position: "absolute",
  },
  textAreaPosition: {
    overflow: "hidden",
    zIndex: 0,
    width: "100%",
  },
  userMessageSpaceBlock: {
    paddingLeft: 16,
    alignItems: "flex-end",
  },
  logoLayout: {
    height: 40,
    width: 40,
    alignItems: "center",
  },
  logoWrapper: {
    width: 52,
    borderRadius: 26,
    height: 52,
    paddingHorizontal: Padding.p_5,
    paddingVertical: 4,
    backgroundColor: Color.colorPaleturquoise,
    alignItems: "center",
    flexDirection: "row",
  },
  aiChat: {
    width: 189,
    textAlign: "left",
    height: 24,
  },
  frameWrapper: {
    shadowColor: Color.colorGray500,
    borderTopLeftRadius: Border.br_10,
    borderTopRightRadius: Border.br_10,
    backgroundColor: Color.colorMediumseagreen100,
    height: 72,
    paddingHorizontal: 37,
    paddingVertical: 9,
    zIndex: 0,
  },
  rectangleWrapperChat: {
    zIndex: 1,
    padding: Padding.p_10,
    alignSelf: "stretch",
  },
  helloSystemMessage: {
    fontSize: FontSize.size_12,
    lineHeight: 17,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    color: Color.colorBlack,
    flex: 1,
  },
  messages: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    zIndex: 0,
    flex: 1,
  },
  bubbleSenderChild: {
    bottom: -18,
    borderRadius: 3,
    position: "absolute",
  },
  timestampWrapper: {
    bottom: -16,
    left: 27,
    zIndex: 2,
    position: "absolute",
  },
  bubbleSender: {
    borderBottomRightRadius: 10,
    backgroundColor: Color.colorHoneydew,
    paddingRight: 13,
    paddingLeft: 16,
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  brandColor: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 83,
    position: "absolute",
    backgroundColor: Color.colorPaleturquoise,
  },
  logoIcon: {
    zIndex: 1,
  },
  logo: {
    bottom: -24,
    borderRadius: 66,
    padding: 6,
    height: 40,
    width: 40,
    alignItems: "center",
    left: 0,
    zIndex: 1,
    flexDirection: "row",
  },
  systemMessage: {
    paddingBottom: 16,
    paddingHorizontal: 17,
    alignSelf: "stretch",
  },
  systemMessageWrapper: {
    width: 311,
    top: 78,
    left: 11,
    zIndex: 2,
    position: "absolute",
    padding: Padding.p_10,
  },
  text2Chat: {
    fontSize: 12,
    color: Color.text1,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
  },
  messages1: {
    zIndex: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  messagePaddingIcon: {
    top: 34,
    left: 192,
    position: "absolute",
    zIndex: 1,
  },
  bubbleSender1: {
    width: 239,
    borderBottomLeftRadius: 10,
    backgroundColor: Color.colorWhitesmoke200,
    height: 55,
    paddingHorizontal: 17,
  },
  timestamp1: {
    fontSize: 8,
    color: Color.colorGray100,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
  },
  responseSpacerIcon: {
    width: 22,
    top: 14,
    left: 17,
    height: 7,
    position: "absolute",
    zIndex: 1,
  },
  timestampParent: {
    width: 39,
    paddingTop: 14,
    paddingBottom: 0,
    height: 7,
    flexDirection: "row",
  },
  responseDetails: {
    bottom: 80,
    left: 45,
    position: "absolute",
    zIndex: 1,
  },
  h: {
    textAlign: "left",
  },
  hWrapper: {
    backgroundColor: Color.colorLightcoral,
    paddingHorizontal: Padding.p_12,
    paddingVertical: Padding.p_8,
    borderRadius: 83,
    zIndex: 2,
    justifyContent: "center",
  },
  userMessage: {
    width: 291,
    top: 212,
    left: 42,
    paddingRight: 9,
    paddingBottom: 33,
    zIndex: 3,
    gap: 5,
    justifyContent: "flex-end",
    position: "absolute",
  },
  textArea: {
    borderRadius: 13,
    backgroundColor: Color.colorWhitesmoke300,
    borderColor: Color.bgBadgesSmall,
    borderTopWidth: 0.8,
    height: 51,
    paddingHorizontal: 18,
    paddingVertical: 17,
    fontSize: 15,
    borderStyle: "solid",
    fontFamily: FontFamily.interRegular,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  paddingIcon: {
    top: 22,
    left: 287,
    position: "absolute",
    zIndex: 1,
  },
  footer4: {
    top: 326,
    left: 10,
    shadowColor: Color.colorGray400,
    borderBottomRightRadius: 17,
    borderBottomLeftRadius: 17,
    borderColor: Color.colorMediumseagreen200,
    borderWidth: 1,
    padding: 13,
    zIndex: 4,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    width: 337,
    backgroundColor: Color.bgFooter,
  },
  
  // 새로운 챗봇 스타일
  chatMessagesContainer: {
    height: 300,
    backgroundColor: Color.bgFooter,
    paddingBottom: 80,
    paddingLeft: 0,
  },
  messagesScrollView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageContainer: {
    marginBottom: 15,
  },
  aiMessageContainer: {
    alignSelf: "flex-start",
    maxWidth: "85%",
    marginLeft: 0,
  },
  aiMessageBubble: {
    backgroundColor: Color.colorHoneydew,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
  },
  aiMessageText: {
    fontSize: 14,
    color: Color.colorBlack,
    fontFamily: FontFamily.interRegular,
    lineHeight: 20,
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    maxWidth: "85%",
  },
  userMessageBubble: {
    backgroundColor: Color.colorMediumseagreen100,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomRightRadius: 5,
  },
  userMessageText: {
    fontSize: 14,
    color: Color.bgFooter,
    fontFamily: FontFamily.interRegular,
    lineHeight: 20,
  },
  messageTimestamp: {
    fontSize: 10,
    color: Color.colorGray100,
    fontFamily: FontFamily.interRegular,
    marginTop: 5,
    textAlign: "center",
  },
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorWhitesmoke300,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: FontFamily.interRegular,
    marginRight: 10,
  },
  chatInput: {
    flex: 1,
    backgroundColor: Color.colorWhitesmoke300,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: FontFamily.interRegular,
    marginRight: 10,
  },
  sendButton: {
    padding: 5,
  },
  resultBlock: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  resultImage: {
    alignSelf: "stretch",
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  aiMessageMetaRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 0,
  },
  aiWCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  aiWText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // 스타일 추가
  chatFooterBox: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: Color.bgFooter,
    shadowColor: Color.colorGray400,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: Color.colorBlack,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: Color.bgFooter,
    fontSize: 16,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
});

export default Component;
