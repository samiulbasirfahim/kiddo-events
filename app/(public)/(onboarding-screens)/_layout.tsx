import { PillIndicator } from "@/components/common/pill-indicator";
import { RNButton } from "@/components/ui/button";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { Tabs } from "@/lib/tab-navigation";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useWindowDimensions } from "react-native-keyboard-controller";
import Animated, {
    FadeIn,
    FadeOut,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OnboardingLayout() {
    return (
        <Tabs
            tabBarPosition="bottom"
            backBehavior="history"
            tabBar={TabBarComponent}
            screenOptions={{
                lazy: true,
                lazyPreloadDistance: 1,
                swipeEnabled: false,
            }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="second" />
            <Tabs.Screen name="third" />
        </Tabs>
    );
}

const texts = [
    {
        title: "Discover kids events near you",
        description:
            "Find fun, safe, and age-appropriate events happening around your location.",
    },
    {
        title: "Share moments with friends.",
        description:
            "Plan birthdays, playdates, and family events—only visible to people you trust.",
    },
    {
        title: "Chat, plan, and stay connected",
        description:
            "Message friends and groups to coordinate events easily and stress-free.",
    },
];

const TabBarComponent = ({ state, navigation }: MaterialTopTabBarProps) => {
    const { height } = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();

    const currentIndex = state.index;
    const currentTexts = texts[currentIndex];

    const isLastIndex = currentIndex === state.routes.length - 1;

    const progress = useSharedValue(0);

    useEffect(() => {
        const ratio = (currentIndex + 1) / state.routes.length;
        progress.value = withTiming(ratio, { duration: 300 });
    }, [currentIndex]);

    const sts = StyleSheet.create({
        tabBarContainer: {
            width: "100%",
            position: "absolute",
            bottom: 0,
            borderTopRightRadius: 120,
            height: height * 0.35,
            backgroundColor: COLORS.background,
            paddingVertical: 12,
            padding: 20,
            paddingBottom: bottom + 20,
        },
    });

    return (
        <>
            {!isLastIndex && (
                <Animated.View
                    entering={FadeIn.duration(300)}
                    exiting={FadeOut.duration(300)}
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "10%",
                    }}
                >
                    <RNButton
                        variant="default"
                        style={{
                            borderRadius: 10,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingHorizontal: 20,
                            paddingVertical: 8,
                        }}
                        onPress={() => {
                            router.push("/(public)/(auth)/login");
                        }}
                    >
                        Skip
                    </RNButton>
                </Animated.View>
            )}
            <View style={sts.tabBarContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        minHeight: 42,
                    }}
                >
                    {state.routes.map((route, index) => {
                        const isFocused = state.index === index;
                        return <PillIndicator key={route.key} isFocused={isFocused} />;
                    })}
                </View>

                <Animated.View
                    key={`text-${currentIndex}`}
                    entering={FadeIn.duration(400)}
                    exiting={FadeOut.duration(200)}
                >
                    <RNText variant="h3" style={{ textAlign: "center" }}>
                        {currentTexts.title}
                    </RNText>

                    <RNText
                        variant="body"
                        style={{
                            textAlign: "center",
                            marginTop: 8,
                            paddingHorizontal: 16,
                        }}
                    >
                        {currentTexts.description}
                    </RNText>
                </Animated.View>

                <View style={{ flex: 1 }} />

                <RNButton
                    fullWidth
                    variant="default"
                    onPress={() => {
                        const nextIndex = currentIndex + 1;
                        if (!isLastIndex) {
                            navigation.navigate(state.routes[nextIndex].name);
                        } else {
                            router.push("/(public)/(auth)/login");
                        }
                    }}
                >
                    {isLastIndex ? "Get Started" : "Next"}
                </RNButton>
            </View>
        </>
    );
};
