import * as React from "react";
import { ScrollView, Text, StyleSheet, View, TextInput } from "react-native";
import { Image } from "expo-image";
import FrameComponent111 from "../components/FrameComponent111";
import Logo from "../components/Logo";
import Rectangle1 from "../assets/rectangle-1.svg";
import Timestamp from "../components/Timestamp";
import Logo11 from "../assets/logo1.svg";
import Frame101 from "../assets/frame-101.svg";
import Frame102 from "../assets/frame-102.svg";
import {
  Color,
  FontFamily,
  Gap,
  FontSize,
  Padding,
  Border,
} from "../GlobalStyles";

const Component4 = () => {
  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.scrollView1Content}
    >
      <View style={[styles.frameParent, styles.parentFlexBox]}>
        <View style={[styles.parent, styles.parentFlexBox]}>
          <Text style={styles.text}>{`<`}</Text>
          <Text style={styles.text1}>분석결과</Text>
        </View>
        <View style={styles.frameGroup}>
          <FrameComponent111 />
          <View style={styles.frameContainer}>
            <View style={[styles.frameWrapper, styles.footer4ShadowBox]}>
              <View style={styles.frameView}>
                <View style={styles.logoWrapper}>
                  <Logo shape="emblem only" />
                </View>
                <Text
                  style={[styles.ai, styles.hTypo]}
                >{`상처 전문 AI 헬퍼 챗봇 `}</Text>
              </View>
            </View>
            <View style={styles.rectangleWrapper}>
              <View style={styles.frameChild} />
            </View>
            <View style={styles.systemMessageWrapper}>
              <View style={[styles.systemMessage, styles.messageFlexBox]}>
                <View style={[styles.bubbleSender, styles.bubblePosition]}>
                  <View style={[styles.messages, styles.messagesFlexBox]}>
                    <Text style={styles.helloSystemMessage}>
                      안녕하세요! 저는 상처 상태를 분석하고 관리 에 도움을 주는
                      AI 헬퍼예요. 궁금한 점이 있다면 언제든지 물어보세요! 😊
                    </Text>
                  </View>
                  <Rectangle1
                    style={[styles.bubbleSenderChild, styles.logoPosition1]}
                    width={37}
                    height={28}
                  />
                  <View
                    style={[styles.timestampWrapper, styles.messagesFlexBox]}
                  >
                    <Timestamp timeStamp="7:20" />
                  </View>
                </View>
                <View style={[styles.logo, styles.logoPosition]}>
                  <View style={[styles.brandColor, styles.textAreaPosition]} />
                  <Logo11 style={styles.logoIcon} width={27} height={27} />
                </View>
              </View>
            </View>
            <View style={[styles.userMessage, styles.userMessageSpaceBlock]}>
              <View style={[styles.bubbleSender1, styles.bubblePosition]}>
                <View style={styles.messages1}>
                  <Text style={styles.text2}>{`열상은 어떤 상처예요? `}</Text>
                </View>
                <Frame101
                  style={styles.messagePaddingIcon}
                  width={57}
                  height={48}
                />
              </View>
              <View style={[styles.responseDetails, styles.messagesFlexBox]}>
                <View style={styles.timestampParent}>
                  <View style={styles.messages1}>
                    <Text style={styles.timestamp1}>7:20</Text>
                  </View>
                  <Image
                    style={styles.responseSpacerIcon}
                    contentFit="cover"
                    source={require("../assets/frame-98.png")}
                  />
                </View>
              </View>
              <View style={[styles.hWrapper, styles.logoLayout]}>
                <Text style={[styles.h, styles.hTypo]}>H</Text>
              </View>
            </View>
            <View style={[styles.footer4, styles.logoPosition]}>
              <TextInput
                style={[styles.textArea, styles.textAreaPosition]}
                placeholder="질문을 입력하세요.....                    "
                placeholderTextColor="#444"
              />
              <Frame102 style={styles.paddingIcon} width={35} height={35} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView1Content: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    height: 844,
  },
  parentFlexBox: {
    gap: 0,
    justifyContent: "space-between",
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
  text: {
    width: 17,
    fontSize: FontSize.size_20,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -0.4,
    color: Color.colorBlack,
    height: 24,
  },
  text1: {
    width: 83,
    fontSize: FontSize.size_22,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    textTransform: "uppercase",
    letterSpacing: -0.4,
  },
  parent: {
    width: 208,
    flexDirection: "row",
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
  ai: {
    width: 189,
    textAlign: "left",
    height: 24,
    fontSize: 20,
  },
  frameView: {
    gap: Gap.gap_6,
    alignItems: "center",
    flexDirection: "row",
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
  frameChild: {
    height: 333,
    alignSelf: "stretch",
    backgroundColor: Color.bgFooter,
  },
  rectangleWrapper: {
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
  text2: {
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
  frameContainer: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameGroup: {
    gap: 123,
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameParent: {
    width: 357,
    height: 839,
  },
  scrollview: {
    maxWidth: "100%",
    flex: 1,
    width: "100%",
    backgroundColor: Color.bgFooter,
  },
});

export default Component4;
