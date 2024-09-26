import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

//IMPORT CONSTANTS
import {
  GREYBACKGROUND1,
  LINECOLOR1,
  TEXTCOLOR10,
  TEXTCOLOR5,
  TEXTCOLOR7,
  THIRDCOLOR,
} from '../../../Constants/Colors/Colors';
import {FTCHEADER} from '../../../Constants/Texts';
import DEFAULTSTYLES, {DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT API
import useNewsApi from '../../../hooks/apihooks/useNewsApi';

//IMPORT PACKAGES
import ReadMore from 'react-native-read-more-text';
import FastImage from 'react-native-fast-image';

const FromCommunity = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {  
    const fetchNews = async () => {
      try {
        const newsData = await useNewsApi();
        setNews(newsData);
        console.log(newsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const renderTruncatedFooter = handlePress => {
    return (
      <Text
        style={{color: THIRDCOLOR, fontFamily: 'Inter-Bold'}}
        onPress={handlePress}>
        Read more...
      </Text>
    );
  };

  const renderRevealedFooter = handlePress => {
    return (
      <Text
        style={{color: THIRDCOLOR, fontFamily: 'Inter-Bold'}}
        onPress={handlePress}>
        Show less
      </Text>
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.viewCard}>
      <ReadMore
        numberOfLines={6}
        renderTruncatedFooter={renderTruncatedFooter}
        renderRevealedFooter={renderRevealedFooter}>
        <Text style={styles.textDesc}>{item.description}</Text>
      </ReadMore>
      <FastImage
        style={styles.imageView}
        source={{
          uri: item.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <TouchableOpacity>
        <Text style={styles.dismiss}>DISMISS</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <>
      <View
        style={{marginTop: GlobalSize(2), marginHorizontal: GlobalSize(10)}}>
        <View style={styles.lineBoder} />
        <View style={styles.headView}>
          <Text style={styles.headingText}>{FTCHEADER}</Text>
        </View>
      </View>

      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
    width: DEFAULTWIDTH * 0.9,
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
  dismiss: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
    color: TEXTCOLOR5,
  },
  textDesc: {
    color: TEXTCOLOR10,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
    marginTop: GlobalSize(5),
  },
  headView: {
    marginTop: GlobalSize(10),
    marginLeft: DEFAULTWIDTH * 0.025,
    marginBottom: GlobalSize(5),
  },
  flatListContent: {
    paddingHorizontal: GlobalSize(10),
  },
});

export default FromCommunity;
