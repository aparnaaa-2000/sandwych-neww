import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { TEXTCOLOR5 } from '../../Constants/Colors/Colors';
import { FONTS } from '../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../Constants/ResponsiveFont/ResponsiveFonts';

const ReadMoreText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => setIsExpanded(!isExpanded);

  return (
    <View>
      <Text style={styles.descText}>
        {isExpanded ? text : `${text.substring(0, 100)}...`}
      </Text>
      <TouchableOpacity onPress={toggleText}>
        <Text style={styles.readMoreText}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  descText: {
    color: TEXTCOLOR5,
    fontFamily: 'Inter-Regular',
    fontSize: fontSize(14),
    marginTop: GlobalSize(5),
  },
  readMoreText: {
    fontSize: fontSize(14),
    color: TEXTCOLOR5,
    fontFamily: FONTS.FontSemiB,
    marginTop: GlobalSize(5),
  },
};

export default ReadMoreText;
