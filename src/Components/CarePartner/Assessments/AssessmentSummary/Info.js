import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';
import React, { useState } from 'react';

//IMPORT CONSTANTS
import {
    BACKGROUNDCOLORGREYS,
    BORDERCOLOR9,
    PRIMARYCOLOR,
    TEXTCOLOR15
} from '../../../../Constants/Colors/Colors';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { FONTS } from '../../../../Constants/Fonts';
import { GreyUpArrow, GreyDownArrow, WhitePerson, Account } from '../../../../../assets';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';

//IMPORT PACKAGES
import FastImage from 'react-native-fast-image';

const Info = ({ CareTeamData, data, QuestionData }) => {
    
    const [CareTeam, setCareTeam] = useState(false)
    const [expandedSection, setExpandedSection] = useState(null);

  

    const toggleSection = (pageNameId) => { //OPEN AND CLOSE THE TOGGLE
      
        setCareTeam(false)
        setExpandedSection(prevSection => (prevSection === pageNameId ? null : pageNameId));
    };

    const renderItem = ({ item, index }) => {

        return (
            <View style={[styles.cardView, styles.columnView]}>
                <Text style={styles.textType}>  {item?.team_role == 0 ? 'Case Manager' : item?.team_role == 1 ? 'Primary Carepartner' : item?.team_role == 2 ? 'Carepartner' : 'Support Member'}</Text>

                {item?.picture ? (
                    <FastImage
                        style={styles.imgView}
                        source={{
                            uri: item?.picture,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        onError={() => handleImageError(index)}
                    />
                ) : (
                    <Account /> // Fallback component/icon if image fails to load
                )}
                <Text style={[styles.textHead, { fontSize: fontSize(15) }]}>{item?.name}</Text>
                <Text style={[styles.textType, { textAlign: 'center' }]}>{item?.email}</Text>

            </View>
        )
    }

    const renderPage = ({ item, index }) => (

        <View>
            <TouchableOpacity
                style={styles.touchCard}
                onPress={() => toggleSection(item?.title_id)}>
                <View style={styles.imgView}>
                    <ImageBackground
                        source={require('../../../../../assets/Images/summary/blueRect.png')}
                        style={styles.imgBack}>
                        <WhitePerson width={18} height={18} />
                    </ImageBackground>
                </View>

                <View>
                    <Text style={styles.textHead}>{item.title_name}</Text>
                </View>

                <View>
                    {expandedSection === item.title_id ? (
                        <GreyUpArrow width={20} height={20} />
                    ) : (
                        <GreyDownArrow width={20} height={20} />
                    )}
                </View>
            </TouchableOpacity>
            {expandedSection === item?.title_id && item?.page_names?.map((page) => {
                
                return (
                    <View key={page.sub_heading_id}>
                        {page?.sub_headings?.map((ques) => {
                        
                            return (
                                <View key={ques.sub_heading_id}>
                                    {ques?.questions?.map((question) => {
                                    
                                        // Check if there are selected options or text answers
                                        const hasSelectedOptions = question?.selected_options?.some(option => option.selected === true);
                                        const hasTextAnswers = question?.text_answers?.length > 0;

                                        if (hasSelectedOptions || hasTextAnswers) {
                                            return (
                                                <View key={question.question_id} style={[styles.cardView, { flexDirection: 'column', justifyContent: 'flex-start' }]}>
                                                    <View>
                                                        <Text style={[styles.textType, { marginBottom: 0 }]}>{question?.question_text}</Text>

                                                        {hasTextAnswers && (
                                                            <Text style={[styles.textValue, { textAlign: 'left' }]}>{question?.text_answers[0]}</Text>
                                                        )}

                                                        {hasSelectedOptions && question?.selected_options
                                                            ?.filter(option => option.selected === true)
                                                            ?.map(filteredItem => {

                                                                return (
                                                                    <View key={filteredItem.option_id}>
                                                                        <Text style={[styles.textValue, { textAlign: 'left' }]}>{filteredItem.option_text}</Text>
                                                                    </View>
                                                                );
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            );
                                        } else {
                                            return null; // Return null if neither condition is met
                                        }
                                    })}
                                </View>
                            )
                        })}
                    </View>
                )
            })}
        </View>
    );

    return (
        <View>


            <TouchableOpacity
                style={styles.touchCard}
                onPress={() => { setCareTeam(!CareTeam), setExpandedSection(null) }}>
                <View>
                    <ImageBackground
                        source={require('../../../../../assets/Images/summary/blueRect.png')}
                        style={styles.imgBack}>
                        <WhitePerson width={18} height={18} />
                    </ImageBackground>
                </View>

                <View>
                    <Text style={styles.textHead}>Careteam</Text>
                </View>

                <View>
                    {CareTeam ?
                        <GreyUpArrow width={20} height={20} /> :
                        <GreyDownArrow width={20} height={20} />}
                </View>

            </TouchableOpacity>

            {CareTeam &&
                <View>
                    <FlatList
                        data={CareTeamData}
                        numColumns={2}
                        //keyExtractor={item => item.user_id}
                        renderItem={renderItem} />
                </View>}
            <FlatList
                data={QuestionData}
                renderItem={renderPage}
                keyExtractor={(item) => item?.page_name_id?.toString()}
            />
            {/* Additional code for other sections (Personal Information, Care Partner Info, Conditions) */}
        </View>
    );
};

export default Info;

const styles = StyleSheet.create({
    cardView: {
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR9,
        padding: GlobalSize(15),
        paddingBottom: GlobalSize(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(10)
    },
    columnView: {
        flexDirection: 'column',
        width: DEFAULTWIDTH * 0.44,
        marginRight: GlobalSize(12),
        alignItems: 'center'
    },
    textType: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(14),
        color: TEXTCOLOR15,
        marginBottom: GlobalSize(10)
    },
    textValue: {
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(14),
        color: PRIMARYCOLOR,
        marginBottom: GlobalSize(10),
        textAlign: 'right'
    },
    touchCard: {
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: BACKGROUNDCOLORGREYS,
        marginBottom: 1,
        height: DEFAULTHEIGHT * 0.07,
        paddingRight: GlobalSize(15)
    },
    textHead: {
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(18)
    },
    imgView: {
        borderBottomLeftRadius: GlobalSize(8),
        borderTopLeftRadius: GlobalSize(8),
        overflow: 'hidden'
    },
    imgBack: {
        width: GlobalSize(48),
        height: GlobalSize(48),
        alignItems: 'center',
        justifyContent: 'center'
    }
});
