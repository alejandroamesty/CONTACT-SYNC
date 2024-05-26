import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    Animated,
    Image,
} from "react-native";

const { width } = Dimensions.get("window");
const colors = [
    { id: 1, color: "#FFAC20" },
    { id: 2, color: "#FF7246" },
    { id: 3, color: "#FF4574" },
    { id: 4, color: "#FF38EB" },
    { id: 5, color: "#0684FE" },
    { id: 6, color: "#33BE99" },
];

const ITEM_WIDTH = 121 + 30;
const SPACER_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

const Carousel = ({ letter = "?", image }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(1);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: 1, animated: false });
        }
    }, []);

    const getItemLayout = (data, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
    });

    const onScrollToIndexFailed = (info) => {
        const wait = new Promise((resolve) => setTimeout(resolve, 500));
        wait.then(() => {
            flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
            });
        });
    };

    const onMomentumScrollEnd = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / ITEM_WIDTH);
        console.log("Selected item:", colors[index]);
        setCurrentIndex(index);
    };

    const renderItem = ({ item, index }) => {
        if (!item.color) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
        }

        const inputRange = [
            (index - 2) * ITEM_WIDTH,
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
        ];

        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
        });

        return (
            <View
                style={{
                    width: ITEM_WIDTH,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Animated.View
                    style={[
                        styles.colorCircle,
                        {
                            backgroundColor: item.color,
                            transform: [{ scale }],
                            opacity,
                        },
                    ]}
                >
                    {image ? (
                        <Image source={image} style={styles.image} />
                    ) : (
                        <Text style={styles.circleText}>{letter}</Text>
                    )}
                </Animated.View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                horizontal
                data={[
                    { key: "spacer-left" },
                    ...colors,
                    { key: "spacer-right" },
                ]}
                renderItem={renderItem}
                keyExtractor={(item) => item.key || item.id.toString()}
                contentContainerStyle={styles.flatListContent}
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                getItemLayout={getItemLayout}
                onScrollToIndexFailed={onScrollToIndexFailed}
                onMomentumScrollEnd={onMomentumScrollEnd}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        position: "relative",
        width: "100%",
    },
    flatListContent: {
        alignItems: "center",
    },
    colorCircle: {
        width: 121,
        height: 121,
        borderRadius: 60.5,
        alignItems: "center",
        justifyContent: "center",
    },
    circleText: {
        color: "#FFF",
        fontSize: 60,
        fontFamily: "BROmnySemiBold",
    },
    image: {
        width: 50,
        height: 46,
        resizeMode: "contain",
    },
});

export default Carousel;
