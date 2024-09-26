import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import DEFAULTSTYLES from '../../../../Constants/styles/styles';
import Header from '../../../../Components/SupportMember/Home/Header';
import UpcomingCard from '../../../../Components/SupportMember/Home/UpcomingCard';
import NearbySupportRequired from '../../../../Components/SupportMember/Home/NearbySupportRequired';
import UserRating from '../../../../Components/SupportMember/UserProfile/UserRating';
import UserRatingCard from '../../../../Components/SupportMember/Home/UserRatingCard';
import CaregivingResources from '../../../../Components/CarePartner/Home/CaregivingResources';
import FromCommunity from '../../../../Components/CarePartner/Home/FromCommunity';
import {shallowEqual, useSelector} from 'react-redux';
import ActivityLoader from '../../../../Components/Common/Loader/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true); // Set loading to true before the request
        const data = await useGetProfile();
        console.log('PROFILE_DATA...', data);
        setProfileData(data);
      } catch (error) {
        console.log('HOME_USER_ERROR', error);
        setError(error);
      } finally {
        setLoading(false); // Set loading to false after the request is done
      }
    };

    fetchUserProfile();
  }, [profileData]);

  const {data, error, isLoading} = useSelector(
    state => ({
      data: state.profilesupport.data,
      error: state.profilesupport.error,
      isLoading: state.profilesupport.isLoading,
    }),
    shallowEqual,
  );



  // Shows loading when the network is slow to retrieve data.
  const HomeScreenComponent = () => {
    return isLoading == true ? (
      <ActivityLoader />
    ) : (
      <>
        <Header
          user_status={setIsSwitchOn}
          navigation={navigation}
          data={data}
        />
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <UserRatingCard
            AvailableStatus={isSwitchOn}
            ChangeAvailablityStatus={setIsSwitchOn}
          />
          <NearbySupportRequired navigation={navigation} />
          <UpcomingCard navigation={navigation} />
          <CaregivingResources />
          <FromCommunity />
        </ScrollView>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[
        Platform.OS === 'android'
          ? DEFAULTSTYLES.AndroidSafeArea
          : styles.container,
        {flex: 1},
      ]}>
      <HomeScreenComponent />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
