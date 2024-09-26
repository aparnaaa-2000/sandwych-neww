import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {
  MEDSITEMCOLOR1,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR13,
} from '../../../Constants/Colors/Colors';
import {FONTS} from '../../../Constants/Fonts';
import useGetProfile from '../../../hooks/apihooks/useGetProfile';
import io from 'socket.io-client';
import useSocket from '../../../hooks/socket/useSocket';
import { moderateScale } from 'react-native-size-matters';

const Header = ({navigation, data, user_status, user_pass}) => {
  // Can navigate to support profile. If there are several users using this component. Use Role ID. ROLE ID = 10 Support
  const navigatetoSupportProfile = () => {
    navigation.navigate('SupportStack', {screen: 'SupportProfileScreen'});
  };

  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Getting Intial of the User, Required if profile picture is not there show the initial
  function getInitials(fullName) {
    // Split the full name into separate words
    const nameParts = fullName?.split(' ');

    // Check if there are at least two names (first and last)
    if (nameParts?.length < 2) {
      return fullName?.slice(0, 2)?.toUpperCase(); // Use first two characters if less than 2 names
    }

    // Get the first letter of the first name and last name
    const initials = nameParts
      ? nameParts[0][0]?.toUpperCase() +
        nameParts[nameParts?.length - 1][0]?.toUpperCase()
      : null;

    return initials;
  }

  const usernameInitial = getInitials(profileData?.user?.name);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true); // Set loading to true before the request
        const data = await useGetProfile();
        setProfileData(data);
        user_pass(data);
        user_status(data?.is_active);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // Set loading to false after the request is done
      }
    };

    fetchUserProfile();
  }, [profileData]);

  const {socket, connected} = useSocket(); // Access both socket and connected status
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages
      socket.on('message', incomingMessage => {
        setMessages(prevMessages => [...prevMessages, incomingMessage]);
      });
    }

    // Clean up listener on component unmount
    return () => {
      if (socket) {
        socket.off('message');
      }
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket && connected) {
      socket.emit('message', message); // Send the message if connected
      setMessage(''); // Clear the message input after sending
    } else {
      console.log('Socket not connected');
    }
  };

  return (
    <TouchableOpacity
      style={styles.mainConainter}
      onPress={() => navigatetoSupportProfile()}>
      <View style={styles.profileRound}>
        {/* Missing if profile pic is available, show that */}

        {profileData?.user?.picture != null ? (
          <Image
            style={styles.ImageRound}
            source={{uri: profileData?.user?.picture}}
          />
        ) : (
          <Text style={styles.profileImageText}>{usernameInitial}</Text>
        )}
      </View>
      <View>
        <Text style={styles.profileName}>{profileData?.user?.name}</Text>
        <Text style={styles.profileEmail}>{profileData?.user?.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = new StyleSheet.create({
  mainConainter: {
    marginVertical: DEFAULTHEIGHT * 0.01,
    marginHorizontal: DEFAULTWIDTH * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileRound: {
    backgroundColor: MEDSITEMCOLOR1,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  profileImageText: {
    color: PUREWHITE,
    fontFamily: FONTS.FontBold,
    fontSize: 14,
  },
  profileName: {
    fontFamily: FONTS.FontBold,
    fontSize: 16,
    color: TEXTCOLOR10,
  },
  profileEmail: {
    fontFamily: FONTS.FontRegular,
    fontSize: 12,
    color: TEXTCOLOR13,
  },
  ImageRound : {
    width : '100%' ,
    height : '100%' ,
    borderRadius:moderateScale(100) ,
    elevation:moderateScale(2)
  }
});

export default Header;
