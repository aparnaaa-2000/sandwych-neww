import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { FONTS } from '../../../Constants/Fonts';
import {
  PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR11, TEXTCOLOR13, TEXTCOLOR15,
} from '../../../Constants/Colors/Colors';
import { GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import {
  CalenderLine, GreyClockLine, Maps, TransportMobility, cooking,
} from '../../../../assets';

import { Card } from 'react-native-paper';
import useNearByList from '../../../hooks/apihooks/useNearByList';

const NearbySupportRequired = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [neardata, setNearData] = useState([]);

  const onNavigateTo = () => {
    navigation.navigate('SupportStack', { screen: 'SupportRequiredNearby' });
  };

  const onNavigateToDetail = (item) => {
    navigation.navigate('SupportRequiredDetail' , {detail  : item });
  };

  useEffect(() => {
    const Near_By_Support_Get = async () => {
      try {
        setLoading(true);
        const near_data = await useNearByList();
        // console.log('This is nearby support list data:', near_data);

        if (near_data && Array.isArray(near_data.rejectedRequests)) {
          setNearData(near_data.rejectedRequests);
        } else {
          setNearData([]);
        }
      } catch (error) {
        setError(true);
        console.log('Error in near support list:', error);
      } finally {
        setLoading(false);
      }
    };
    Near_By_Support_Get();
  }, [neardata]);

  const renderItems = ({ item }) => {
    const SVG = item.support ? item.svg : TransportMobility;
    return (
      <Card
        onPress={() => onNavigateToDetail(item)}
        style={[
          styles.mainContainer,
          { marginRight: GlobalSize(10) },
        ]}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.personName}>{item.supportRequestDetails.requestedUser}</Text>
            
            <Text style={styles.personRole}>{item.supportRequestDetails.requestedUserRole}</Text>
          </View>
          <TouchableOpacity>
            <Maps />
          </TouchableOpacity>
        </View>

        <View style={styles.middleRow}>
          <View style={styles.iconLayout}>
            <SVG width={100} height={100} />
          </View>
          <View style={styles.headingLayout}>
            <Text numberOfLines={3} style={styles.headingStyle}>
              {item.supportRequestDetails.support}
            </Text>
          </View>
        </View>

        <View style={styles.footerLayout}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CalenderLine width={18} height={18} />
            <Text style={styles.personName}> {item.supportRequestDetails.scheduled_date}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <GreyClockLine width={18} height={18} />
            <Text style={styles.personName}> {item.supportRequestDetails.scheduled_time}</Text>
          </View>
        </View>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainConainter}>
      <View style={styles.headerRow}>
        {neardata.length > 0 ? (
          <>
            <Text style={styles.commonHeaderText}>
              <Text style={{ fontFamily: FONTS.FontBold }}>Near By </Text>
              <Text style={{ fontFamily: FONTS.FontRegular }}>Support Required</Text>
            </Text>
            <TouchableOpacity onPress={() => onNavigateTo()}>
              <Text style={styles.subHeaderText}>see all</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>

      {neardata.length > 0 ? (
        <View style={styles.flatView}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={neardata}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ): null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainConainter: {
    marginVertical: DEFAULTHEIGHT * 0.01,
    marginHorizontal: DEFAULTWIDTH * 0.02,
  },
  commonHeaderText: {
    flexDirection: 'row',
    fontSize: 16,
    color: TEXTCOLOR10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:10,
  },
  subHeaderText: {
    fontFamily: FONTS.FontMedium,
    fontSize: 12,
    color: TEXTCOLOR11,
  },
  flatView: {
    marginTop: GlobalSize(8),
    height: 200,
    paddingVertical: DEFAULTHEIGHT * 0.01,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR10,
  },
  mainContainer: {
    width: DEFAULTWIDTH * 0.7,
    backgroundColor: PUREWHITE,
    height: 180,
  },
  personName: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR10,
    // paddingLeft:10
  },
  personRole: {
    fontSize: 10,
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR13,
    // paddingLeft:10,
    // paddingBottom:10
  },
  headingStyle: {
    fontFamily: FONTS.FontRegular,
    fontSize: 20,
    width: 100,
    color: TEXTCOLOR15,
  },
  middleRow: {
    flexDirection: 'row',
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginBottom: DEFAULTWIDTH * 0.02,
  },
  iconLayout: {
    width: 120,
    height: 100,
    backgroundColor: PRIMARYCOLOR,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingLayout: {
    marginLeft: DEFAULTWIDTH * 0.01,
    alignSelf: 'center',
  },
  footerLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: DEFAULTWIDTH * 0.02,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NearbySupportRequired;
