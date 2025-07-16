import * as React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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
  ImageEditor: undefined;
  Timelinerecord: undefined;
  RecordEdit: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RecordEdit = () => {
  const navigation = useNavigation<NavigationProp>();
  const [memoText, setMemoText] = React.useState("상처주변에 열이나고 통증이있음");

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.scrollView1Content}
    >
      <View style={styles.frameParent}>
        {/* 헤더 */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Timelinemain')} style={styles.backButton}>
            <Text style={styles.backText}>{`<`}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>기록편집</Text>
        </View>

        {/* 메인 콘텐츠 */}
        <View style={styles.contentContainer}>
          {/* 날짜 및 분류 정보 */}
          <View style={styles.infoSection}>
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>날짜:</Text>
              <Text style={styles.dateText}>7월 9일</Text>
            </View>
            <View style={styles.classificationRow}>
              <Text style={styles.classificationLabel}>분류:</Text>
              <Text style={styles.classificationText}>열상 / 손</Text>
            </View>
            <View style={styles.riskRow}>
              <Text style={styles.riskLabel}>위험도:</Text>
              <Text style={styles.riskText}>저위험</Text>
            </View>
          </View>

          {/* 이미지 섹션 */}
          <View>
            <Text style={styles.sectionTitle}>상처 이미지</Text>
            <Image
              style={{ width: '100%', height: 200, borderRadius: 0 }}
              resizeMode="cover"
              source={require("../assets/2.png")}
            />
          </View>

          {/* 메모 섹션 */}
          <View style={styles.memoSection}>
            <Text style={styles.sectionTitle}>상태 메모</Text>
            <TextInput
              style={styles.memoInput}
              value={memoText}
              onChangeText={setMemoText}
              multiline={true}
              numberOfLines={4}
              placeholder="상처 상태에 대한 메모를 입력하세요..."
              placeholderTextColor="#bcbcbc"
            />
          </View>

          {/* 저장 버튼 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => {
                // 저장 로직
                navigation.goBack();
              }}
            >
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: Color.bgFooter,
  },
  scrollView1Content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    minHeight: 844,
    flexGrow: 1,
  },
  frameParent: {
    width: "100%",
    maxWidth: 338,
    alignSelf: "center",
    paddingTop: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    position: 'relative',
    height: 50,
    marginBottom: 20,
  },
  backButton: {
    // position 속성 제거, 일반 row 정렬
  },
  backText: {
    width: 17,
    fontSize: FontSize.size_20,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "center",
  },
  headerTitle: {
    fontSize: FontSize.size_22,
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: 'absolute',
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
  contentContainer: {
    gap: 20,
  },
  infoSection: {
    backgroundColor: Color.bgFooter,
    borderRadius: Border.br_10,
    padding: 16,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    gap: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: FontSize.size_16,
    fontWeight: "600",
    color: Color.colorBlack,
    width: 60,
  },
  dateText: {
    fontSize: FontSize.size_16,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
  },
  classificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classificationLabel: {
    fontSize: FontSize.size_16,
    fontWeight: "600",
    color: Color.colorBlack,
    width: 60,
  },
  classificationText: {
    fontSize: FontSize.size_16,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskLabel: {
    fontSize: FontSize.size_16,
    fontWeight: "600",
    color: Color.colorBlack,
    width: 60,
  },
  riskText: {
    fontSize: FontSize.size_16,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
  },
  imageSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: FontSize.size_18,
    fontWeight: "600",
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
  },
  imageContainer: {
    alignItems: 'center',
    // borderRadius와 overflow 속성 제거
  },
  woundImage: {
    width: '100%',
    height: 205,
    borderRadius: 3,
  },
  memoSection: {
    gap: 12,
  },
  memoInput: {
    backgroundColor: Color.bgFooter,
    borderRadius: Border.br_8,
    padding: 16,
    fontSize: FontSize.size_16,
    fontFamily: FontFamily.interMedium,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 0,
  },
  saveButton: {
    backgroundColor: Color.colorMediumseagreen100,
    borderRadius: Border.br_10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Color.bgFooter,
    fontSize: FontSize.size_18,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
  },
});

export default RecordEdit; 