import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Pressable, TouchableOpacity } from "react-native";
// @ts-ignore
import { Calendar } from 'react-native-calendars';
// import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import {
  Border,
  Padding,
  Color,
  FontFamily,
  FontSize,
  Gap,
} from "../GlobalStyles";

interface ContainerProps {
  initialDate?: Date | null;
  initialBodyPart?: string | null;
  initialClassification?: string | null;
  initialCause?: string | null;
  onDataChange?: (data: {
    date: Date | null;
    bodyPart: string | null;
    classification: string | null;
    cause: string | null;
    directInput: string;
  }) => void;
}

const Container: React.FC<ContainerProps> = ({
  initialDate = null,
  initialBodyPart = null,
  initialClassification = null,
  initialCause = null,
  onDataChange
}) => {
  const navigation = useNavigation() as any;
  const [descriptorGridDatePicker, setDescriptorGridDatePicker] = useState<Date | null>(initialDate);
  const [descriptorGridOpen, setDescriptorGridOpen] = useState(false);
  const [descriptorGridValue, setDescriptorGridValue] = useState<string | null>(initialBodyPart);
  const [descriptorGrid1Open, setDescriptorGrid1Open] = useState(false);
  const [descriptorGrid1Value, setDescriptorGrid1Value] = useState<string | null>(initialClassification);
  const [descriptorGrid2Open, setDescriptorGrid2Open] = useState(false);
  const [descriptorGrid2Value, setDescriptorGrid2Value] = useState<string | null>(initialCause);
  const [directInput, setDirectInput] = useState("");
  const [registeredText, setRegisteredText] = useState<string>("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  // 초기값 설정
  useEffect(() => {
    setDescriptorGridDatePicker(initialDate);
    setDescriptorGridValue(initialBodyPart);
    setDescriptorGrid1Value(initialClassification);
    setDescriptorGrid2Value(initialCause);
  }, [initialDate, initialBodyPart, initialClassification, initialCause]);

  // 데이터 변경 시 콜백 호출
  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        date: descriptorGridDatePicker,
        bodyPart: descriptorGridValue,
        classification: descriptorGrid1Value,
        cause: descriptorGrid2Value,
        directInput: registeredText || directInput
      });
    }
  }, [descriptorGridDatePicker, descriptorGridValue, descriptorGrid1Value, descriptorGrid2Value, registeredText, directInput, onDataChange]);

  const handleRegister = () => {
    if (directInput.trim() !== "") {
      console.log("직접작성 등록:", directInput);
      setRegisteredText(directInput.trim());
      setDirectInput("");
      setIsInputDisabled(true);
    }
  };

  const handleEdit = () => {
    setDirectInput(registeredText);
    setRegisteredText("");
    setIsInputDisabled(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={[styles.text, styles.aiFlexBox]}>체크리스트</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.descriptorGridParent}>
        {/* 날짜 선택 버튼 및 Calendar */}
        <TouchableOpacity
          style={[
            {
              minHeight: 54,
              height: 54,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 14,
              backgroundColor: "#fff",
              borderColor: "#d3d3d3",
              borderWidth: 1,
              justifyContent: 'center',
              marginBottom: 1,
            },
          ]}
          onPress={() => setCalendarVisible(!calendarVisible)}
        >
          <Text style={{ color: descriptorGridDatePicker ? "#222" : "#bcbcbc", fontSize: 18, fontWeight: '500', fontFamily: 'Inter-Medium' }}>
            {descriptorGridDatePicker
              ? `${descriptorGridDatePicker.getDate().toString().padStart(2, '0')}/` +
                `${(descriptorGridDatePicker.getMonth() + 1).toString().padStart(2, '0')}/` +
                `${descriptorGridDatePicker.getFullYear()}`
              : "dd/mm/yyyy"}
          </Text>
        </TouchableOpacity>
        {calendarVisible && (
          <View style={{ alignSelf: 'stretch', marginBottom: 10 }}>
            <Calendar
              onDayPress={(day: any) => {
                setDescriptorGridDatePicker(new Date(day.dateString));
                setCalendarVisible(false);
              }}
              markedDates={
                descriptorGridDatePicker
                  ? {
                      [descriptorGridDatePicker.toISOString().split('T')[0]]: {
                        selected: true,
                        selectedColor: '#00b081',
                      },
                    }
                  : {}
              }
              theme={{
                selectedDayBackgroundColor: '#00b081',
                todayTextColor: '#00b081',
                arrowColor: '#00b081',
              }}
              style={{ borderRadius: 8, elevation: 2 }}
        />
          </View>
        )}
        {/* DropDownPicker(부위) 등 아래 컨텐츠 */}
        <View style={[styles.descriptorGrid, styles.descriptorLayout]}>
          <DropDownPicker
            style={[
              styles.dropdownpicker,
              styles.dropdownpickerLayout,
              styles.descriptorGriddropDownContainer,
            ]}
            open={descriptorGridOpen}
            setOpen={setDescriptorGridOpen}
            value={descriptorGridValue}
            setValue={setDescriptorGridValue}
            placeholder="부위"
            items={[
              { label: '머리', value: '머리' },
              { label: '얼굴', value: '얼굴' },
              { label: '어깨', value: '어깨' },
              { label: '가슴', value: '가슴' },
              { label: '배', value: '배' },
              { label: '팔', value: '팔' },
              { label: '손', value: '손' },
              { label: '다리', value: '다리' },
              { label: '발', value: '발' },
              { label: '등', value: '등' },
              { label: '허리', value: '허리' },
              { label: '생식기', value: '생식기' },
              { label: '엉덩이', value: '엉덩이' },
            ]}
            labelStyle={styles.descriptorGridValue}
            placeholderStyle={styles.descriptorGridValue}
            dropDownContainerStyle={{ ...styles.descriptorGriddropDownContent, zIndex: 5000 }}
            zIndex={5000}
            zIndexInverse={0}
            listMode="SCROLLVIEW"
            dropDownDirection="AUTO"
          />
        </View>
        <View style={[styles.descriptorGrid1, styles.descriptorLayout]}>
          <DropDownPicker
            style={[
              styles.dropdownpicker1,
              styles.dropdownpickerLayout,
              styles.descriptorGrid1dropDownContainer,
            ]}
            open={descriptorGrid1Open}
            setOpen={setDescriptorGrid1Open}
            value={descriptorGrid1Value}
            setValue={setDescriptorGrid1Value}
            placeholder="분류"
            items={[
              { label: '찰과상', value: '찰과상' },
              { label: '타박상', value: '타박상' },
              { label: '화상', value: '화상' },
              { label: '절상', value: '절상' },
              { label: '열상', value: '열상' },
              { label: '수술상체', value: '수술상체' },
              { label: '궤양', value: '궤양' },
              { label: '모름', value: '모름' },
            ]}
            labelStyle={styles.descriptorGrid1Value}
            placeholderStyle={styles.descriptorGrid1Value}
            dropDownContainerStyle={{ ...styles.descriptorGrid1dropDownContent, zIndex: 5000 }}
            zIndex={5000}
            zIndexInverse={0}
            listMode="SCROLLVIEW"
            dropDownDirection="AUTO"
          />
        </View>
        <View style={[styles.descriptorGrid2, styles.descriptorLayout]}>
          <DropDownPicker
            style={[
              styles.dropdownpicker1,
              styles.dropdownpickerLayout,
              styles.descriptorGrid2dropDownContainer,
            ]}
            open={descriptorGrid2Open}
            setOpen={setDescriptorGrid2Open}
            value={descriptorGrid2Value}
            setValue={setDescriptorGrid2Value}
            placeholder="원인"
            items={[
              { label: '날카로운 물체에 베임', value: '날카로운 물체에 베임' },
              { label: '넘어짐 / 충돌', value: '넘어짐 / 충돌' },
              { label: '화상 / 뜨거운 물질 접촉', value: '화상 / 뜨거운 물질 접촉' },
              { label: '날짐승 / 곤충에 물림', value: '날짐승 / 곤충에 물림' },
              { label: '수술 또는 시술 후 상처', value: '수술 또는 시술 후 상처' },
              { label: '피부 긁힘 / 마찰', value: '피부 긁힘 / 마찰' },
              { label: '압박 또는 눌림', value: '압박 또는 눌림' },
              { label: '자해 또는 반복적 행동', value: '자해 또는 반복적 행동' },
              { label: '알 수 없음 / 기억 안 남', value: '알 수 없음 / 기억 안 남' },
              { label: '기타 (직접 입력)', value: '기타 (직접 입력)' },
            ]}
            labelStyle={styles.descriptorGrid2Value}
            placeholderStyle={styles.descriptorGrid2Value}
            dropDownContainerStyle={{ ...styles.descriptorGrid2dropDownContent, zIndex: 5000 }}
            zIndex={5000}
            zIndexInverse={0}
            listMode="SCROLLVIEW"
            dropDownDirection="AUTO"
          />
        </View>
        <View style={styles.descriptorGrid3}>
          <TextInput
            style={[styles.textInputOnly, isInputDisabled && styles.disabledInput]}
            placeholder="직접작성"
            placeholderTextColor="#bcbcbc"
            value={directInput}
            onChangeText={setDirectInput}
            onSubmitEditing={handleRegister}
            returnKeyType="done"
            editable={!isInputDisabled}
          />
          <Pressable 
            style={[styles.registerButton, isInputDisabled && styles.disabledButton]} 
            onPress={handleRegister}
            disabled={isInputDisabled}
          >
            <Text style={styles.registerButtonText}>등록</Text>
          </Pressable>
        </View>
        {registeredText && (
          <View style={styles.registeredTextsContainer}>
            <View style={styles.registeredTextItem}>
              <Text style={styles.registeredText}>{registeredText}</Text>
              <Pressable style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.editButtonText}>수정</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptorGridDatePickerValue: {},
  descriptorGridValue: {
    color: "#2c2c2c",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  descriptorGriddropDownContainer: {
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
  descriptorGriddropDownContent: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  descriptorGrid1Value: {
    color: "#2c2c2c",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  descriptorGrid1dropDownContainer: {
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
  descriptorGrid1dropDownContent: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  descriptorGrid2Value: {
    color: "#2c2c2c",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  descriptorGrid2dropDownContainer: {
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
  descriptorGrid2dropDownContent: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  aiFlexBox: {
    textAlign: "left",
    alignSelf: "stretch",
  },
  descriptorLayout: {
    minHeight: 54,
    borderStyle: "solid",
    borderRadius: Border.br_8,
    alignSelf: "stretch",
  },
  dropdownpickerLayout: {
    borderRadius: 8,
    minHeight: 54,
    paddingHorizontal: Padding.p_12,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    backgroundColor: Color.bgFooter,
    borderStyle: "solid",
  },
  ai: {
    letterSpacing: -0.5,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorMediumseagreen100,
    fontSize: FontSize.size_18,
    textAlign: "left",
  },
  text: {
    fontSize: FontSize.size_32,
    letterSpacing: -0.6,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
  },
  details: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownpicker: {
    paddingVertical: Padding.p_15,
  },
  descriptorGrid: {
    zIndex: 5000,
    alignSelf: "stretch",
  },
  dropdownpicker1: {
    paddingVertical: Padding.p_14,
  },
  descriptorGrid1: {
    zIndex: 4000,
    alignSelf: "stretch",
  },
  descriptorGrid2: {
    zIndex: 3000,
    alignSelf: "stretch",
  },
  descriptorGrid3: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Padding.p_14,
    paddingVertical: Padding.p_16,
    borderBottomWidth: 1,
    borderColor: Color.colorLightgray,
    height: 54,
    alignSelf: "stretch",
  },
  textInputOnly: {
    flex: 1,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    fontSize: FontSize.size_18,
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  disabledInput: {
    color: '#bcbcbc',
    opacity: 0.7,
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
    opacity: 0.7,
  },
  descriptorGridParent: {
    gap: 9,
    zIndex: 5000,
    alignSelf: "stretch",
  },
  container: {
    gap: Gap.gap_15,
    alignSelf: 'stretch',
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 4,
  },
  registerButton: {
    marginLeft: 8,
    backgroundColor: Color.colorMediumseagreen100,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: FontFamily.interSemiBold,
  },
  registeredTextsContainer: {
    paddingHorizontal: Padding.p_14,
    paddingVertical: Padding.p_16,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    backgroundColor: Color.bgFooter,
    borderStyle: "solid",
    borderRadius: Border.br_8,
    alignSelf: "stretch",
  },
  registeredTextsTitle: {
    fontSize: FontSize.size_16,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    marginBottom: 8,
  },
  registeredTextItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightgray,
  },
  registeredText: {
    fontSize: FontSize.size_14,
    fontFamily: FontFamily.interMedium,
    color: Color.colorBlack,
  },
  editButton: {
    backgroundColor: Color.colorMediumseagreen100,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: FontFamily.interSemiBold,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: Color.colorBlack,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: FontFamily.interSemiBold,
  },
});

export default Container;
