import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FontFamily,
  Border,
  Padding,
  Color,
  FontSize,
  Gap,
} from "../GlobalStyles";

type RootStackParamList = {
  Intro: undefined;
  Result: undefined;
  Component4: undefined;
  Timelinemain: { 
    selectedImageUri?: string;
    recordDate?: string;
    recordClassification?: string;
    recordBodyPart?: string;
    recordEmergencyLevel?: string;
  };
  Home: undefined;
  Checklist: undefined;
  PhotoOption: undefined;
  CameraScreen: undefined;
  UploadComplete: undefined;
  ImageUploader: undefined;
  Ailoading: undefined;
  ImageEditor: undefined;
  Timelinerecord: { selectedImageUri?: string };
  RecordEdit: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Timelinemain">;

const Component10 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  
  // 업로드된 이미지 URI와 체크리스트 데이터 받기
  const selectedImageUri = (route.params as any)?.selectedImageUri;
  const checklistData = (route.params as any)?.checklistData;
  
  // 체크리스트 데이터에서 초기값 설정
  const initialDate = checklistData?.date || null;
  const initialBodyPart = checklistData?.bodyPart || null;
  const initialClassification = checklistData?.classification || null;
  const initialCause = checklistData?.cause || null;
  
  const today = new Date();
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };
  
  const [frameDropdownOpen, setFrameDropdownOpen] = useState(false);
  const [frameDropdownValue, setFrameDropdownValue] = useState<string | null>(initialDate ? formatDate(initialDate) : null);
  const [frameDropdown1Open, setFrameDropdown1Open] = useState(false);
  const [frameDropdown1Value, setFrameDropdown1Value] = useState(initialBodyPart);
  const [frameDropdown2Open, setFrameDropdown2Open] = useState(false);
  const [frameDropdown2Value, setFrameDropdown2Value] = useState(initialClassification);
  const [frameDropdown3Open, setFrameDropdown3Open] = useState(false);
  const [frameDropdown3Value, setFrameDropdown3Value] = useState(initialCause);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [memoText, setMemoText] = useState("");
  const [savedMemo, setSavedMemo] = useState("");
  const [showMemoInput, setShowMemoInput] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    setFrameDropdownValue(formatDate(newDate));
    setShowCalendar(false);
  };

  const changeMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];
    
    // 이전 달의 마지막 날들
    for (let i = 0; i < startingDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }
    
    // 현재 달의 날들
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
      const isToday = today.toDateString() === date.toDateString();
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isSelected && styles.selectedDay,
            isToday && styles.today
          ]}
          onPress={() => handleDateSelect(day)}
        >
          <Text style={[
            styles.calendarDayText,
            isSelected && styles.selectedDayText,
            isToday && styles.todayText
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  const dateItems = [
    { label: formatDate(today), value: formatDate(today) },
    { label: formatDate(new Date(today.getTime() - 24*60*60*1000)), value: formatDate(new Date(today.getTime() - 24*60*60*1000)) },
    { label: formatDate(new Date(today.getTime() - 2*24*60*60*1000)), value: formatDate(new Date(today.getTime() - 2*24*60*60*1000)) },
    { label: formatDate(new Date(today.getTime() - 3*24*60*60*1000)), value: formatDate(new Date(today.getTime() - 3*24*60*60*1000)) },
    { label: formatDate(new Date(today.getTime() - 7*24*60*60*1000)), value: formatDate(new Date(today.getTime() - 7*24*60*60*1000)) },
  ];

  const bodyPartItems = [
    { label: "머리", value: "머리" },
    { label: "얼굴", value: "얼굴" },
    { label: "어깨", value: "어깨" },
    { label: "가슴", value: "가슴" },
    { label: "배", value: "배" },
    { label: "팔", value: "팔" },
    { label: "손", value: "손" },
    { label: "다리", value: "다리" },
    { label: "발", value: "발" },
    { label: "등", value: "등" },
    { label: "허리", value: "허리" },
    { label: "생식기", value: "생식기" },
    { label: "엉덩이", value: "엉덩이" },
  ];

  const classificationItems = [
    { label: "찰과상", value: "찰과상" },
    { label: "타박상", value: "타박상" },
    { label: "화상", value: "화상" },
    { label: "절상", value: "절상" },
    { label: "열상", value: "열상" },
    { label: "수술상처", value: "수술상처" },
    { label: "궤양", value: "궤양" },
    { label: "모름", value: "모름" },
  ];

  const emergencyLevelItems = [
    { label: "저위험", value: "저위험" },
    { label: "중위험", value: "중위험" },
    { label: "고위험", value: "고위험" },
  ];

  return (
    <ScrollView
      style={[styles.scrollview, styles.scrollviewLayout]}
      contentContainerStyle={styles.scrollView1Content}
    >
      <View style={styles.centerWrapper}>
        <View style={styles.frameParent}>
          <View style={[styles.dataPointParent, { marginTop: 30 }]}> 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.dataPoint, styles.dataPointFlexBox]}>{`<`}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>타임라인</Text>
          </View>
          <View style={styles.frameGroup}>
            <View style={styles.frameContainer}>
              <View style={[styles.parent, { marginBottom: 0 }]}>
                <Text style={[styles.text1, styles.textTypo]}>상태기록</Text>
                <View style={styles.eventDetails}>
                  <View style={[styles.wrapper, styles.frameLayout]}>
                    <TouchableOpacity
                      style={[
                        styles.dropdownpicker,
                        styles.frameDropdowndropDownContainer,
                      ]}
                      onPress={() => setShowCalendar(!showCalendar)}
                    >
                      <Text style={[
                        styles.frameDropdownValue,
                        !frameDropdownValue && styles.placeholderText
                      ]}>
                        {frameDropdownValue || "발생날짜"}
                      </Text>
                    </TouchableOpacity>
                    {showCalendar && (
                      <View style={styles.calendarContainer}>
                        <View style={styles.calendarHeader}>
                          <TouchableOpacity onPress={() => changeMonth(-1)}>
                            <Text style={styles.calendarHeaderText}>{'<'}</Text>
                          </TouchableOpacity>
                          <Text style={styles.calendarHeaderText}>
                            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                          </Text>
                          <TouchableOpacity onPress={() => changeMonth(1)}>
                            <Text style={styles.calendarHeaderText}>{'>'}</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.calendarWeekDays}>
                          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                            <Text key={day} style={styles.weekDayText}>{day}</Text>
                          ))}
                        </View>
                        <View style={styles.calendarDays}>
                          {renderCalendar()}
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={[styles.container, styles.frameLayout]}>
                    <DropDownPicker
                      style={[
                        styles.dropdownpicker,
                        styles.frameDropdown1dropDownContainer,
                      ]}
                      open={frameDropdown1Open}
                      setOpen={setFrameDropdown1Open}
                      value={frameDropdown1Value}
                      setValue={setFrameDropdown1Value}
                      placeholder="부위"
                      items={bodyPartItems}
                      labelStyle={styles.frameDropdown1Value}
                      placeholderStyle={styles.frameDropdown1Value}
                      textStyle={styles.frameDropdown1Text}
                      dropDownContainerStyle={styles.frameDropdown1dropDownContent}
                      zIndex={5000}
                      zIndexInverse={0}
                      dropDownDirection={"BOTTOM"}
                    />
                  </View>
                  <View style={[styles.frame, styles.frameLayout]}>
                    <DropDownPicker
                      style={[
                        styles.dropdownpicker2,
                        styles.dropdownpickerLayout,
                        styles.frameDropdown2dropDownContainer,
                      ]}
                      open={frameDropdown2Open}
                      setOpen={setFrameDropdown2Open}
                      value={frameDropdown2Value}
                      setValue={setFrameDropdown2Value}
                      placeholder="분류명"
                      items={classificationItems}
                      labelStyle={styles.frameDropdown2Value}
                      placeholderStyle={styles.frameDropdown2Value}
                      textStyle={styles.frameDropdown2Text}
                      dropDownContainerStyle={styles.frameDropdown2dropDownContent}
                      zIndex={4000}
                      zIndexInverse={0}
                      dropDownDirection={"BOTTOM"}
                    />
                  </View>
                  <View style={[styles.frameView, styles.frameLayout]}>
                    <DropDownPicker
                      style={[
                        styles.dropdownpicker3,
                        styles.dropdownpickerLayout,
                        styles.frameDropdown3dropDownContainer,
                      ]}
                      open={frameDropdown3Open}
                      setOpen={setFrameDropdown3Open}
                      value={frameDropdown3Value}
                      setValue={setFrameDropdown3Value}
                      placeholder="응급등급"
                      items={emergencyLevelItems}
                      labelStyle={styles.frameDropdown3Value}
                      placeholderStyle={styles.frameDropdown3Value}
                      textStyle={styles.frameDropdown3Text}
                      dropDownContainerStyle={styles.frameDropdown3dropDownContent}
                      zIndex={3000}
                      zIndexInverse={0}
                      dropDownDirection={"BOTTOM"}
                    />
                  </View>
                  <View style={styles.memoInputContainer}>
                    <TextInput
                      style={styles.memoInputWithButton}
                      placeholder="추가 메모"
                      placeholderTextColor="#bcbcbc"
                      value={memoText}
                      onChangeText={setMemoText}
                      multiline={true}
                      numberOfLines={3}
                    />
                    <TouchableOpacity
                      style={styles.memoButtonInside}
                      onPress={() => {
                        if (memoText.trim()) {
                          setSavedMemo(memoText);
                          setMemoText("");
                          setShowMemoInput(false);
                        }
                      }}
                    >
                      <Text style={styles.memoButtonText}>등록</Text>
                    </TouchableOpacity>
                  </View>
                  {savedMemo && (
                    <View style={styles.savedMemoContainer}>
                      <View style={styles.savedMemoHeader}>
                        <Text style={styles.savedMemoLabel}>등록된 메모:</Text>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => {
                            setMemoText(savedMemo);
                            setSavedMemo("");
                          }}
                        >
                          <Text style={styles.editButtonText}>편집</Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.savedMemoText}>{savedMemo}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.overlayShapeWrapper}>
                <Image
                  style={[styles.overlayShapeIcon, styles.scrollviewLayout]}
                  contentFit="cover"
                  source={selectedImageUri ? { uri: selectedImageUri } : require("../assets/21.png")}
                />
              </View>
            </View>
            <Pressable style={[styles.framePressable, styles.dataPointFlexBox]} onPress={() => {
              // 날짜 포맷팅 (예: "7월 9일" 형태로)
              const formatDateForDisplay = (dateString: string) => {
                if (!dateString) return "";
                // "YYYY.MM.DD" 형태의 문자열을 파싱
                const parts = dateString.split('.');
                if (parts.length === 3) {
                  const month = parseInt(parts[1]);
                  const day = parseInt(parts[2]);
                  return `${month}월 ${day}일`;
                }
                return "";
              };

              // 기록 완료 시 모든 데이터를 Timelinemain으로 전달
              navigation.navigate("Timelinemain", {
                selectedImageUri,
                recordDate: frameDropdownValue ? formatDateForDisplay(frameDropdownValue) : "",
                recordClassification: frameDropdown2Value || "",
                recordBodyPart: frameDropdown1Value || "",
                recordEmergencyLevel: frameDropdown3Value || "",
              });
            }}>
              <Text style={[styles.text2, styles.textTypo]}>기록 완료</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  frameDropdownValue: {
    color: "#2c2c2c",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  frameDropdownText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  frameDropdowndropDownContainer: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    minHeight: 54,
    height: 54,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  frameDropdowndropDownContent: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  frameDropdown1Value: {
    color: "#2c2c2c",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  frameDropdown1Text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  frameDropdown1dropDownContainer: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    minHeight: 54,
    height: 54,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  frameDropdown1dropDownContent: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  frameDropdown2Value: {
    color: "#2c2c2c",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  frameDropdown2Text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  frameDropdown2dropDownContainer: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    minHeight: 54,
    height: 54,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  frameDropdown2dropDownContent: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  frameDropdown3Value: {
    color: "#2c2c2c",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  frameDropdown3Text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  frameDropdown3dropDownContainer: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    minHeight: 54,
    height: 54,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  frameDropdown3dropDownContent: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  scrollView1Content: {
    flexDirection: "row",
    paddingHorizontal: 21,
    paddingVertical: 29,
    alignItems: "center",
    justifyContent: "center", // 중앙정렬
    minHeight: 844,
    width: "100%",
  },
  centerWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollviewLayout: {
    maxWidth: "100%",
    width: "100%",
  },
  dataPointFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  frameLayout: {
    height: 54,
    borderStyle: "solid",
    borderRadius: Border.br_8,
    alignSelf: "stretch",
  },
  dropdownpickerLayout: {
    paddingVertical: Padding.p_14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    height: 54,
    minHeight: 54,
    borderStyle: "solid",
    backgroundColor: Color.bgFooter,
  },
  dataPoint: {
    height: 24,
    width: 17,
    fontSize: FontSize.size_20,
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textTransform: "uppercase",
    justifyContent: "center",
    color: Color.colorBlack,
    letterSpacing: -0.4,
  },
  text: {
    height: 27,
    width: 83,
    fontSize: FontSize.size_22,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    textTransform: "uppercase",
    letterSpacing: -0.4,
    alignItems: "center",
  },
  dataPointParent: {
    width: 202,
    justifyContent: "space-between",
    gap: 0,
    alignItems: "center",
    flexDirection: "row",
  },
  text1: {
    fontSize: FontSize.size_30,
    letterSpacing: -0.6,
    alignSelf: "stretch",
    color: Color.colorBlack,
    textAlign: "left",
  },
  dropdownpicker: {
    paddingVertical: Padding.p_15,
    borderRadius: 8,
    height: 54,
    minHeight: 54,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    paddingHorizontal: Padding.p_12,
    borderStyle: "solid",
    backgroundColor: Color.bgFooter,
  },
  wrapper: {
    zIndex: 6000,
  },
  container: {
    zIndex: 5000,
  },
  dropdownpicker2: {
    paddingHorizontal: Padding.p_12,
    paddingVertical: Padding.p_14,
  },
  frame: {
    zIndex: 4000,
  },
  dropdownpicker3: {
    paddingHorizontal: Padding.p_15,
  },
  frameView: {
    zIndex: 3000,
  },
  eventDetailsChild: {
    paddingHorizontal: 13,
    paddingVertical: Padding.p_16,
    fontSize: FontSize.size_18,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    height: 54,
    borderStyle: "solid",
    borderRadius: Border.br_8,
    alignSelf: "stretch",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.bgFooter,
    width: "100%",
  },
  memoInputContainer: {
    position: 'relative',
    alignSelf: "stretch",
  },
  memoInputWithButton: {
    paddingHorizontal: 13,
    paddingVertical: Padding.p_16,
    paddingRight: 80,
    fontSize: FontSize.size_18,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    minHeight: 54,
    borderStyle: "solid",
    borderRadius: Border.br_8,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    backgroundColor: Color.bgFooter,
    width: "100%",
    textAlignVertical: 'top',
  },
  memoButtonInside: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: Color.colorMediumseagreen100,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  memoButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -2,
  },
  memoButton: {
    backgroundColor: Color.colorMediumseagreen100,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  memoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  savedMemoContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  savedMemoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  savedMemoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  savedMemoText: {
    fontSize: 16,
    color: '#2c2c2c',
    lineHeight: 22,
  },
  eventDetails: {
    gap: 13,
    zIndex: 5000,
    alignSelf: "stretch",
  },
  parent: {
    width: 328,
    gap: Gap.gap_16,
  },
  overlayShapeIcon: {
    overflow: "hidden",
    height: 205,
    borderRadius: Border.br_10,
    alignSelf: "stretch",
    maxWidth: "100%",
    width: "100%",
  },
  overlayShapeWrapper: {
    padding: Padding.p_10,
    alignSelf: "stretch",
  },
  frameContainer: {
    gap: Gap.gap_2,
    alignSelf: "stretch",
    alignItems: "center",
  },
  text2: {
    height: 25,
    width: 84,
    fontSize: 21,
    color: Color.bgFooter,
    textAlign: "left",
    letterSpacing: -0.4,
  },
  framePressable: {
    width: 333,
    backgroundColor: Color.colorMediumseagreen100,
    height: 70,
    paddingHorizontal: 125,
    paddingVertical: Padding.p_22,
    borderRadius: Border.br_10,
    flexDirection: "row",
  },
  frameGroup: {
    gap: 1,
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameParent: {
    width: "100%",
    maxWidth: 348,
    alignSelf: "center",
    gap: 24,
  },
  scrollview: {
    flex: 1,
    backgroundColor: Color.bgFooter,
    maxWidth: "100%",
    width: "100%",
  },
  calendarContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 16,
    zIndex: 7000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c2c2c',
  },
  calendarWeekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayText: {
    fontSize: 16,
    color: '#2c2c2c',
  },
  selectedDay: {
    backgroundColor: Color.colorMediumseagreen100,
    borderRadius: 20,
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '600',
  },
  today: {
    borderWidth: 2,
    borderColor: Color.colorMediumseagreen100,
    borderRadius: 20,
  },
  todayText: {
    fontWeight: '600',
  },
  placeholderText: {
    color: '#bcbcbc',
  },
});

export default Component10;
