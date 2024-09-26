import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

//IMPORT CONSTANTS
import {
    BACKGROUNDWHITE,
    BORDERCOLOR5,
    PRIMARYCOLOR,
    PUREBLACK,
    TEXTCOLOR10
} from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import ResourceFilterModal from '../../../../Components/CarePartner/Resources/ResourceFilterModal'
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader'

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//IMPORT REDUX COMPONENTS
import { GetResourceCategory, GetResourceSubCategory } from '../../../../redux/Thunk/ResourceThunk';


const SelectResource = ({ navigation }) => {

    const dispatch = useDispatch();
    const [ModalOpen, setModalOpen] = useState(false)
    const [MainCategory, setMainCategory] = useState('')
    const [imageErrors, setImageErrors] = useState({});
    const [CategoryId, setCategoryId] = useState(null)
    const [Token, setToken] = useState(null)

    const { data, errors, Loading, subCategoryData } = useSelector(
        state => ({
            data: state.ResourceCategory.data,
            errors: state.ResourceCategory.error,
            Loading: state.ResourceCategory.isLoading,
            subCategoryData: state.ResourceSubCategory.data,
            subCategoryError: state.ResourceSubCategory.error,
            subCategoryLoading: state.ResourceSubCategory.isLoading,

        }),
        shallowEqual
    );


    useEffect(() => {
    
        // Fetch data when the component mounts and when `token` changes
        fetchData();

    }, [navigation]); // Add token if it's a dependency

    const fetchData = async () => {
        const data = await getData();
        setToken(data?.storedValue)
        GetResourceCategory(data?.storedValue, dispatch)
    };

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');

            return {
                storedValue: storedValue,

            };
        } catch (e) {
            console.error('Error retrieving data:', e);
            return {
                storedValue: null
            };
        }
    };

    // Handle image load errors
    const handleImageError = (index) => {
        setImageErrors((prevErrors) => ({
            ...prevErrors,
            [index]: true,
        }));
    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: GlobalSize(15) }}>
                <TouchableOpacity
                    style={styles.touchCard}
                    onPress={() => {
                        GetResourceSubCategory(item?.id, Token, dispatch)
                        setMainCategory(item?.name),
                            setCategoryId(item?.id)
                        setModalOpen(true)
                    }}>
                    <View style={styles.viewImage}>
                        {!imageErrors[index] ?
                            <Image
                                source={{ uri: item?.icon }}
                                style={{ width: GlobalSize(70), height: GlobalSize(50) }}
                                onError={() => handleImageError(index)} /> :
                            <Image
                                source={require('../../../../../assets/Images/AbilityToHelp1/Transportation.png')}
                                style={{ width: GlobalSize(70), height: GlobalSize(50) }}
                            />}
                    </View>

                    <View>
                        <Text style={styles.textTitle}>{item?.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (

        <>
            {Loading ?
                <View style={styles.loadContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View> :

                <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
                    <StatusBar
                        backgroundColor={BACKGROUNDWHITE}
                        barStyle={'dark-content'}
                        style={{ flex: 0 }} />

                    <View>
                        <ResourceHeader navigation={navigation} title={'Resources'} />

                        <View style={DEFAULTSTYLES.alignView}>
                            <FlatList
                                data={data?.resourcesCategories}
                                keyExtractor={(item) => item.id}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: DEFAULTHEIGHT * 0.16 }} />
                        </View>

                        <ResourceFilterModal
                            MainCategory={MainCategory}
                            CategoryId={CategoryId}
                            navigation={navigation}
                            ModalOpen={ModalOpen}
                            setModalOpen={setModalOpen} />
                    </View>
                </SafeAreaView>
            }
        </>
    )
}

export default SelectResource

const styles = StyleSheet.create({
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textRes: {
        fontSize: fontSize(24),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10
    },
    touchCard: {
        width: DEFAULTWIDTH * 0.88,
        borderWidth: 1,
        borderColor: BORDERCOLOR5,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: "center",
        padding: GlobalSize(6)
    },
    textTitle: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        color: PUREBLACK,
    },
    viewImage: {
        marginRight: DEFAULTWIDTH * 0.04,
        borderWidth: 1,
        borderColor: BORDERCOLOR5,
        borderRadius: 4,
        padding: fontSize(10)
    }
})