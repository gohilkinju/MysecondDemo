import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on standard ~375 width (iPhone 11)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const wp = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
export const hp = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;

/**
 * scaleFont - scale font size based on device width and pixel ratio
 * @param size base font size
 */
export const scaleFont = (size: number) => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  const newSize = size * scale;
  // round to nearest pixel
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};