import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'

import { BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors'
import { DEFAULTWIDTH, DEFAULTHEIGHT } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const MobilityAccess = ({
    Heading,
    MobilityValue1,
    setMobilityValue1,
    MobilityValue2,
    setMobilityValue2,
    QuestionFilter,
    OptionFilter ,
    mappedData}) => {

    const newArray = OptionFilter.map(item => ({
        id: item?.id,
        Title: item?.option,
        isSelected: false
    }));


    const [Options, setOptions] = useState(newArray);

    switch (Heading) {
        case 0:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'In the past 12 months, has lack of reliable transportation kept you from medical appointments, meetings, work or from getting things needed for daily living?';
            break;

        case 1:
            imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
            Description = 'Do you want help finding or keeping work or a job?';
            break;

    }

    const filteredMappedData1 = mappedData?.filter(item => item.id == 86);
    const filteredMappedData2 = mappedData?.filter(item => item.id == 87);
  
    const isSelected = (item) => {
        if (Heading === 0) {
            if (MobilityValue1 === item.id) {
                return styles.radioIconSelected;
            } else if (!MobilityValue1 && filteredMappedData1?.length > 0 && filteredMappedData1[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        } else if (Heading === 1) {
            if (MobilityValue2 === item.id) {
                return styles.radioIconSelected;
            } else if (!MobilityValue2 && filteredMappedData2?.length > 0 && filteredMappedData2[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
  
        return null;
    };

    const onPress = option => {  //STORING THE STATE VALUE
        if (Heading === 0) {
            setMobilityValue1(option.id)
        }
        else if (Heading === 1) {
            setMobilityValue2(option.id)
        }
    }

    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.imageView}>
                    <Image style={styles.imageStyle} source={imageSource} />
                </View>
            </View>
            <View style={styles.descView}>
                <Text style={[styles.textDesc, { marginLeft: 10 }]}>{QuestionFilter[Heading]?.question}</Text>
            </View>

            <FlatList
                data={newArray}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginLeft: GlobalSize(10) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={styles.radioButton}
                                    onPress={() => onPress(item)}>
                         
                         <View
                                                style={[styles.radioIcon,isSelected(item)]}>
                                                {isSelected(item) &&
                                                    <View style={styles.radioBorder} />
                                                }
                                                </View>
                                </TouchableOpacity>

                                <View style={{ marginTop: 7, maxWidth: DEFAULTWIDTH * 0.8 }}>
                                    <Text style={styles.textDesc}>{item.Title}</Text>
                                </View>

                            </View>


                        </View>
                    );
                }}
            />

        </View>
    )
}

export default MobilityAccess

const styles = StyleSheet.create({
    radioIcon: {
        marginLeft: GlobalSize(10),
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderWidth: 2,
        borderColor: BORDERCOLOR4,
        marginRight: GlobalSize(8),
        backgroundColor: PUREWHITE,
    },
    radioIconSelected: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderColor: PRIMARYCOLOR,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: GlobalSize(8),
    },
    radioBorder: {
        width: GlobalSize(10),
        height: GlobalSize(10),
        borderRadius: GlobalSize(5),
        borderWidth: 2,
        borderColor: PRIMARYCOLOR,
        backgroundColor: PRIMARYCOLOR,
    },
    imageStyle: {
        width: DEFAULTWIDTH * 0.9,
        height: DEFAULTWIDTH * 0.82,
        //marginBottom: '4%',
    },
    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalSize(10),
    },
    imageView: {
        alignItems: 'center',
        width: DEFAULTWIDTH * 0.9,
        backgroundColor: PUREWHITE,
        borderRadius: GlobalSize(10),
        elevation: 2,
        marginBottom: GlobalSize(15),
    },
    textDesc: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR5,
        maxWidth: DEFAULTWIDTH * 0.9,
        lineHeight: GlobalSize(20)
    },
    descView: {
        marginLeft: GlobalSize(6),
        marginRight: GlobalSize(10),
        marginBottom: DEFAULTHEIGHT * 0.01
    }
})