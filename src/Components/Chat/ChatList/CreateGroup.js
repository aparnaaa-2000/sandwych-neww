import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR1, FOURTHCOLOR, TEXTCOLOR10, TEXTCOLOR11, TEXTCOLOR13 } from '../../../Constants/Colors/Colors'
import ResourceHeader from '../../Common/Headers/ResourceHeader';
import FastImage from 'react-native-fast-image';
import { AVALONG, BETTYSMITHPROFILE, HOUSTON, SALLYBROWN1, SALLYBROWN2 } from '../../../Constants/DummyImages'
import { FONTS } from '../../../Constants/Fonts';
import { GlobalSize, fontSize, height, width } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { Search } from '../../../../assets';

const CreateGroup = ({ navigation }) => {

    const [searchValue, setSearchValue] = useState('')

    // DUMMY DATA
    const [data, setData] = useState([
        {
            id: 1,
            name: 'Houston Methodist',
            User: 'Organization',
            imageUri: HOUSTON
        },
        {
            id: 2,
            name: 'Betty Smith',
            User: 'Care Team',
            imageUri: BETTYSMITHPROFILE
        },
        {
            id: 3,
            name: 'Ava Long',
            User: 'Medical Team',
            imageUri: AVALONG
        },
        {
            id: 4,
            name: 'Sally Brown',
            User: 'Care Team',
            imageUri: SALLYBROWN1
        },
        {
            id: 5,
            name: 'Sally Brown',
            User: 'Care Team',
            imageUri: SALLYBROWN2
        }
    ])

    const filteredData = data.filter(item => {
        // Filter items based on search query
        return item?.name.includes(searchValue)
    });

    const renderItem = (({ item }) => {

        return (
            <>
                <View style={styles.flexView}>
                    <View>
                        <FastImage
                            style={styles.imageV}
                            source={{
                                uri: item.imageUri,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>

                    <View>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.time}>{item.User}</Text>
                        <View style={[styles.lineBorder, { width: DEFAULTWIDTH * 0.8, marginTop: GlobalSize(15) }]} />
                    </View>
                </View>


            </>
        )
    })

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

            <View>
                <ResourceHeader navigation={navigation} title={'Select User'} />

                <View style={styles.lineBorder} />

                <View style={styles.searchView}>

                    <Search />
                    <TextInput
                        placeholderTextColor={TEXTCOLOR13}
                        style={styles.fontSearch}
                        placeholder='Search'
                        value={searchValue}
                        onChangeText={setSearchValue}
                    />

                </View>

                <View>
                    <FlatList
                        data={searchValue?.trim() !== '' ? filteredData : data}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CreateGroup

const styles = StyleSheet.create({
    lineBorder: {
        height: 1,
        width: DEFAULTWIDTH,
        backgroundColor: BORDERCOLOR1,
        marginRight: GlobalSize(15),
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageV: {
        width: GlobalSize(50),
        borderRadius: GlobalSize(25),
        height: GlobalSize(50),
        marginRight: GlobalSize(15)
    },
    textName: {
        fontSize: fontSize(16),
        fontWeight: '600',
        color: TEXTCOLOR11,
        fontFamily: FONTS.FontSemiB,
        marginBottom: GlobalSize(2)
    },
    time: {
        fontSize: fontSize(14),
        color: TEXTCOLOR13,
        fontFamily: FONTS.FontRegular
    },
    flexView: {
        flexDirection: 'row',
        padding: GlobalSize(10),
        alignItems: 'center'
    },
    fontSearch: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        paddingLeft: GlobalSize(10),
        width: DEFAULTWIDTH * 0.7
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: GlobalSize(15),
        borderWidth: 1,
        borderColor: BORDERCOLOR1,
        margin: GlobalSize(20),
        borderRadius: GlobalSize(10),
        width:width(310),
        height:height(50)

    }
})