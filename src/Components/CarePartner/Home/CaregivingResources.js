import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

//IMPORT CONSTANTS
import {
  GREYBACKGROUND1,
  LINECOLOR1,
  TEXTCOLOR10,
  TEXTCOLOR5,
  TEXTCOLOR7,
} from '../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import ReadMoreText from '../../Common/ReadMoreText';

//IMPORT PACKAGES
import FastImage from 'react-native-fast-image';

const CaregivingResources = ({communityNews}) => {
  
  return (
    <>
    {communityNews?.map((item)=>{
      return(
<>
      <View style={{ marginTop: GlobalSize(2), marginHorizontal: GlobalSize(10) }}>
        <View style={styles.lineBoder} />
        <View style={styles.headView}>
          <Text style={styles.headingText}>{item?.title}</Text>
        </View>
      </View>

      <View style={DEFAULTSTYLES.alignView}>
        <View
          style={[
            styles.viewCard,
            Platform.OS == 'android'
              ? DEFAULTSTYLES.androidShadow
              : DEFAULTSTYLES.iosShadow,
          ]}>
          {/* <Text style={styles.textDesc}>{item?.title}</Text> */}
          <ReadMoreText text={item?.description}/>

          <FastImage
            style={styles.imageView}
            source={{
              uri:item?.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

          <TouchableOpacity>
            <Text style={styles.dismiss}>DISMISS</Text>
          </TouchableOpacity>
        </View>
      </View>
              </>
            )
          })}
    </>
  );
};

const styles = new StyleSheet.create({
  lineBoder: {
    backgroundColor: LINECOLOR1,
    height: 1,
    margin: GlobalSize(10),
  },
  headingText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize(14),
  },
  viewCard: {
    width: DEFAULTWIDTH * 0.90,
    backgroundColor: GREYBACKGROUND1,
    elevation: 5,
    margin: GlobalSize(10),
    borderRadius: GlobalSize(8),
    padding: GlobalSize(15),
  },
  imageView: {
    height: DEFAULTWIDTH * 0.45,
    width: DEFAULTWIDTH * 0.818,
    borderRadius: GlobalSize(8),
    marginVertical: GlobalSize(10),
    alignItems: 'baseline',
  },
  descText: {
    color: TEXTCOLOR5,
    fontFamily: 'Inter-Regular',
    fontSize: fontSize(14),
    marginTop: GlobalSize(5),
  },
  textDesc: {
    color: TEXTCOLOR10,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
  },
  dismiss: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
    color: TEXTCOLOR5,
  },
  headView: {
    marginTop: GlobalSize(10),
    marginLeft: DEFAULTWIDTH * 0.02,
    marginBottom: GlobalSize(5)
  }
});

export default CaregivingResources;
