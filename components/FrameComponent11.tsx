import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, PanResponder, Dimensions } from "react-native";
import Vector2 from "../assets/vector-2.svg";
import { Padding, Gap } from "../GlobalStyles";

interface FrameComponent11Props {
  selectedImageUri?: string;
  onCropBoxChange?: (cropBox: { x: number; y: number; width: number; height: number }) => void;
}

const IMAGE_WIDTH = 342;
const IMAGE_HEIGHT = 321;
const MIN_BOX_SIZE = 1; // 기존 60 → 1로 변경
const HANDLE_SIZE = 30; // Vector2 SVG size

const FrameComponent11: React.FC<FrameComponent11Props> = ({ selectedImageUri, onCropBoxChange }) => {
  // 크롭 박스 상태
  const [containerSize, setContainerSize] = React.useState({ width: IMAGE_WIDTH, height: IMAGE_HEIGHT });
  const [cropBox, setCropBox] = React.useState({
    x: 0,
    y: 0,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  });
  // 드래그/리사이즈 시작 시점의 값 저장
  const dragStart = React.useRef({ x: 0, y: 0 });
  const resizeStart = React.useRef({ x: 0, y: 0, width: 0, height: 0 });

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: () => {
        dragStart.current.x = cropBox.x;
        dragStart.current.y = cropBox.y;
      },
      onPanResponderMove: (e, gestureState) => {
        let newX = dragStart.current.x + gestureState.dx;
        let newY = dragStart.current.y + gestureState.dy;
        newX = Math.max(0, Math.min(newX, containerSize.width - cropBox.width));
        newY = Math.max(0, Math.min(newY, containerSize.height - cropBox.height));
        if (cropBox.width >= containerSize.width - 1) newX = 0;
        if (cropBox.height >= containerSize.height - 1) newY = 0;
        setCropBox(box => ({ ...box, x: newX, y: newY }));
      },
    })
  ).current;

  // 컨테이너 크기 변경 시 cropBox도 전체로 맞춤
  React.useEffect(() => {
    setCropBox(box => {
      // 사이즈가 바뀐 경우에만 전체로 리셋
      if (box.width !== containerSize.width || box.height !== containerSize.height) {
        return {
          x: 0,
          y: 0,
          width: containerSize.width,
          height: containerSize.height,
        };
      }
      return box;
    });
  }, [containerSize.width, containerSize.height]);

  // 리사이즈 핸들별 panResponder 생성
  const createResizeResponder = (corner: string) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        resizeStart.current = { x: cropBox.x, y: cropBox.y, width: cropBox.width, height: cropBox.height };
      },
      onPanResponderMove: (e, gestureState) => {
        let { dx, dy } = gestureState;
        let { x, y, width, height } = resizeStart.current;
        let minW = MIN_BOX_SIZE, minH = MIN_BOX_SIZE;
        if (corner === 'tl') {
          // 좌상단
          let newX = Math.min(x + dx, x + width - minW);
          let newY = Math.min(y + dy, y + height - minH);
          let newW = width - (newX - x);
          let newH = height - (newY - y);
          if (newX < 0) { newW += newX; newX = 0; }
          if (newY < 0) { newH += newY; newY = 0; }
          // 이미지 전체로 확장 허용
          if (newX === 0 && newY === 0) {
            newW = Math.max(minW, width + (x - newX));
            newH = Math.max(minH, height + (y - newY));
          }
          // 이미지 영역 내로 제한
          if (newX + newW > containerSize.width) newW = containerSize.width - newX;
          if (newY + newH > containerSize.height) newH = containerSize.height - newY;
          setCropBox(box => ({ ...box, x: newX, y: newY, width: newW, height: newH }));
        } else if (corner === 'tr') {
          // 우상단
          let newY = Math.min(y + dy, y + height - minH);
          let newW = Math.max(minW, width + dx);
          let newH = height - (newY - y);
          if (newY < 0) { newH += newY; newY = 0; }
          if (x + newW > containerSize.width) newW = containerSize.width - x;
          // 이미지 전체로 확장 허용
          if (y === 0 && newY === 0) {
            newW = Math.max(minW, width + dx);
          }
          // 이미지 영역 내로 제한
          if (x + newW > containerSize.width) newW = containerSize.width - x;
          if (newY + newH > containerSize.height) newH = containerSize.height - newY;
          setCropBox(box => ({ ...box, y: newY, width: newW, height: newH }));
        } else if (corner === 'bl') {
          // 좌하단
          let newX = Math.min(x + dx, x + width - minW);
          let newW = width - (newX - x);
          let newH = Math.max(minH, height + dy);
          if (newX < 0) { newW += newX; newX = 0; }
          if (y + newH > containerSize.height) newH = containerSize.height - y;
          // 이미지 전체로 확장 허용
          if (newX === 0 && y + newH > containerSize.height) {
            newW = Math.max(minW, width + (x - newX));
            newH = containerSize.height - y;
          }
          // 이미지 영역 내로 제한
          if (newX + newW > containerSize.width) newW = containerSize.width - newX;
          if (y + newH > containerSize.height) newH = containerSize.height - y;
          setCropBox(box => ({ ...box, x: newX, width: newW, height: newH }));
        } else if (corner === 'br') {
          // 우하단
          let newW = Math.max(minW, width + dx);
          let newH = Math.max(minH, height + dy);
          if (x + newW > containerSize.width) newW = containerSize.width - x;
          if (y + newH > containerSize.height) newH = containerSize.height - y;
          // 이미지 전체로 확장 허용
          if (x === 0 && y === 0) {
            newW = containerSize.width;
            newH = containerSize.height;
          }
          // 이미지 영역 내로 제한
          if (x + newW > containerSize.width) newW = containerSize.width - x;
          if (y + newH > containerSize.height) newH = containerSize.height - y;
          setCropBox(box => ({ ...box, width: newW, height: newH }));
        }
      },
    });
  };

  // 핸들별 panResponder
  const handleResponders = {
    tl: React.useRef(createResizeResponder('tl')).current,
    tr: React.useRef(createResizeResponder('tr')).current,
    bl: React.useRef(createResizeResponder('bl')).current,
    br: React.useRef(createResizeResponder('br')).current,
  };

  React.useEffect(() => {
    if (onCropBoxChange) {
      onCropBoxChange(cropBox);
    }
  }, [cropBox, onCropBoxChange]);

  return (
    <View style={styles.images11Parent}>
      <View
        style={[styles.imageContainer, { width: '100%', height: undefined, aspectRatio: IMAGE_WIDTH / IMAGE_HEIGHT }]}
        onLayout={e => {
          const { width, height } = e.nativeEvent.layout;
          setContainerSize({ width, height });
        }}
      >
        <Image
          style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }}
          contentFit="cover"
          source={selectedImageUri ? { uri: selectedImageUri } : require("../assets/images-1-11.png")}
        />
        {/* 오버레이: 크롭박스 바깥만 검정 80% */}
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          {/* 위 */}
          <View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: cropBox.y, backgroundColor: 'rgba(0,0,0,0.8)' }} />
          {/* 아래 */}
          <View style={{ position: 'absolute', left: 0, right: 0, top: cropBox.y + cropBox.height, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)' }} />
          {/* 왼쪽 */}
          <View style={{ position: 'absolute', left: 0, width: cropBox.x, top: cropBox.y, height: cropBox.height, backgroundColor: 'rgba(0,0,0,0.8)' }} />
          {/* 오른쪽 */}
          <View style={{ position: 'absolute', left: cropBox.x + cropBox.width, right: 0, top: cropBox.y, height: cropBox.height, backgroundColor: 'rgba(0,0,0,0.8)' }} />
        </View>
        {/* 크롭 박스 (드래그/리사이즈) */}
        <View
          style={{
            position: 'absolute',
            left: cropBox.x,
            top: cropBox.y,
            width: cropBox.width,
            height: cropBox.height,
            borderWidth: 2,
            borderColor: '#00b081',
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          {...panResponder.panHandlers}
        >
          {/* 4개 코너 핸들: Vector2로 대체 */}
          {/* 좌상단 */}
          <View style={{ position: 'absolute', left: -HANDLE_SIZE/2, top: -HANDLE_SIZE/2, width: HANDLE_SIZE, height: HANDLE_SIZE, zIndex: 20 }} {...handleResponders.tl.panHandlers}>
            <Vector2 width={HANDLE_SIZE} height={HANDLE_SIZE} />
          </View>
          {/* 우상단 */}
          <View style={{ position: 'absolute', right: -HANDLE_SIZE/2, top: -HANDLE_SIZE/2, width: HANDLE_SIZE, height: HANDLE_SIZE, zIndex: 20 }} {...handleResponders.tr.panHandlers}>
            <Vector2 width={HANDLE_SIZE} height={HANDLE_SIZE} style={{ transform: [{ rotate: '90deg' }] }} />
          </View>
          {/* 좌하단 */}
          <View style={{ position: 'absolute', left: -HANDLE_SIZE/2, bottom: -HANDLE_SIZE/2, width: HANDLE_SIZE, height: HANDLE_SIZE, zIndex: 20 }} {...handleResponders.bl.panHandlers}>
            <Vector2 width={HANDLE_SIZE} height={HANDLE_SIZE} style={{ transform: [{ rotate: '-90deg' }] }} />
          </View>
          {/* 우하단 */}
          <View style={{ position: 'absolute', right: -HANDLE_SIZE/2, bottom: -HANDLE_SIZE/2, width: HANDLE_SIZE, height: HANDLE_SIZE, zIndex: 20 }} {...handleResponders.br.panHandlers}>
            <Vector2 width={HANDLE_SIZE} height={HANDLE_SIZE} style={{ transform: [{ rotate: '180deg' }] }} />
          </View>
        </View>
        <View style={styles.vectorOverlay} pointerEvents="none">
          {/* 좌상단 */}
          {/* 기존 데코용 벡터는 제거 */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  images11: {
    width: 342,
    height: 321,
    zIndex: 0,
  },
  imageContainer: {
    position: "relative",
    width: 342,
    height: 321,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  frameChild: {},
  vectorOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 1,
  },
  images11Parent: {
    padding: 9,
    gap: Gap.gap_10,
    alignSelf: "stretch",
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default FrameComponent11;
