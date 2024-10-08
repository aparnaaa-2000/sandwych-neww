import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolate,
    interpolateColor,
    runOnJS,
} from 'react-native-reanimated';

//COLORS IMPORTED GLOBALLY
import { PLACEHOLDERCOLOR2, PRIMARYCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors';

import { FONTS } from '../../../../Constants/Fonts';

//SVG ICONS
import { LeftWhite, SwipeArrow } from '../../../../../assets';
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const BUTTON_WIDTH = 300;
const BUTTON_HEIGHT = 55;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const SelectRoleButton = ({ navigations,toggled, setToggled, setToggleState, toggleState }) => {

    const X = useSharedValue(0);
    const handleToggle = (value) => setToggleState(value);

    // Reset the animation when toggleState changes
    useEffect(() => {
        X.value = toggleState ? H_SWIPE_RANGE : 0;
    }, [toggleState]);


    // Fires when animation ends
    const handleComplete = (isToggled) => {
        if (isToggled !== toggled) {
            setToggled(isToggled);
            handleToggle(isToggled);
            navigations()
        }
    };

    // Gesture Handler Events
    const animatedGestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.completed = toggled;
        },
        onActive: (e, ctx) => {
            let newValue;
            if (ctx.completed) {
                newValue = H_SWIPE_RANGE + e.translationX;
            } else {
                newValue = e.translationX;
            }

            if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
                X.value = newValue;
            }
        },
        onEnd: () => {
            if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
                X.value = withSpring(0);
                runOnJS(handleComplete)(false);
            } else {
                X.value = withSpring(H_SWIPE_RANGE);
                runOnJS(handleComplete)(true);
            }
        },
    });

    const InterpolateXInput = [0, H_SWIPE_RANGE];
    const AnimatedStyles = {
        swipeCont: useAnimatedStyle(() => {
            return {};
        }),
        colorWave: useAnimatedStyle(() => {
            return {
                width: H_WAVE_RANGE + X.value,

                opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
            };
        }),
        swipeable: useAnimatedStyle(() => {
            return {
                backgroundColor: interpolateColor(
                    X.value,
                    [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
                    [PRIMARYCOLOR, PUREWHITE],
                ),
                transform: [{ translateX: X.value }],
            };
        }),
        swipeText: useAnimatedStyle(() => {
            return {
                opacity: interpolate(
                    X.value,
                    InterpolateXInput,
                    [0.7, 0],
                    Extrapolate.CLAMP,
                ),
                transform: [
                    {
                        translateX: interpolate(
                            X.value,
                            InterpolateXInput,
                            [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
                            Extrapolate.CLAMP,
                        ),
                    },
                ],
            };
        }),
    };

    return (
        <GestureHandlerRootView >
            <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
                <AnimatedLinearGradient
                    style={[AnimatedStyles.colorWave, styles.colorWave]}
                    colors={[PRIMARYCOLOR, PUREWHITE]}
                    start={{ x: 0.0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                />

                <PanGestureHandler onGestureEvent={animatedGestureHandler}>
                    <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]}>
                        <LeftWhite />
                    </Animated.View>
                </PanGestureHandler>

                <Animated.View style={{ alignItems: 'center', marginLeft: DEFAULTWIDTH * 0.32 }}>
                    <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
                        Confirm Selection
                    </Animated.Text>
                </Animated.View>

                <Animated.View>
                    <SwipeArrow />
                </Animated.View>


            </Animated.View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    swipeCont: {
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH,
        backgroundColor: PUREWHITE,
        borderWidth: 1,
        borderRadius: BUTTON_HEIGHT,
        padding: BUTTON_PADDING,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: PLACEHOLDERCOLOR2,
        marginBottom: GlobalSize(10)
    },
    colorWave: {
        position: 'absolute',
        left: 0,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_HEIGHT,
    },
    swipeable: {
        position: 'absolute',
        left: GlobalSize(4),
        height: DEFAULTWIDTH * 0.12,
        width: DEFAULTWIDTH * 0.12,
        borderRadius: SWIPEABLE_DIMENSIONS,
        zIndex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    swipeText: {
        alignSelf: 'center',
        fontSize: fontSize(15),
        fontFamily: FONTS.FontMedium,
        zIndex: 2,
        color: PRIMARYCOLOR,
    },
});

export default SelectRoleButton;











