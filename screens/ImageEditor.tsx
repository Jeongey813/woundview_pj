import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert, SafeAreaView, StatusBar, Image as RNImage } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import FrameComponent11 from "../components/FrameComponent11";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import * as ImageManipulator from 'expo-image-manipulator';

type RootStackParamList = {
  Intro: undefined;
  Result: undefined;
  Component4: undefined;
  Timelinemain: undefined;
  Home: undefined;
  Checklist: undefined;
  PhotoOption: undefined;
  CameraScreen: undefined;
  UploadComplete: { selectedImageUri?: string; checklistData?: any };
  ImageUploader: undefined;
  Ailoading: undefined;
  ImageEditor: { selectedImageUri?: string; checklistData?: any };
  Timelinerecord: undefined;
  RecordEdit: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Component9 = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  // imageUri(카메라) 또는 selectedImageUri(갤러리) 모두 지원
  const { selectedImageUri: paramSelectedImageUri, imageUri, checklistData } = route.params as { selectedImageUri?: string; imageUri?: string; checklistData?: any };
  const selectedImageUri = paramSelectedImageUri || imageUri;

  const [cropBox, setCropBox] = React.useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [containerSize, setContainerSize] = React.useState<{ width: number; height: number }>({ width: 342, height: 321 });

  const handleRetake = () => {
    try {
      console.log("재촬영 버튼 클릭됨 - PhotoOption으로 이동 시도");
      navigation.navigate("PhotoOption"); // PhotoOption 화면으로 이동
      console.log("PhotoOption으로 이동 성공");
    } catch (error: any) {
      console.error("재촬영 네비게이션 오류:", error);
      Alert.alert("오류", "재촬영 버튼 클릭 중 오류가 발생했습니다: " + error.message);
    }
  };

  const handleConfirm = async () => {
    try {
      if (!cropBox) {
        Alert.alert('오류', '크롭 영역이 올바르지 않습니다.');
        return;
      }
      if (cropBox.width <= 0 || cropBox.height <= 0) {
        Alert.alert('오류', '크롭 영역의 크기가 0입니다.');
        return;
      }
      if (!selectedImageUri) {
        // 이미지 미선택 에러는 띄우지 않음
        return;
      }
      // 원본 이미지의 실제 크기를 가져오기 위해 Image.getSize 사용
      const getImageSize = (uri: string) => new Promise<{ width: number; height: number }>((resolve, reject) => {
        RNImage.getSize(
          uri,
          (width: number, height: number) => resolve({ width, height }),
          (error: unknown) => reject(error)
        );
      });
      const originalSize = await getImageSize(selectedImageUri);
      // containerSize(=뷰에서의 이미지 크기) 대비 cropBox의 비율로 실제 crop 영역 계산
      const scaleX = originalSize.width / containerSize.width;
      const scaleY = originalSize.height / containerSize.height;
      const cropRegion = {
        originX: Math.round(cropBox.x * scaleX),
        originY: Math.round(cropBox.y * scaleY),
        width: Math.round(cropBox.width * scaleX),
        height: Math.round(cropBox.height * scaleY),
      };
      // expo-image-manipulator로 크롭
      const result = await ImageManipulator.manipulateAsync(
        selectedImageUri,
        [{ crop: cropRegion }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      navigation.navigate("UploadComplete", { selectedImageUri: result.uri, checklistData });
      console.log("UploadComplete로 이동 성공");
    } catch (error: any) {
      console.error("확인 네비게이션 오류:", error);
      Alert.alert("오류", "확인 버튼 클릭 중 오류가 발생했습니다: " + error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorBlack }}>
      <StatusBar barStyle="light-content" backgroundColor={Color.colorBlack} />
      <View style={styles.parent}>
        <Text style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', color: '#fff', fontSize: 22, fontWeight: '600', fontFamily: FontFamily.interSemiBold, height: 27, top: 0 }}>상처 영역 지정</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PhotoOption')} style={{ position: 'absolute', right: 20 }}>
          <Text style={[styles.x, styles.textFlexBox]}>x</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inner}>
        <View style={styles.frameParent}>
          <FrameComponent11 
            selectedImageUri={selectedImageUri} 
            onCropBoxChange={setCropBox}
          />
          <Text style={styles.text1}>상처부위에 꽉 차도록 조절해주세요.</Text>
        </View>
      </View>
      <View style={[styles.group, styles.groupFlexBox]}>
        <TouchableOpacity 
          onPress={handleRetake} 
          style={styles.buttonLeft}
          activeOpacity={0.7}
        >
          <Text style={[styles.text2, styles.textFlexBox, { marginLeft: 30 }]}>재촬영</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleConfirm} 
          style={styles.buttonRight}
          activeOpacity={0.7}
        >
          <Text style={[styles.text3, styles.textFlexBox, { marginRight: 30 }]}>확인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView1Content: {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 31,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 40,
    height: 844,
  },
  groupFlexBox: {
    gap: 0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textFlexBox: {
    display: "flex",
    letterSpacing: -0.4,
    justifyContent: "center",
    textTransform: "uppercase",
    alignItems: "center",
  },
  text: {
    width: 133,
    justifyContent: "center",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_22,
    height: 27,
    color: '#fff',
    letterSpacing: -0.4,
  },
  x: {
    height: 19,
    width: 17,
    fontSize: FontSize.size_20,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    justifyContent: "center",
    color: '#fff',
    letterSpacing: -0.4,
  },
  parent: {
    position: 'relative',
    width: '100%',
    height: 40,
    marginTop: 30,
  },
  text1: {
    alignSelf: "stretch",
    fontSize: FontSize.size_15,
    letterSpacing: -0.3,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray200,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 50,
  },
  frameParent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  inner: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Color.colorBlack,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 23,
    flexDirection: 'row',
  },
  text2: {
    width: 63,
    justifyContent: "center",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_22,
    height: 27,
    color: '#fff',
    letterSpacing: -0.4,
  },
  text3: {
    width: 44,
    justifyContent: "center",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_22,
    height: 27,
    color: '#fff',
    letterSpacing: -0.4,
  },
  group: {
    width: '100%',
    marginBottom: 50,
  },
  scrollview: {
    width: "100%",
    backgroundColor: Color.bgFooter,
    flex: 1,
    maxWidth: "100%",
  },
  buttonLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default Component9;
