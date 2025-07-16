import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { FontSize, FontFamily, Color, Gap } from "../GlobalStyles";

type RootStackParamList = {
  Intro: undefined;
  Result: undefined;
  Component4: undefined;
  Timelinemain: undefined;
  Home: undefined;
  Checklist: undefined;
  PhotoOption: undefined;
  CameraScreen: undefined;
  UploadComplete: undefined;
  ImageUploader: undefined;
  Ailoading: undefined;
  ImageEditor: { imageUri?: string };
  Timelinerecord: undefined;
  RecordEdit: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Component5 = () => {
  const navigation = useNavigation<NavigationProp>();
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    try {
      // 시뮬레이터에서는 더미 이미지 사용, 실제 기기에서는 카메라 사용
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log("사진 촬영 완료:", result.assets[0].uri);
        navigation.navigate("ImageEditor", { imageUri: result.assets[0].uri });
      }
    } catch (error: any) {
      console.error("사진 촬영 실패:", error);
      
      // 시뮬레이터에서 카메라 오류 발생 시 더미 이미지 사용
      if (error.message && error.message.includes('simulator')) {
        console.log("시뮬레이터에서 더미 이미지 사용");
        const dummyImageUri = "https://via.placeholder.com/400x600/cccccc/666666?text=Wound+Photo";
        navigation.navigate("ImageEditor", { imageUri: dummyImageUri });
      } else {
        Alert.alert("오류", "사진 촬영에 실패했습니다.");
      }
    }
  };

  const handleClose = () => {
    navigation.navigate('PhotoOption');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>카메라 권한을 요청 중...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>카메라 접근 권한이 필요합니다.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={handleClose}>
          <Text style={styles.permissionButtonText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 카메라 배경 시뮬레이션 */}
      <View style={styles.cameraBackground}>
        <View style={styles.overlay}>
          {/* 상단 헤더 */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>상처 사진 촬영</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          {/* 안내 텍스트 */}
          <View style={styles.guideContainer}>
            <Text style={styles.guideText}>
              상처부위에 초점을 맞춰 촬영해 주세요.
            </Text>
          </View>

          {/* 하단 촬영 버튼 */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={takePicture}
              activeOpacity={0.8}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorBlack,
  },
  cameraBackground: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: FontSize.size_22,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.bgFooter,
    letterSpacing: -0.4,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FontSize.size_20,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.bgFooter,
    letterSpacing: -0.4,
  },
  guideContainer: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  guideText: {
    fontSize: FontSize.size_15,
    letterSpacing: -0.3,
    fontFamily: FontFamily.interRegular,
    color: Color.bgFooter,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Color.bgFooter,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Color.colorMediumseagreen100,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Color.colorMediumseagreen100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.bgFooter,
  },
  loadingText: {
    fontSize: FontSize.size_16,
    fontFamily: FontFamily.interMedium,
    color: Color.colorBlack,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.bgFooter,
    paddingHorizontal: 20,
  },
  permissionText: {
    fontSize: FontSize.size_16,
    fontFamily: FontFamily.interMedium,
    color: Color.colorBlack,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: Color.colorMediumseagreen100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: Color.bgFooter,
    fontSize: FontSize.size_16,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
});

export default Component5;
