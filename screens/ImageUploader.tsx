import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { uploadWoundImage } from '../services/api';
import { Color, FontFamily, FontSize, Border, Padding } from '../GlobalStyles';

const ImageUploader = () => {
  const [imageUri, setImageUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation() as any;
  const route = useRoute();
  
  // 체크리스트 데이터 받기
  const checklistData = (route.params as any)?.checklistData;

  // ✅ 테스트용: 권한 허용 가정하고 바로 이미지 선택
  useEffect(() => {
    pickImage();
  }, []);

  const pickImage = async () => {
    try {
      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImageUri(uri);

        // 테스트용: 업로드 성공/실패와 관계없이 바로 ImageEditor로 이동
        try {
          // 업로드 시도 (실패해도 계속 진행)
          const formData = new FormData();
          formData.append('file', {
            uri,
            name: 'image.jpg',
            type: 'image/jpeg',
          } as any);

          await uploadWoundImage(formData);
          console.log('업로드 성공');
        } catch (uploadError) {
          console.log('업로드 실패 (테스트용으로 계속 진행):', uploadError);
        }

        // ImageEditor로 이동하면서 이미지 URI와 체크리스트 데이터 전달
        navigation.navigate('ImageEditor', { 
          selectedImageUri: uri,
          checklistData 
        });
      } else {
        // 이미지 선택을 취소한 경우 PhotoOption으로 돌아가기
        navigation.goBack();
      }
    } catch (error) {
      console.error('이미지 선택 실패:', error);
      // 에러 발생 시 PhotoOption으로 돌아가기
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  // UI를 표시하지 않고 로딩 상태만 표시
  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>이미지 업로드 중...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bgFooter,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FontSize.size_16,
    fontFamily: FontFamily.interMedium,
    color: Color.colorBlack,
  },
});

export default ImageUploader;
