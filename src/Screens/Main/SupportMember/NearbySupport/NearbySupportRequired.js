import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-paper';
import {
  ArrowF,
  Maps,
  TransportMobility
} from '../../../../../assets';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {
  BACKGROUNDWHITE,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR13,
  TEXTCOLOR14,
  TEXTCOLOR15,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import useNearByList from '../../../../hooks/apihooks/useNearByList';
import RequestModal from '../../../../Components/Common/Modal/RequestModal';

const NearbySupportRequired = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [neardata, setNearData] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const [detail_Id, setDetail_Id] = useState(null);

  // Update navigation function to pass `item` details
  const navigationFunction = item => {
    navigation.navigate('SupportRequiredDetail', {detail: item});
  };
  
  useEffect(() => {
    const Near_By_Support_Get = async () => {
      try {
        const near_data = await useNearByList();
        if (near_data && Array.isArray(near_data.rejectedRequests)) {
          setNearData(near_data.rejectedRequests);
        } else {
          console.log('No valid data found.');
          setNearData([]);
        }
      } catch (error) {
        console.error('Error in near support list:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    Near_By_Support_Get();
  }, []);

  const renderItems = ({ item }) => {
    const imageUri = item.supportRequestDetails.support_image;
    setDetail_Id(item?.id);

    return (
      <Card style={styles.mainContainer} onPress={() => navigationFunction(item)}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.personName}>{item.supportRequestDetails.requestedUser}</Text>
            <Text style={styles.personRole}>{item.supportRequestDetails.requestedUserRole}</Text>
          </View>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.personName, { marginRight: 5 }]}>
              {item.location}
            </Text>
            <Maps />
          </TouchableOpacity>
        </View>
  
        <View style={styles.borderLine}></View>
  
        {/* Middle */}
        <View style={styles.middleRow}>
          <View style={styles.iconLayout}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            ) : (
              <TransportMobility width={100} height={100} />
            )}
          </View>
          <View style={styles.headingLayout}>
            <Text numberOfLines={3} style={styles.headingStyle}>
              {item.supportRequestDetails.support}
            </Text>
          </View>
        </View>
  
        <View style={styles.borderLine}></View>
  
        {/* Footer */}
        <View style={styles.footerLayout}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.personName}>{item.supportRequestDetails.scheduled_date}  </Text>
            <Text style={styles.personName}>{item.supportRequestDetails.scheduled_time}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalOpen(true)}
            style={styles.buttonLayer}>
            <Text style={styles.buttonText}>REQUEST</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };
  
  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle="dark-content"
        style={{ flex: 0 }}
      />
      {/* Header */}
      <View style={styles.mainHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: DEFAULTWIDTH * 0.02 }}>
          <ArrowF height={18} width={18} />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Nearby Support Required</Text>
        </View>

        <View></View>
      </View>
      {/* Content */}
      <View style={{ marginTop: DEFAULTHEIGHT * 0.02 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={neardata}
          renderItem={renderItems}
          keyExtractor={item => item.id}
        />
      </View>

      <RequestModal
        ModalOpen={ModalOpen}
        title={'Are you sure you want to Request?'}
        setModalOpen={setModalOpen}
        navigation={navigation}
        rejected_request_id={detail_Id}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  // Header
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 18, fontFamily: FONTS.FontMedium, color: TEXTCOLOR10 },

  // FlatlistItems
  mainContainer: {
    width: DEFAULTWIDTH * 0.95,
    alignSelf: 'center',
    backgroundColor: PUREWHITE,
    height: 205,
    marginBottom: DEFAULTHEIGHT * 0.01,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: DEFAULTWIDTH * 0.02,
  },
  personName: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR10,
  },
  personRole: {
    fontSize: 10,
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR13,
  },
  headingStyle: {
    fontFamily: FONTS.FontRegular,
    fontSize: 20,
    color: TEXTCOLOR15,
  },
  middleRow: {
    flexDirection: 'row',
    width: DEFAULTWIDTH * 0.9,
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginBottom: DEFAULTWIDTH * 0.02,
  },
  iconLayout: {
    width: 120,
    height: 100,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    borderRadius: 10,
  },
  iconPlaceholder: {
    color: PUREWHITE,
    textAlign: 'center',
    marginTop: 40,
  },
  headingLayout: {
    marginLeft: DEFAULTWIDTH * 0.01,
    alignSelf: 'center',
    width: DEFAULTWIDTH * 0.6,
  },
  footerLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: DEFAULTWIDTH * 0.02,
    alignItems: 'center',
  },
  buttonLayer: {
    backgroundColor: PRIMARYCOLOR,
    width: 100,
    height: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONTS.FontSemiB,
    color: PUREWHITE,
    fontSize: 12,
  },
  borderLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: TEXTCOLOR14,
    marginBottom: DEFAULTHEIGHT * 0.01,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NearbySupportRequired;
