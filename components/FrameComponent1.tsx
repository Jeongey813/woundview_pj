import * as React from "react";
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Color,
  Border,
  FontFamily,
  FontSize,
  Gap,
  Padding,
} from "../GlobalStyles";

const FrameComponent1 = () => {
  const navigation = useNavigation() as any;
  const route = useRoute();
  
  // 체크리스트 데이터 받기
  const checklistData = (route.params as any)?.checklistData;

  const handleTakePhoto = () => {
    navigation.navigate("CameraScreen"); // CameraScreen으로 이동
  };

  const handleSelectFromGallery = () => {
    navigation.navigate("ImageUploader", { checklistData }); // ImageUploader로 이동하면서 체크리스트 데이터 전달
  };

  const handleClose = () => {
    navigation.navigate("Home"); // Home으로 이동
  };

  return (
    <View style={styles.frameParent}>
      <View style={styles.frameGroup}>
        <View style={styles.aiParent}>
          <View style={styles.aiHeader}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>{`상처 부위를
촬영해주세요.`}</Text>
        </View>
        <View style={styles.photoSelection}>
          <Pressable
            style={[styles.photoChoiceWrapper, styles.photoWrapperLayout]}
            onPress={handleTakePhoto}
          >
            <Text style={[styles.text1, styles.textTypo]}>사진촬영</Text>
          </Pressable>
          <Pressable
            style={[styles.photoChoiceWrapper1, styles.photoWrapperLayout]}
            onPress={handleSelectFromGallery}
          >
            <Text style={[styles.text2, styles.textTypo]}>갤러리에서 선택</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.cm}>
        상처로부터 약 20cm 떨어진 거리에서 촬영해주세요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  photoWrapperLayout: {
    paddingVertical: 21,
    justifyContent: "center",
    height: 64,
    borderWidth: 2,
    borderColor: Color.colorMediumseagreen100,
    borderStyle: "solid",
    backgroundColor: Color.bgFooter,
    borderRadius: Border.br_10,
    width: 159,
    flexDirection: "row",
    alignItems: "center",
  },
  textTypo: {
    display: "flex",
    letterSpacing: -0.4,
    height: 22,
    textAlign: "center",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textTransform: "uppercase",
    justifyContent: "center",
    color: Color.colorBlack,
    fontSize: FontSize.size_18,
    alignItems: "center",
  },
  ai: {
    letterSpacing: -0.5,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorMediumseagreen100,
    textAlign: "left",
    fontSize: FontSize.size_18,
    alignSelf: "stretch",
  },
  text: {
    fontSize: FontSize.size_32,
    letterSpacing: -0.6,
    lineHeight: 41,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    textAlign: "left",
    alignSelf: "stretch",
  },
  aiParent: {
    width: "100%",
    gap: Gap.gap_30,
  },
  text1: {
    width: 69,
  },
  photoChoiceWrapper: {
    paddingHorizontal: 45,
  },
  text2: {
    width: 122,
  },
  photoChoiceWrapper1: {
    paddingHorizontal: Padding.p_19,
  },
  photoSelection: {
    gap: Gap.gap_11,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameGroup: {
    gap: Gap.gap_28,
    alignSelf: "stretch",
  },
  cm: {
    fontSize: FontSize.size_14,
    letterSpacing: -0.3,
    color: Color.colorDimgray,
    textAlign: "center",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textTransform: "uppercase",
    alignSelf: "stretch",
  },
  frameParent: {
    gap: 17,
    alignItems: "center",
    alignSelf: "stretch",
  },
  aiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  closeButton: {
    padding: 5,
    alignSelf: "flex-start",
    marginTop: -10,
  },
  closeText: {
    fontSize: FontSize.size_18,
    fontWeight: "bold",
    color: Color.colorBlack,
  },
});

export default FrameComponent1;
