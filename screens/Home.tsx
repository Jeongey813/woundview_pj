import * as React from "react";
import { ScrollView, Text, StyleSheet, View, Pressable, TextInput, TouchableOpacity, ScrollView as RNScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import {
  Color,
  FontFamily,
  Border,
  FontSize,
  Gap,
  Padding,
} from "../GlobalStyles";
import Frame102 from "../assets/frame-102.svg";
import Logo from "../components/Logo";
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const navigation = useNavigation() as any;

  // 모든 hook 선언을 최상단에 위치
  const [username, setUsername] = React.useState('');
  const [loading, setLoading] = React.useState(true);
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
  const scrollViewRef = React.useRef<RNScrollView>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || '');
        setLoading(false);
      } else {
        navigation.replace('Login');
      }
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return null;
  }

  const handleAIAnalysis = () => {
    navigation.navigate("Checklist"); // Checklist 화면으로 이동
  };

  // 챗봇 상태 및 핸들러 추가
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
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <ScrollView
      style={styles.home}
      contentContainerStyle={styles.homeScrollViewContent}
    >
      <View style={[styles.homepage, styles.homepageLayout, { marginTop: 80 }]}>
        <View style={[styles.container, styles.homepageLayout]}>
          <View style={styles.frameParent}>
            <View style={styles.actionAreaParent}>
              <View style={styles.infoContainerWrapper}>
                <View style={styles.infoContainer}>
                  <Text style={[styles.text, styles.textFlexBox]}>
                    사용자님
                  </Text>
                  <View style={styles.parent}>
                    <Text style={[styles.text1, styles.textFlexBox]}>
                      지금 당장 병원 가기 어렵다면?
                    </Text>
                    <Text style={[styles.text2, styles.textFlexBox]}>
                      인공지능으로 내상처의 상태를 확인하세요!
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Pressable 
              style={[styles.aiWrapper, styles.minorLayout]}
              onPress={handleAIAnalysis}
            >
              <Text
                style={[styles.ai1, styles.textTypo1]}
              >{`AI 상처분석 시작 `}</Text>
            </Pressable>
          </View>
          <View style={styles.chatContainer}>
            {/* 챗봇 헤더 */}
            <View style={styles.chatHeader}>
              <View style={styles.chatHeaderContent}>
                <View style={styles.chatLogo}>
                  <Text style={styles.chatLogoText}>W</Text>
                </View>
                <Text style={styles.chatTitle}>상처 전문 AI 헬퍼</Text>
              </View>
            </View>
            
            {/* 메시지 영역 */}
            <View style={styles.messagesArea}>
              <RNScrollView
                ref={scrollViewRef}
                style={styles.messagesScrollView}
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message) => (
                  <View key={message.id} style={styles.messageWrapper}>
                    {message.type === 'ai' ? (
                      <View style={styles.aiMessageWrapper}>
                        <View style={styles.aiMessageBubble}>
                          <Text style={styles.aiMessageText}>{message.text}</Text>
                        </View>
                        <View style={styles.aiMessageFooter}>
                          <View style={styles.aiMessageLogo}>
                            <Text style={styles.aiMessageLogoText}>W</Text>
                          </View>
                          <Text style={styles.messageTime}>{message.timestamp}</Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.userMessageWrapper}>
                        <View style={styles.userMessageBubble}>
                          <Text style={styles.userMessageText}>{message.text}</Text>
                        </View>
                        <Text style={styles.messageTime}>{message.timestamp}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </RNScrollView>
            </View>
            
            {/* 입력 영역 */}
            <View style={styles.inputArea}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="질문을 입력하세요..."
                  placeholderTextColor="#999"
                  onSubmitEditing={sendMessage}
                  returnKeyType="send"
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                  <Text style={styles.sendButtonText}>전송</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 기존 챗봇 섹션 제거 */}
          {/* <View style={styles.chatSection}> ... </View> */}

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
              onPress={() => navigation.navigate("Timelinemain")}
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
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeScrollViewContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  homepageLayout: {
    width: "100%",
    maxWidth: 390,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  actionAreaFlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textFlexBox: {
    color: Color.colorBlack,
    alignSelf: "stretch",
    textAlign: "left",
  },
  minorLayout: {
    height: 70,
    flexDirection: "row",
  },
  textTypo1: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  injuryLayout: {
    height: 326,
    gap: 13,
  },
  majorInjuriesLayout: {
    borderWidth: 1,
    borderColor: Color.colorMediumseagreen100,
    borderStyle: "solid",
    width: 100,
    height: 100,
    borderRadius: Border.br_10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.bgFooter,
  },
  textTypo: {
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textTransform: "uppercase",
    color: Color.colorBlack,
    fontSize: FontSize.size_18,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperLayout: {
    paddingHorizontal: 33,
    borderWidth: 1,
    borderColor: Color.colorMediumseagreen100,
    borderStyle: "solid",
    width: 100,
    height: 100,
    borderRadius: Border.br_10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.bgFooter,
  },
  navFlexBox1: {
    gap: 2,
    alignItems: 'center',
  },
  iconLayout: {
    overflow: "hidden",
    alignSelf: "stretch",
    maxWidth: "100%",
    width: "100%",
  },
  navFlexBox: {
    gap: 3,
    alignItems: 'center',
  },
  ai: {
    width: 142,
    letterSpacing: -0.5,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorMediumseagreen100,
    textAlign: "left",
    fontSize: FontSize.size_18,
    height: 22,
    alignSelf: "flex-start",
  },
  actionArea: {
    alignItems: "flex-start",
  },
  text: {
    fontSize: FontSize.size_32,
    letterSpacing: -0.6,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  text1: {
    fontSize: FontSize.size_22,
    letterSpacing: -0.4,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  text2: {
    fontSize: FontSize.size_16,
    letterSpacing: -0.3,
    fontWeight: "300",
    fontFamily: FontFamily.interLight,
  },
  parent: {
    gap: 8,
    alignSelf: "stretch",
  },
  infoContainer: {
    alignSelf: "stretch",
    gap: 11,
  },
  infoContainerWrapper: {
    paddingVertical: Padding.p_10,
    alignSelf: "stretch",
    paddingHorizontal: 0,
  },
  actionAreaParent: {
    width: 298,
    gap: 7,
  },
  ai1: {
    height: 25,
    width: 147,
    fontSize: 21,
    color: Color.bgFooter,
    letterSpacing: -0.4,
    textAlign: "left",
  },
  aiWrapper: {
    backgroundColor: Color.colorMediumseagreen100,
    paddingHorizontal: 92,
    paddingVertical: 20,
    borderRadius: Border.br_10,
    height: 70,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  frameParent: {
    width: 333,
    gap: Gap.gap_4,
  },
  text3: {
    fontSize: FontSize.size_20,
    letterSpacing: -0.2,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  text4: {
    width: 53,
  },
  majorInjuries: {
    paddingHorizontal: 25,
    paddingVertical: 39,
  },
  text5: {
    width: 52,
    letterSpacing: -0.4,
  },
  minorInjuries: {
    width: 213,
    gap: 13,
  },
  text6: {
    width: 37,
  },
  wrapper: {
    paddingVertical: 37,
  },
  text7: {
    width: 36,
    letterSpacing: -0.4,
  },
  framePressable: {
    paddingVertical: Padding.p_36,
  },
  minorInjuries2: {
    justifyContent: "flex-end",
    paddingRight: 113,
    width: 213,
  },
  injuryCategories: {
    zIndex: undefined,
    alignItems: "flex-end",
    width: 213,
    gap: 13,
  },
  surgicalScar: {
    paddingVertical: 39,
  },
  text10: {
    width: 70,
  },
  surgicalScar1: {
    paddingHorizontal: Padding.p_15,
    paddingVertical: 37,
  },
  burnSurgical: {
    height: 213,
    width: 100,
    gap: 13,
  },
  injuryCategoriesParent: {
    gap: 13,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  typeContainer: {
    width: 327,
    gap: Gap.gap_11,
  },
  typeContainerWrapper: {
    backgroundColor: Color.colorMintcream200,
    minHeight: 380,
    paddingHorizontal: 31,
    paddingVertical: 21,
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  home2Icon: {
    height: 41,
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
  navItems: {
    width: 41,
    marginTop: -10,
  },
  timelineIcon: {
    height: 45,
  },
  navItems1: {
    width: 45,
    marginTop: -10,
  },
  navItems2: {
    width: 45,
    marginTop: -10,
  },
  user1Icon: {
    width: 40,
    height: 40,
  },
  navItems3: {
    width: 56,
    marginTop: -10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 100,
    borderTopWidth: 1,
    borderTopColor: Color.colorLightgray,
  },
  container: {
    gap: 21,
    alignItems: "center",
  },
  homepage: {
    paddingVertical: Padding.p_16,
    paddingHorizontal: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: Color.bgFooter,
    width: "100%",
    maxWidth: 390,
  },
  home: {
    flex: 1,
    maxWidth: "100%",
    width: "100%",
    backgroundColor: Color.bgFooter,
  },
  // 새로운 챗봇 스타일
  chatContainer: {
    width: "100%",
    maxWidth: 333,
    backgroundColor: Color.bgFooter,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 10,
  },
  chatHeader: {
    backgroundColor: Color.colorMediumseagreen100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  chatHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chatLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Color.bgFooter,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  chatLogoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.colorMediumseagreen100,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Color.bgFooter,
    fontFamily: FontFamily.interSemiBold,
  },
  messagesArea: {
    height: 280,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messagesScrollView: {
    flex: 1,
  },
  messageWrapper: {
    marginBottom: 12,
  },
  aiMessageWrapper: {
    alignItems: "flex-start",
  },
  userMessageWrapper: {
    alignItems: "flex-end",
  },
  aiMessageBubble: {
    backgroundColor: "#f0f9f0",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: "80%",
  },
  aiMessageText: {
    fontSize: 14,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
    lineHeight: 20,
  },
  userMessageBubble: {
    backgroundColor: Color.bgFooter,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: "80%",
    borderWidth: 1,
    borderColor: Color.colorLightgray,
  },
  userMessageText: {
    fontSize: 14,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    color: Color.colorGray600,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  aiMessageFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  aiMessageLogo: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: Color.colorMediumseagreen100,
    justifyContent: "center",
    alignItems: "center",
  },
  aiMessageLogoText: {
    fontSize: 15,
    fontWeight: "bold",
    color: Color.bgFooter,
  },
  inputArea: {
    borderTopWidth: 1,
    borderTopColor: Color.colorLightgray,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: Color.colorBlack,
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontFamily: FontFamily.interMedium,
  },
  sendButton: {
    backgroundColor: Color.colorMediumseagreen100,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  sendButtonText: {
    color: Color.bgFooter,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
  },
});

export default Home;
