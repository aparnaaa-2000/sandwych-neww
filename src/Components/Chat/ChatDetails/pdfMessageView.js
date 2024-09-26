import React from 'react';
import WebView from 'react-native-webview';

import { BACKGROUNDWHITE } from '../../../Constants/Colors/Colors';

const PdfMessageView = ({route}) => {

    const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(route?.params?.pdf)}&embedded=true`;

    return (

        <WebView
            source={{ uri: googleDocsUrl }}
            style={{backgroundColor: BACKGROUNDWHITE, }}

        />
    )
}

export default PdfMessageView;