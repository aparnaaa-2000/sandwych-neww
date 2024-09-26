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
  BORDERCOLOR2,
  PUREWHITE,
  TEXTCOLOR5,
} from '../../../Constants/Colors/Colors';

function TopTab({state, descriptors, navigation, position}) {
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
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTHEIGHT * 0.05,
    backgroundColor: BORDERCOLOR2,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: DEFAULTHEIGHT * 0.02,
    justifyContent: 'space-evenly',
    borderRadius: 8,
  },
  topTabContainer: isFocused => ({
    width: DEFAULTWIDTH * 0.43,
    backgroundColor: isFocused === true ? PUREWHITE : BORDERCOLOR2,
    borderRadius: 8,
    height: DEFAULTHEIGHT * 0.038,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  }),
  tabText: isFocused => ({
    color: TEXTCOLOR5,
    fontSize: 14,
    fontFamily: isFocused ? FONTS.FontBold : FONTS.FontMedium,
  }),
});

export default TopTab;
