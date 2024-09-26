import {
    Animated,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
  } from 'react-native';
  import DEFAULTSTYLES, {
    DEFAULTHEIGHT,
    DEFAULTWIDTH,
  } from '../../../Constants/styles/styles';
  import {FONTS} from '../../../Constants/Fonts';
  import {
    PUREWHITE,
    TEXTCOLOR14,
    TEXTCOLOR5,
  } from '../../../Constants/Colors/Colors';
  
  function NotificationTab({state, descriptors, navigation, position}) {
    return (
      <View
        style={[
          styles.mainContainer,
          Platform.OS === 'ios'
            ? DEFAULTSTYLES.iosShadow
            : DEFAULTSTYLES.androidShadow,
        ]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          });
  
          return (
            <View>
              {isFocused ? (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={styles.topTabContainer(isFocused)}>
                  <Animated.Text style={styles.tabText(isFocused)}>
                    {label}
                  </Animated.Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={styles.topTabContainer(isFocused)}>
                  <Animated.Text style={styles.tabText(isFocused)}>
                    {label}
                  </Animated.Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    );
  }
  
  const styles = new StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      width: DEFAULTWIDTH * 0.5,
      backgroundColor: PUREWHITE,
      alignItems: 'center',
      marginVertical: DEFAULTHEIGHT * 0.02,
      marginLeft: 10,
      justifyContent: 'space-evenly',
      borderRadius: 20,
    },
    topTabContainer: isFocused => ({
      width: DEFAULTWIDTH * 0.25,
      backgroundColor: isFocused === true ? TEXTCOLOR14 : PUREWHITE,
      borderRadius: 20,
      height: DEFAULTHEIGHT * 0.03,
      marginBottomL: 5,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    }),
    tabText: isFocused => ({
      color: isFocused ? PUREWHITE : TEXTCOLOR5,
      fontSize: 14,
      fontFamily: isFocused ? FONTS.FontBold : FONTS.FontMedium,
    }),
  });
  
  export default NotificationTab;
  