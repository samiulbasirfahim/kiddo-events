import { COLORS } from "@/constant/colors";
import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

type FAQItem = {
    id: string;
    title: string;
    content: string;
};

type Props = {
    data: FAQItem[];
};

const FAQAccordion = ({ data }: Props) => {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <View style={styles.groupContainer}>
            <FlashList
                data={data}
                style={{
                    width: "100%",
                }}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <>
                        <AccordionItem
                            title={item.title}
                            isOpen={openId === item.id}
                            onPress={() => setOpenId(openId === item.id ? null : item.id)}
                        >
                            {item.content}
                        </AccordionItem>

                        {index !== data.length - 1 && <View style={styles.separator} />}
                    </>
                )}
            />
        </View>
    );
};

type ItemProps = {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onPress: () => void;
};

const AccordionItem = ({ title, children, isOpen, onPress }: ItemProps) => {
    const height = useSharedValue(0);
    const rotate = useSharedValue(0);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        height.value = withTiming(isOpen ? contentHeight : 0, {
            duration: 300,
        });

        rotate.value = withTiming(isOpen ? 90 : 0, {
            duration: 300,
        });
    }, [isOpen, contentHeight]);

    const contentStyle = useAnimatedStyle(() => ({
        height: height.value,
        opacity: withTiming(isOpen ? 1 : 0, { duration: 250 }),
    }));

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    return (
        <View>
            <Pressable onPress={onPress} style={styles.header}>
                <Text style={styles.title}>{title}</Text>

                <Animated.View style={iconStyle}>
                    <ChevronRight
                        size={20}
                        color={COLORS.textSecondary}
                        strokeWidth={2}
                    />
                </Animated.View>
            </Pressable>

            <Animated.View style={[styles.content, contentStyle]}>
                <View
                    onLayout={(e) => {
                        const measuredHeight = e.nativeEvent.layout.height;
                        if (measuredHeight > 0 && contentHeight !== measuredHeight) {
                            setContentHeight(measuredHeight);
                        }
                    }}
                    style={{ position: "absolute", opacity: 0 }}
                >
                    <Text style={styles.text}>{children}</Text>
                </View>
                <Text style={styles.text}>{children}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    groupContainer: {
        width: "100%",
        backgroundColor: COLORS.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },

    header: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.background,
    },

    title: {
        fontSize: 15,
        fontWeight: "500",
        color: COLORS.textPrimary,
    },

    content: {
        paddingHorizontal: 16,
        overflow: "hidden",
        backgroundColor: COLORS.background,
    },

    text: {
        fontSize: 14,
        color: COLORS.textSecondary,
        paddingVertical: 12,
        lineHeight: 20,
    },

    separator: {
        height: 1,
        backgroundColor: COLORS.border,
    },
});

export default FAQAccordion;
