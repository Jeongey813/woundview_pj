import axios from "axios";

// API URL 설정 - 환경변수가 없으면 기본값 사용
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30초 타임아웃
});

// 요청 인터셉터 - 로깅 추가
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 로깅 추가
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Mock API 함수들 (테스트용) ---------------------------------------------------------------------
const mockAnalyzeImage = (recordId: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          prediction: `mock-prediction-for-record-${recordId}`,
          wound_width: 12.3,
          wound_height: 8.7,
          wound_area: 107.01,
        }
      });
    }, 2000); // 2초 지연
  });
};

const mockGenerateAdvice = (params: {
  prediction: string;
  wound_width?: number | string;
  wound_height?: number | string;
  wound_area?: number | string;
  redness?: string;
  date?: string;
  bodyPart?: string;
  classification?: string;
  cause?: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          advice: [
            "상처 부위를 청결하게 유지하세요.",
            "필요시 의료진과 상담하세요.",
            `예측 결과: ${params.prediction}`,
            `상처 크기: ${params.wound_width ?? '-'} x ${params.wound_height ?? '-'} mm`,
            params.redness ? `홍반: ${params.redness}` : undefined,
          ].filter(Boolean)
        }
      });
    }, 2000); // 2초 지연
  });
};

const mockSaveWoundRecord = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { result: "success", ...params } });
    }, 1000);
  });
};


// 실제 구동 함수들  ---------------------------------------------------------------------------------

export const uploadWoundImage = (formData: FormData) => {
  return api.post("/upload", formData, {
    headers: { 
      "Content-Type": "multipart/form-data",
      // 필요한 경우 인증 헤더 추가
      // "Authorization": `Bearer ${token}`,
    },
  });
};

export const analyzeImage = async (recordId: number) => {
  try {
    // 실제 API 호출 시도
    return await api.post("/predict-image", { 
      record_id: recordId
    }, {
      headers: {
        "Content-Type": "application/json",
        // 필요한 경우 인증 헤더 추가
        // "Authorization": `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    // API 서버가 없거나 403 에러인 경우 Mock 데이터 사용
    if (error.response?.status === 403 || error.response?.status === 404 || !error.response) {
      console.log('API 서버 연결 실패, Mock 데이터 사용');
      return mockAnalyzeImage(recordId);
    }
    throw error;
  }
};


export const generateAdvice = async (params: {
  prediction: string;
  wound_width?: number | string;
  wound_height?: number | string;
  wound_area?: number | string;
  redness?: string;
  date?: string;
  bodyPart?: string;
  classification?: string;
  cause?: string;
}) => {
  try {
    return await api.post("/generate-advice", params, {
      headers: {
        "Content-Type": "application/json",
        // 필요한 경우 인증 헤더 추가
        // "Authorization": `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    // API 서버가 없거나 403/404 에러인 경우 Mock 데이터 사용
    if (error.response?.status === 403 || error.response?.status === 404 || !error.response) {
      console.log('API 서버 연결 실패, Mock 조언 데이터 사용');
      return mockGenerateAdvice(params);
    }
    throw error;
  }
};


export const saveWoundRecord = async (params: {
  user_id?: number;
  image_path: string;
  prediction: string;
  advice: string;
  wound_width: number;
  wound_height: number;
  wound_area: number;
  risk_level: string;
  caution?: string;
}) => {
  try {
    return await api.post("/record", params, {
      headers: {
        "Content-Type": "application/json",
        // 필요한 경우 인증 헤더 추가
        // "Authorization": `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    // API 서버가 없거나 403/404 에러인 경우 Mock 데이터 사용
    if (error.response?.status === 403 || error.response?.status === 404 || !error.response) {
      console.log('API 서버 연결 실패, Mock wound 기록 데이터 사용');
      return mockSaveWoundRecord(params);
    }
    throw error;
  }
};

// ========================= 백이랑 맞춰둠 =========================


export const sendChatMessage = (message: string) => {
  return api.post("/chat", { 
    message 
  }, {
    headers: {
      "Content-Type": "application/json",
      // 필요한 경우 인증 헤더 추가
      // "Authorization": `Bearer ${token}`,
    },
  });
};
