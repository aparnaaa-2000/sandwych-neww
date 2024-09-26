import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

//IMPORT CONSTANTS
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';
import {
  FOURTHCOLOR,
  LINECOLOR1,
  PRIMARYCOLOR,
  PUREWHITE,
  TRANSPARENTCOLOR1,
  TRANSPARENTCOLOR2,
} from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { WhiteArrowL, WhiteArrowR } from '../../../../assets';
import { ASSESSMENTDESC } from '../../../Constants/RequiredArrays';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT PACKAGES
import * as Progress from 'react-native-progress';


// Except the font size - other sections were handled accoridng to Default width and size

const AssessmentProgress = ({ navigation, assignedTasks, data }) => {

  const [currentItem, setCurrentItem] = useState(0);

  const handlePrev = () => {
    setCurrentItem(
      currentItem === 0 ? data[0]?.assessment_titles?.length - 1 : currentItem - 1,
    );
  };

  const handleNext = () => {
    setCurrentItem(
      currentItem === data[0]?.assessment_titles?.length - 1 ? 0 : currentItem + 1,
    );
  };


  return (
    <>

      {data?.map((item) => {
   
        return (
          <View>
            <View style={styles.container}>
              <View style={styles.cardBlue}>
                <View style={styles.centerView}>
           
                  <View>
                    <Text style={[styles.textAssess]}>{item?.task_name}</Text>
                  </View>



                  {/* Button to Resume the Assessment - it will only be shown if the assessment is not complted or started*/}
                  <TouchableOpacity style={styles.cardResume}
                 onPress={()=>
                  {
                    navigation.navigate('EnrollmentProgress',{titleNames:item})}}>
                    <Text style={styles.resumeTextButton}>Resume</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.viewPercent}>
                  <View style={{ marginRight: 10 }}>
                    {/* Percentage of the Overall Assessment should be calculated and shown */}
                    <Text style={[styles.mainPercentage]}>{item?.task_completion_percentage.toFixed(0)} %</Text>
                  </View>

                  <View>
                    <View>
                      <Progress.Bar
                        progress={item?.task_completion_percentage.toFixed(0)/100}
                        width={DEFAULTWIDTH * 0.55}
                        height={6}
                        color={FOURTHCOLOR}
                        unfilledColor={PUREWHITE}
                        borderWidth={0}
                      />
                    </View>
                    <View>
                      <Text style={[styles.mainTitle]}>Overall Assessment Score</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.cardLight}>
                        <View style={styles.lightCardRow}>
                  <View style={{ marginRight: 5 }}>
                    <Text style={styles.subAssessmentPercentage}>
                      {item?.assessment_titles[currentItem]?.completion_percentage?.toFixed(0)}%
                    </Text>
                  </View>
                  <Text style={styles.assessmentInfo}>
                    <Text style={styles.assessmentTitle}>
                      {item?.assessment_titles[currentItem]?.title_name}{' '}
                    </Text>
                    <Text style={styles.assessmentDescription}>
                      {ASSESSMENTDESC[currentItem]?.description}
                    </Text>
                  </Text>
                </View>

                <View style={styles.arrowLineContainer}>
                  <TouchableOpacity onPress={handlePrev}>
                    <WhiteArrowL />
                  </TouchableOpacity>
                  <View style={styles.linesContainer}>
                    {item?.assessment_titles?.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.line,
                          index === currentItem ? styles.highlightedLine : null,
                        ]}
                      />
                    ))}
                  </View>

                  <TouchableOpacity onPress={handleNext}>
                    <WhiteArrowR />
                  </TouchableOpacity>
                </View>
                
                </View>
            
            
            </View>
       
          </View>
        )
      })}

    </>
  );
};

export default AssessmentProgress;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:GlobalSize(10)
  },
  cardBlue: {
    width: DEFAULTWIDTH * 0.9,
    paddingBottom: GlobalSize(10),
    backgroundColor: PRIMARYCOLOR,
    borderTopLeftRadius: GlobalSize(12),
    borderTopRightRadius: GlobalSize(12),
  },
  cardLight: {
    backgroundColor: TRANSPARENTCOLOR1,
    padding: GlobalSize(17),
    width: DEFAULTWIDTH * 0.9,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  textAssess: {
    fontSize: fontSize(14),
    color: PUREWHITE,
    fontFamily: FONTS.FontMedium,
    marginLeft: GlobalSize(20),
    marginTop: GlobalSize(10),
  },
  cardResume: {
    width: DEFAULTWIDTH * 0.18,
    borderBottomLeftRadius: 8,
    padding: GlobalSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TRANSPARENTCOLOR2,
  },
  borderLine: {
    width: DEFAULTWIDTH * 0.1,
    height: GlobalSize(1),
    margin: GlobalSize(5),
    borderRadius: GlobalSize(10),
  },

  viewPercent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: DEFAULTWIDTH * 0.05,
  },
  centerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: GlobalSize(10),
  },
  viewOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: DEFAULTWIDTH * 0.08,
    marginRight: DEFAULTWIDTH * 0.08,
  },
  linesContainer: {
    flexDirection: 'row',
  },
  line: {
    width: DEFAULTWIDTH * 0.06,
    height: GlobalSize(2),
    backgroundColor: 'gray',
    marginHorizontal: 2,
  },
  highlightedLine: {
    backgroundColor: PUREWHITE,
  },
  lightCardRow: {
    flexDirection: 'row',
    height: DEFAULTHEIGHT * 0.063
  },
  subAssessmentPercentage: {
    fontSize: fontSize(22),
    color: PUREWHITE,
    fontFamily: FONTS.FontLight,
    alignSelf: 'center',
  },
  assessmentInfo: {
    color: PUREWHITE,
    width: DEFAULTWIDTH * 0.65
  },
  assessmentTitle: {
    fontFamily: FONTS.FontBold,
    fontSize: fontSize(12)
  },
  assessmentDescription: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(10)
  },
  arrowLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: fontSize(12),
    color: PUREWHITE,
    fontFamily: FONTS.FontMedium,
  },
  mainPercentage: {
    fontSize: fontSize(30),
    fontFamily: FONTS.FontLight,
    color: PUREWHITE
  },
  resumeTextButton: {
    fontSize: fontSize(9),
    color: PUREWHITE,
    fontFamily: FONTS.FontMedium,
  },
});
