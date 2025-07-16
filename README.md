# Recommended next steps:

### Note:

1. Make sure you have installed native code dependencies [here](https://reactnative.dev/docs/environment-setup#installing-dependencies)
2. Make sure your `node version` is minimum `23`.

---

## 📦 주요 API 구조 (2025.07 기준)

### 0. wound 기록 저장 (saveWoundRecord)
- 분석/조언 등 wound 관련 정보를 DB에 저장
- `/record` 엔드포인트 활용, 서버 미연결 시 mockSaveWoundRecord로 fallback

### 1. 이미지 업로드 및 분석 (record_id 기반)

#### 업로드
```typescript
const formData = new FormData();
formData.append('file', file);
const uploadRes = await uploadWoundImage(formData);
const recordId = uploadRes.data.record_id;
```

#### 분석
```typescript
const analysisRes = await analyzeImage(recordId);
// analysisRes.data: { prediction, wound_width, wound_height, wound_area }
```

- `/predict-image`는 이미지 파일 대신 `{ record_id: number }` JSON을 받음
- 서버는 DB에서 이미지 경로를 찾아 분석

### 2. Mock Analyze (테스트/오프라인 대응)
- API 서버 연결 실패 시, `mockAnalyzeImage(recordId)`가 fallback으로 동작
- 실제 API와 동일 구조의 mock 데이터 반환

### 3. wound 기록 저장 (saveWoundRecord)

#### 저장 예시
```typescript
const saveRes = await saveWoundRecord({
  user_id: 1,
  image_path: '/uploads/abc.jpg',
  prediction: '2단계',
  advice: '상처를 깨끗하게 유지하세요.',
  wound_width: 10.5,
  wound_height: 8.0,
  wound_area: 84.0,
  risk_level: '중간',
  caution: '감염 주의',
});
console.log(saveRes.data.result); // 'success'
```
- `/record`는 wound 기록(분석/조언 등)을 저장
- 서버 연결 실패 시 mockSaveWoundRecord로 fallback
- 오프라인/테스트 환경에서는 mockSaveWoundRecord({ ... })로 wound 기록 저장 시뮬레이션 가능

### 4. 테스트 코드
- `/tests/services/test_api_analyzeImage.ts` 참고
- 정상, 에러, 엣지케이스 모두 포함

---

### To preview and run the project on your device:

1. Open project folder in <u>Visual Studio Code</u>
2. Run `npm install` in the terminal
3. Run `npx expo start` in the terminal
4. Run on For iOS device (only on MacOS)
   1. Press `i` to view on iOS simulator or follow the instructions [here](https://docs.expo.dev/workflow/run-on-device/) to run on a physical device.
5. Run on For android device
   1. Press `a` to view on Android Virtual Device or follow the instructions [here](https://docs.expo.dev/workflow/run-on-device/) to run on a physical device.

---

## ⚡️ 구조 개선 요약
- 이미지 업로드 후 반환되는 record_id만으로 분석 API 호출 가능
- 네트워크 효율 및 UX 개선
- mockAnalyzeImage, mockSaveWoundRecord 등 mock 함수, 테스트 코드, 문서화 모두 최신화
