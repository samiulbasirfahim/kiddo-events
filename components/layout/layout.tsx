import { COLORS } from "@/constant/colors";
import { HEADER_HEIGHT } from "@/constant/header-height";
import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import {
    KeyboardAwareScrollView,
    KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
    children: ReactNode[] | ReactNode;
    centered?: boolean;
    centeredVertically?: boolean;
    includeHeaderHeight?: boolean;
    includeTopInsets?: boolean;
    noPadding?: boolean;
    style?: ViewStyle;
} & KeyboardAwareScrollViewProps;

export function RNLayout({
    children,
    centered,
    centeredVertically,
    includeHeaderHeight = false,
    includeTopInsets = false,
    noPadding,
    style,
    ...props
}: Props) {
    const { bottom, top } = useSafeAreaInsets();

    const topPadding = includeHeaderHeight ? HEADER_HEIGHT + top : 0;

    return (
        <View
            style={{
                flex: 1,
                paddingTop: includeHeaderHeight ? topPadding : 0,
                backgroundColor: COLORS.background,
            }}
        >
            <KeyboardAwareScrollView
                {...props}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                    flex: 1,
                }}
                contentContainerStyle={[
                    {
                        flexGrow: 1,
                        paddingHorizontal: noPadding ? 0 : 16,
                        paddingTop: noPadding
                            ? 0
                            : includeTopInsets && !includeHeaderHeight
                                ? top
                                : 16,
                        gap: 16,
                        paddingBottom: bottom,
                        alignItems: centered ? "center" : "flex-start",
                        justifyContent: centeredVertically ? "center" : "flex-start",
                    },
                    style,
                    props?.contentContainerStyle,
                ]}
            >
                {children}
            </KeyboardAwareScrollView>
        </View>
    );
}
