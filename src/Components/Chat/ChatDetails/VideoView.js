import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground} from 'react-native';

//IMPORT ICON (CHANGE INTO SVG)
import Icon4 from 'react-native-vector-icons/Ionicons';

//IMPORT CONSTANTS
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const VideoView = ({ item, navigation }) => {

    return (
        <View>
            <TouchableOpacity style={styles.messageContainer}
                onPress={() => {
                    navigation.navigate('VideoFile', { VideoPath: item.text })
                }}>
                <ImageBackground
                    source={{ uri: item.text }}
                    resizeMode={'contain'}
                    style={styles.imageB}
                >
                    <Icon4 name="caret-forward-circle-outline" color={'#FFFFFF'} size={30} />
                </ImageBackground>

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#FFFFFF',
        borderRadius: GlobalSize(6),
        margin: GlobalSize(5),
        padding: GlobalSize(8),
        borderColor: "#E8EAF3",
        borderWidth: 0.5,
    },
    imageB: {
        width: DEFAULTWIDTH * 0.2,
        height: DEFAULTWIDTH * 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
export default VideoView;