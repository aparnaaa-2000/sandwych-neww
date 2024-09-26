import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export const fontSize = (size) => {
  return moderateScale(size);
};

export const height = (size) => {
  return verticalScale(size);
};

export const width = (size) => {
  return scale(size);
};

export const GlobalSize = (size) => {
  return moderateScale(size);
};