import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
    interpolateColor,
} from "react-native-reanimated";
import {
    FlingGestureHandler,
    Directions,
    GestureHandlerRootView,
} from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const SWIPE_LIMIT = 100;

const chooseColor = (index) => {
    switch (index) {
        case 1:
            return "#FFAC20";
        case 2:
            return "#FF7246";
        case 3:
            return "#FF4574";
        case 4:
            return "#FF38EB";
        case 5:
            return "#0684FE";
        case 6:
            return "#33BE99";
        default:
            return "#FFAC20";
    }
};

const SwipeToDelete = ({ item, onDeleteLeft, onDeleteRight, onPress, reset }) => {
    const translateX = useSharedValue(0);

    useEffect(() => {
        if (reset) {
            translateX.value = withSpring(0, { damping: 20, stiffness: 100 });
        }
    }, [reset]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const backgroundColor = useAnimatedStyle(() => {
        return {
            backgroundColor:
                translateX.value > 0
                    ? interpolateColor(
                          translateX.value,
                          [0, SWIPE_LIMIT],
                          ["white", "#0684FE"]
                      )
                    : interpolateColor(
                          translateX.value,
                          [-SWIPE_LIMIT, 0],
                          ["#F4385A", "white"]
                      ),
        };
    });

    const leftIconStyle = useAnimatedStyle(() => {
        return {
            opacity: translateX.value > 0 ? 1 : 0,
        };
    });

    const rightIconStyle = useAnimatedStyle(() => {
        return {
            opacity: translateX.value < 0 ? 1 : 0,
        };
    });

    const handleGestureLeft = () => {
        translateX.value = withTiming(-width, { duration: 500 }, () => {
            runOnJS(onDeleteRight)(item.id);
        });
    };

    const handleGestureRight = () => {
        translateX.value = withTiming(width, { duration: 500 }, () => {
            runOnJS(onDeleteLeft)(item.id);
        });
    };

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => onPress(item)}>
                    <Animated.View
                        style={[styles.background, backgroundColor]}
                    />
                    <Animated.View style={[styles.leftAction, leftIconStyle]}>
                        <Image
                            source={require("../../../assets/images/AddGroup.png")}
                            style={styles.icon}
                        />
                    </Animated.View>
                    <Animated.View style={[styles.rightAction, rightIconStyle]}>
                        <Image
                            source={require("../../../assets/images/DeleteFilled.png")}
                            style={styles.icon}
                        />
                    </Animated.View>
                    <FlingGestureHandler
                        direction={Directions.LEFT}
                        onEnded={handleGestureLeft}
                    >
                        <FlingGestureHandler
                            direction={Directions.RIGHT}
                            onEnded={handleGestureRight}
                        >
                            <Animated.View
                                style={[styles.itemContainer, animatedStyle]}
                            >
                                <View style={styles.contactItem}>
                                    <View
                                        style={[
                                            styles.contactIcon,
                                            {
                                                backgroundColor: chooseColor(
                                                    item.color
                                                ),
                                            },
                                        ]}
                                    >
                                        <Text style={styles.contactIconText}>
                                            {item.first_name[0].toUpperCase()}
                                        </Text>
                                    </View>
                                    <View style={styles.contactInfo}>
                                        <Text style={styles.contactName}>
                                            {item.first_name} {item.last_name}
                                        </Text>
                                        <Text
                                            style={styles.contactPhone}
                                        >{`+${item.phone_code} ${item.phone_number}`}</Text>
                                    </View>
                                </View>
                            </Animated.View>
                        </FlingGestureHandler>
                    </FlingGestureHandler>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 1,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 30,
    },
    leftAction: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 100,
        borderTopStartRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    rightAction: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 60,
        padding: 14,
        backgroundColor: "#121B4A",
        borderRadius: 5,
        elevation: 5,
        borderRadius: 25,
    },
    itemText: {
        fontSize: 16,
        color: "white",
    },
    iconContainer: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    icon: {
        width: 30,
        height: 30,
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#121B4A",
        height: 60,
        borderRadius: 20,
        marginHorizontal: 0,
    },
    contactIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    contactIconText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    contactInfo: {
        marginLeft: 10,
    },
    contactName: {
        fontFamily: "BROmnyMedium",
        fontWeight: "500",
        fontSize: 16,
        color: "#FFFFFF",
    },
    contactPhone: {
        fontFamily: "BROmnyRegular",
        fontWeight: "260",
        fontSize: 14,
        color: "#FFFFFF",
    },
});

export default SwipeToDelete;
