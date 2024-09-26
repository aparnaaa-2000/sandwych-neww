import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image} from 'react-native';

import FileModal from './ImageModal';

//IMPORT CONSTANTS
import { BORDERCOLOR1, PUREWHITE } from '../../../Constants/Colors/Colors';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';


const ImageView = ({ imageUri }) => {
    const [OpenFile, setOpenFile] = useState(false)
 
    return (
        <View>
            <TouchableOpacity style={styles.messageContainer}
                onPress={() => {
                    setOpenFile(true)
                }}>
                <Image source={{ uri: imageUri }}
                    style={{ width:DEFAULTWIDTH*0.2, height:DEFAULTWIDTH*0.2 }}
                />
            </TouchableOpacity>

            <FileModal
                ModalOpen={OpenFile}
                setModalOpen={setOpenFile}
                imagePath={imageUri}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        alignSelf: 'flex-end',
        backgroundColor:PUREWHITE,
        borderRadius: 6,
        margin: GlobalSize(5),
        padding: GlobalSize(8),
        borderColor:BORDERCOLOR1,
        borderWidth: 0.5,
    },
})
export default ImageView;