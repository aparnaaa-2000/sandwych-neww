import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import {
  BACKGROUNDWHITE,
  DEFAULTGRAY,
  LINECOLOR1,
  MEDSITEMCOLOR3,
  PLACEHOLDERCOLOR3,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR7,
  TEXTCOLORW,
} from '../Colors/Colors';
import { FONTS } from '../Fonts';
import { GlobalSize, fontSize } from '../ResponsiveFont/ResponsiveFonts';

export const DEFAULTWIDTH = Dimensions.get('window').width;
export const DEFAULTHEIGHT = Dimensions.get('window').height;

const DEFAULTSTYLES = StyleSheet.create({
  AndroidSafeArea: {
    width: DEFAULTWIDTH,
    height: DEFAULTHEIGHT,
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight - 15 : 0,
  },
  iosShadow: {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: PLACEHOLDERCOLOR3,
    shadowOpacity: 0.3,
  },
  androidShadow: {
    elevation: 1,
  },
  marginLeft: {
    marginLeft: DEFAULTWIDTH * 0.05,
  },
  margin: {
    margin: DEFAULTWIDTH * 0.05
  },
  medMarginLeft: {
    marginLeft: DEFAULTWIDTH * 0.02
  },
  medMarginRight: {
    marginRight: DEFAULTWIDTH * 0.02
  },
  medMarginTop: {
    marginTop: DEFAULTWIDTH * 0.02
  },
  medMarginBottom: {
    marginBottom: DEFAULTWIDTH * 0.02
  },
  dateView: {
    borderWidth: 1,
    borderRadius: GlobalSize(15),
    padding: GlobalSize(3),
    borderColor: PRIMARYCOLOR,
    backgroundColor: MEDSITEMCOLOR3,
  },
  dateText: {
    color: PUREWHITE,
    fontSize: fontSize(12),
    fontFamily: FONTS.FontBold
  },
  lineBorder: {
    backgroundColor: LINECOLOR1,
    height: 1,
    marginHorizontal: DEFAULTWIDTH * 0.04,
    marginBottom: DEFAULTHEIGHT * 0.011,
  },
  medPhysicianName: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontBold,
    color: TEXTCOLORW,
  },
  seeAll: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(14),
    color: PRIMARYCOLOR,
  },
  subHeader: {
    fontFamily: FONTS.FontBold,
    fontSize: fontSize(20),
    color: TEXTCOLOR7
  },
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginHorizontal: DEFAULTWIDTH * 0.03,
    marginVertical: DEFAULTHEIGHT * 0.02,
  },
  alignView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeModalView: {
    backgroundColor: PRIMARYCOLOR,
    width: DEFAULTWIDTH * 0.06,
    height: DEFAULTWIDTH * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: GlobalSize(15),
  },
  closeText: {
    color: PUREWHITE,
    fontFamily: FONTS.FontBold
  },
  modalText: {
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR,
    fontSize: fontSize(15),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DEFAULTSTYLES;
